audioPromise
============

A simple promise wrapper for audio elements.


Usage
============
```javascript
var promise = $.audioPromise(new Audio('http://example.com/someAudioFile.mp3'));
promise.done(function(audio) {
  // the src has loaded and we can now manipulate currentTime without causing an exception
  audio.currentTime = 0;
  // the durration property now returns the correct value instead of NaN
  updateDomWithDurration(audio.durration);
});
```
