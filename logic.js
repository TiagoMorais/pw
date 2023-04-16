window.addEventListener('load', (event) => {
  const fileSelector = document.getElementById('fileSelect');
  
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList[0]);
  });
  
});

var sound = new Howl({
    
  });

function addMusic(){
  const fileSelector = document.getElementById('fileSelect');
  fileSelector.click();
}


