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

const createResult = (file, fileID) => {
    const originalFileSizeString = getFileSizeString(file.size);

    const p1 = document.createElement("p");
    p1.className = "results__title";
    p1.textContent = file.name;

    const p2 = document.createElement("p");
    p2.is = `original_size_${file.name}_${fileID}`;
    p2.className = "results__size";
    p2.textContent = originalFileSizeString;

    const divOne = document.createElement("div");
    divOne.appendChild(p1);
    divOne.appendChild(p2);

    const progress = document.createElement("progress");
    progress.id = `progress_${file.name}_${fileID}`;
    progress.className = "results__bar"
    progress.max = 10;
    progress.value = 0;

    const p3 = document.createElement("p");
    p3.id = `new_size_${file.name}_${fileID}`;
    p3.className = "results__saved";

    const p4 = document.createElement("p");
    p4.id = `download_${file.name}_${fileID}`;
    p4.className = "results__download";

    const p5 = document.createElement("p");
    p5.id = `saved_${file.name}_${fileID}`;
    p5.className = "results__saved";

    const divDownload = document.createElement("div");
    divDownload.className = "divDL";
    divDownload.appendChild(p4);
    divDownload.appendChild(p5);

    const divTwo = document.createElement("div");
    divTwo.appendChild(p3);
    divTwo.appendChild(divDownload);

    const li = document.createElement("li");
    li.appendChild(divOne);
    li.appendChild(progress);
    li.appendChild(divTwo);

    document.querySelector('.results__list').appendChild(li);
    displayResults()
}

const getFileSizeString = (filesize) =>  {
    const sizeInKB = parseFloat(filesize) / 1024;
    const sizeInMB = ((parseFloat(filesize) / 1024) / 1024);
    return sizeInKB > 1024 ? `${sizeInMB.toFixed(1)} MB` : `${sizeInKB.toFixed(1)} KB`;
}

const displayResults = () => {
    const results = document.querySelector('.results');
    if (results.classList.contains('none')) {
        results.classList.remove('none');
        results.classList.add('block');
    }
}

