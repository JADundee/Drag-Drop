const initApp = () => {
    const dropArea = document.querySelector('.dropArea');

    const active = () =>  dropArea.classList.add("green-border");

    const inactive = () => dropArea.classList.remove("green-border");

    const prevents = (e) => e.preventDefault();
    
    ['dragenter','dragover','dragleave','drop'].forEach(evtName => {
    dropArea.addEventListener(evtName, prevents);
    });

    ['dragenter', 'dragover'].forEach(evtName => {
    dropArea.addEventListener(evtName, active);
    });

    ['dragleave', 'drop'].forEach(evtName => {
    dropArea.addEventListener(evtName, inactive);
    });

    dropArea.addEventListener("drop", handleDrop);

}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (event) => {
    const dt = event.dataTransfer;
    const files = dt.files;
    const fileArray = [...files];
    console.log(files);
    console.log(fileArray);
}