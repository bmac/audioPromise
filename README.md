audioPromise
============

A simple promise wrapper for audio elements.

Attempting to manipulate the currentTime attribute of an audio or video 
element before the audio data is loaded will result in an INVALID_STATE_ERR error.

```javascript
var audio = new Audio('http://example.com/someAudioFile.mp3');
audio.currentTime = 0;
Error: INVALID_STATE_ERR: DOM Exception 11
```

Wrapping the audio element in a promise can help by moving code that manipulates 
currentTime to a callback which is run after the audio data has been loaded.


Usage
============
```javascript
var promise = $.audioPromise(new Audio('http://example.com/someAudioFile.mp3'));
promise.done(function(audio) {
  // the src has loaded and we can now manipulate currentTime without causing an exception
  audio.currentTime = 0;
  // the duration property now returns the correct value instead of NaN
  updateDomWithDurration(audio.duration);
});
```

audioPromise can also work with jquery objects
---------------
```javascript
$('#audio-element').audioPromise().done(function() {
  //#audio-element's data is now loaded
});

var $audioElements = $('audio');
var promise = $audioElements.audioPromise();
promise.done(function() {
  // success function
  // all audio elements are now loaded
}, function() {
  // error function
  // there was a problem loading data for one or more of the audio elements
});

```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

