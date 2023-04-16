let sound;
let waveIndex = 0;
let soundIndex = 0;
sounds = [];
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
    backgroundColor: "#db8e02",
    hideScrollbar: true,
    barWidth: 3,
  });
  waveIndex++;

  sounds.push(wavesurfer);

  
  wavesurfer.on("seek", function () {
    updateSeekTime();
  });

  wavesurfer.on("audioprocess", function () {
    updateSeekTime();
  });

  wavesurfer.on("ready", function () {
    wavesurfer.play();
    wavesurfer.setVolume(0.07);
  });

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

function updateIndex(newIndex) {
  index = document.getElementById("indexShow");
  if (sounds.length == 0) {
    index.textContent = 0;
    return;
  }
  console.log(newIndex, sounds.length);
  console.log(newIndex >= sounds.length);
  soundIndex = newIndex >= sounds.length ? sounds.length - 1 : newIndex;
  soundIndex = newIndex < 0 ? 0 : soundIndex;
  index.textContent = soundIndex;
}

function createWaveSection() {
  let musicWave = document.createElement("div");
  musicWave.className = "musicWave m" + waveIndex;
  parent = document.getElementsByClassName("MusicWaveContainer")[0];
  parent.appendChild(musicWave);
}

const timeID = setInterval(tick, 250);
function tick() {}

function updateSeekTime() {
  let currentTime = document.getElementById("currentTime");
  let duration = document.getElementById("duration");

  currentTime.textContent = parseInt(sounds[soundIndex].getCurrentTime());
  duration.textContent = parseInt(sounds[soundIndex].getDuration());
  console.log(sounds[soundIndex].getCurrentTime());
  console.log(sounds[soundIndex].getDuration());
}








//
//
// PIANO
//
//

window.addEventListener("load", (event) => {
  
const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key))
})

document.addEventListener('keydown', e => {
  if (e.repeat) return
  const key = e.key
  const whiteKeyIndex = WHITE_KEYS.indexOf(key)
  const blackKeyIndex = BLACK_KEYS.indexOf(key)

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note)
  noteAudio.currentTime = 0
  noteAudio.play()
  key.classList.add('active')
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active')
  })
}
})