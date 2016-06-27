window.onload = init;

var context;
var bufferLoader;
var loadedSounds = "something";

function init(){
  var contextClass = ( window.AudioContext ||
                  window.webkitAudioContext||
                  window.mozAudioConext||
                  window.oAudioContext||
                  window.msAudioContext);

  if (contextClass){
    var context = new contextClass;
  }else{
    alert("web audio not available in your browser")
  }

  bufferLoader = new BufferLoader(
    context,
    [
      'dog.mp3'
    ],
    finishedLoading
  );

  bufferLoader.load()
}

function finishedLoading(bufferList){
  // create sources and play them together
  var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[0];

  source1.connect(context.destination);
  source2.connect(context.destination);

  console.log(window.loadedSounds);
  window.loadedSounds = bufferList;
  console.log(window.loadedSounds);

  playSound(bufferList[0]);
}

var playback = function playback(){
  playSound(window.loadedSounds[0]);
  console.log("something")
}

window.addEventListener("click", playback);
