window.onload = init;

var context;
var bufferLoader;
var loadedSounds;
var generatedSounds;
var playing = false;

function init(){

  generatedSounds = window.generatedSounds = context.createOscillator();
  console.log(window.generatedSounds);
  window.generatedSounds.type = 'square';
  window.generatedSounds.frequency.value = 3000;
  window.generatedSounds.start();

  //generatedSounds.connect(context.destination);

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
  window.loadedSounds = bufferList;
}

var playback = function playback(){
  playSound(window.loadedSounds[0]);
}

var oscillatorPlay = function oscillatorPlay(event){
  if(playing){
    // make it quiet
  }else{
    // turn it back on again
  }

  playing = !playing;

  console.log(playing);
}

window.onkeypress = oscillatorPlay;
