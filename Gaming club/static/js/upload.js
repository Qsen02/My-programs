window.addEventListener("load", start);

function start() {
    let uploadInput = document.getElementById("file-upload");
    let uploadText = document.getElementById("file-upload-text");
    let uploadBtn = document.getElementById("file-upload-button");
    uploadBtn.addEventListener("click", () => {
        uploadInput.click();
    })
    uploadInput.addEventListener("change", (event) => {
        let filename = event.target.files[0].name;
        uploadText.textContent = filename;
    });
}