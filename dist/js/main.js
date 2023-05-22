import Counter from "./counter.js";
const counter = new Counter();

const initApp = () => {
    const dropArea = document.querySelector('.dropArea');

    const active = () =>  dropArea.classList.add("green-border");

    const inactive = () => dropArea.classList.remove("green-border");

    const prevents = (e) => e.preventDefault();
    
    ['dragover','drop'].forEach(evtName => {
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
    if (fileArray.length > 20) return alert("Too many files!");
    handleFiles(fileArray);
}

const handleFiles = (fileArray) => {
    fileArray.forEach(file => {
        const fileID = counter.getValue();
        counter.incrementValue();
        if (((file.size / 1024) / 1024) > 4) return alert("File size too large.");
        createResult(file, fileID);
        uploadFile(file, fileID)
    });
}