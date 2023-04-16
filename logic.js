let sound;
let waveIndex=0;
let soundIndex=0;
sounds=[]
window.addEventListener("load", (event) => {
  const fileSelector = document.getElementById("fileSelect");
  fileSelector.addEventListener("change", (event) => {
    if (event.target.files[0]) {
      set_wavesurfer(event.target.files[0]);
    }
  });
});

//var sound = new Howl({});
function set_wavesurfer(file) {
  console.log(1);
  //if(wavesurfer!=undefined){
    //wavesurfer.destroy();
  //}
  //create section for wave
  createWaveSection();
  wavesurfer = WaveSurfer.create({
    container: `.m${waveIndex}`,
    scrollParent: false,
    backgroundColor:"#db8e02",
    barWidth: 3,
  });
  waveIndex++;


  sounds.push(wavesurfer)

  wavesurfer.on("ready", function () {
    wavesurfer.play();
    wavesurfer.setVolume(0.1);
  });
  //wavesurfer.load("soad.mp3");

  var reader = new FileReader();

  reader.onload = function (evt) {
    // Create a Blob providing as first argument a typed array with the file buffer
    var blob = new window.Blob([new Uint8Array(evt.target.result)]);

    // Load the blob into Wavesurfer
    wavesurfer.loadBlob(blob);
  };

  reader.onerror = function (evt) {
    console.error("An error ocurred reading the file: ", evt);
  };

  // Read File as an ArrayBuffer
  reader.readAsArrayBuffer(file);

 
}

function addMusic() {
  const fileSelector = document.getElementById("fileSelect");
  fileSelector.click();
}

function play() {
  sounds[soundIndex].play();
}

function stop() {
  sounds[soundIndex].pause();
  sounds[soundIndex].seekTo(0);

}

function pause() {
  sounds[soundIndex].pause();
}


function createWaveSection(){
  let musicWave = document.createElement('div');
  musicWave.className = "musicWave m"+waveIndex ;
  parent = document.getElementsByClassName('MusicWaveContainer')[0];
  parent.appendChild(musicWave);
}