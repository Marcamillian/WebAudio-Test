window.onload = init;

// get the right context contextClass
var contextClass = (window.AudioContext||
                    window.webkitAudioContext||
                    window.mozAudioConext||
                    window.oAudioContext||
                    window.msAudioContext),
    reactResponses = {
      68: function dPressed(){  if(!soundSources.d){
                                  soundSources.d = makeOscillator(300);
                                  selectedSource = 'd'
                                }else{
                                  selectedSource = 'd'
                                }
                              },
      69: function ePressed(){changeVolume('d', 1)},
      67: function cPressed(){changeVolume('d', -1)},

      83: function sPressed(){  if(!soundSources.s){
                                  soundSources.s = makeOscillator(300);
                                  selectedSource = 's'
                                }else{
                                  selectedSource = 's'
                                }
                              },
      87: function wPressed(){changeVolume('s', 1)},
      88: function xPressed(){changeVolume('s', -1)},

      65: function aPressed(){  if(!soundSources.a){
                                  soundSources.a = makeOscillator(300);
                                  selectedSource = 'a'
                                }else{
                                  selectedSource = 'a'
                                }
                              },
      81: function qPressed(){changeVolume('a', 1)},
      90: function zPressed(){changeVolume('a', -1)},

      76: function lPressed(){muteGlobalSound()},
      75: function kPresses(){playGlobalSound()},

      39:function rightPressed(){changeVolume(selectedSource, 1)},
      37:function leftPressed(){changeVolume(selectedSource, -1)},

      38:function upPressed(){changeTone(selectedSource, 1)},
      40:function downPressed(){changeTone(selectedSource,-1)}
    },
    context,
    soundSources = {},
    selectedSource = '',
    globalGain;


if(contextClass){
  var context = new contextClass;
}else{
  alert("web audio not available in your browser")
}

function changeTone(soundNode, toneDirection){
  if(toneDirection >0){
    soundSources[soundNode].sound.frequency.value += 100;
  }else{
    soundSources[soundNode].sound.frequency.value -= 100;
  }
}

function changeVolume(soundNode, volumeChange){
  if (volumeChange > 0){
    soundSources[soundNode].gain.gain.value *= 2;

  }else{
    soundSources[soundNode].gain.gain.value *= 0.5;
  }
}

function makeOscillator(freq){
  var osc = context.createOscillator(),
      oscGain = context.createGain();

  osc.type = 'square';
  osc.frequency.value = freq ||300;
  osc.connect(oscGain);
  oscGain.connect(globalGain)
  osc.start();

  console.log("made an oscillator")
  return {'sound': osc, 'gain': oscGain}
}


function muteGlobalSound(){
  globalGain.gain.value = 0;
}

function playGlobalSound(){
  globalGain.gain.value = 100;
}

function init(){
  // create the global gain
  globalGain = context.createGain();
  globalGain.gain.value = 100;
  globalGain.connect(context.destination);

}

//window.addEventListener('keydown', function(){console.log("start")});
window.addEventListener('keydown', inputReact);

//window.addEventListener('keyup', function(){console.log("stop")});
//swindow.addEventListener('keyup', stopOscillator);

function inputReact(e){

  var value = e.keyCode;
  if(reactResponses[value]){
    reactResponses[value]();
  }
  console.log(value);
}
