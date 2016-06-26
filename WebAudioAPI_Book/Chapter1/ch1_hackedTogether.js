
// CHECK THAT WE CAN USE WEB AUDIO API
var contextClass = (window.AudioContext ||
                    window.webkitAudioContext||
                    window.mozAudioConext||
                    window.oAudioContext||
                    window.msAudioContext);


if (contextClass){
  var context = new contextClass;
}else{
  alert("web audio not available in your browser")
}


// CREATE THE NODES THAT WE WILL NEED


var source = context.createBufferSource();
// create the gain node
var gain = context.createGain();
// create source to filer, filter to destination
source.connect(gain);
gain.connect(context.destination);


// LOAD THE SOURCES OF THE SOUNDS

var buffer;

var request = new XMLHttpRequest();
request.open('GET', 'dog.mp3', true);
request.responseType = 'arraybuffer';
request.addEventListener('progress', function(){console.log("in progress.. loading the sound")});
request.addEventListener('load', function(){
                                      console.log("transfer complete");
                                      //buffer = request.response;
                                      buffer = context.decodeAudioData(request.response, function(theBuffer){
                                        buffer = theBuffer;
                                        beginPlayback();
                                      });
                                  });
request.addEventListener('error', function(){console.log("problem loading the sound")});
request.addEventListener('abort', function(){console.log("aborting this load")});
request.send();
console.log(buffer)

var beginPlayback = function beginPlayback(){
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}


/*
// decode asynch
request.onLoad = function(){
  console.log("Something")
  context.decodeAudioData(request.response, function(theBuffer){
    window.source1 = theBuffer;
  }, onError);

}

try{
  request.send();
}catch(e){
  console.log(e);
}
*/
