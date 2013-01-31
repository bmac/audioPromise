asyncTest( " returns a promise object which should resolve with the audio object", 2, function() {
    var promise = $.audioPromise(new Audio('audio/the_black_atlantic_-_dandelion.mp3'));
    equal(typeof promise.done, 'function', 'typeof promise.done should be a function');

    promise.done(function(audio) {
	ok(audio.duration, 'audio.duration should not be NaN');
	start();
    });
});


asyncTest( "rejecte the promise if there is an error with the audio file", 1, function() {
    var promise = $.audioPromise(new Audio('audio/idonotexist.mp3'));

    promise.fail(function(audio) {
	ok(true);
	start();
    });
});