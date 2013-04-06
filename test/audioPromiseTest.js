/*globals $,asyncTest,deepEqual,equal,expect,module,notDeepEqual,notEqual,
 notStrictEqual,ok,QUnit,raises,start,stop,strictEqual,test */

var audioUrl = 'audio/the_black_atlantic_-_dandelion.mp3';
var errorUrl = 'audio/idonotexist.mp3';

asyncTest( " returns a promise object which should resolve with the audio object", 2, function() {
    var promise = $.audioPromise(new Audio(audioUrl));
    equal(typeof promise.done, 'function', 'typeof promise.done should be a function');

    promise.done(function(audio) {
        ok(audio.duration, 'audio.duration should not be NaN');
        start();
    });
});


asyncTest( "rejecte the promise if there is an error with the audio file", 1, function() {
    var promise = $.audioPromise(new Audio(errorUrl));

    promise.fail(function(audio) {
        ok(true);
        start();
    });
});

asyncTest( "The promise should resolve if the loaddata event has alread fired", 1, function() {
    var promise = $.audioPromise(new Audio(audioUrl));

    promise.done(function(audio) {
        var newPromise = $.audioPromise(audio);

        newPromise.done(function() {
            ok(true);
            start();
        });
    });
});


asyncTest( "The promise should be rejected if the audio element has an error", 1, function() {
    var promise = $.audioPromise(new Audio(errorUrl));

    promise.fail(function(audio) {
        var newPromise = $.audioPromise(audio);

        newPromise.fail(function() {
            ok(true);
            start();
        });
    });
});


test( "audioPromise should return null if an audio element is not passed in as an argument", 1, function() {
    var promise = $.audioPromise({});
    equal(promise, null, 'promise should be null');
});


asyncTest( "audioPromise can be used as a jquery selector to select one element", 1, function() {
    var promise = $('#test-element').audioPromise();

    promise.done(function(audio) {
        ok(audio.duration, 'audio.duration should not be NaN');
        start();
    });

});

asyncTest( "audioPromise can be used as a jquery selector on multiple elemens", 1, function() {
    var promise = $('.maybe-audio').audioPromise();

    promise.done(function() {
        ok(true);
        start();
    });

});

asyncTest( "If one audio element fails to load the promise should be rejected", 1, function() {
    var promise = $('.maybe-bad-audio').audioPromise();

    promise.fail(function() {
        ok(true);
        start();
    });

});
