;(function ( $, window, document, undefined ) {

    var isAudioElement = function(audio) {
        if (!audio) {
            return false;
        }
        return 'duration' in audio;
    };


    $.audioPromise = function ( audio ) {
        if (!isAudioElement(audio)) {
            return null;
        }

        var deferred = $.Deferred();
        if (audio.duration) {
            deferred.resolve(audio);
        }
        if (audio.error) {
            deferred.reject(audio);
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

    $.fn.audioPromise = function() {
        var promises = $.map(this, $.audioPromise);
        return $.when.apply($, promises);
    };

})( jQuery, window, document );
