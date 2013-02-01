;(function ( $, window, document, undefined ) {

    $.audioPromise = function ( audio ) {
	var deferred = $.Deferred();
	if (audio.duration) {
	    deferred.resolve(audio);
	}

	if (deferred.state() === 'pending') {
	    $(audio).on('loadeddata', function() {
		deferred.resolve(audio);
	    });
	    $(audio).on('error', function() {
		deferred.reject(audio);
	    });
	}
	return deferred.promise();
    };

})( jQuery, window, document );