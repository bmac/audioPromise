;(function ( $, window, document, undefined ) {

    $.audioPromise = function ( audio ) {
	var deferred = $.Deferred();
	$(audio).on('loadeddata', function() {
	    deferred.resolve(audio);
	});
	return deferred.promise();
    };

})( jQuery, window, document );