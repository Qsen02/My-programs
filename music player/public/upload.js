window.addEventListener("load", start);

function start() {
    let uploadInputArray = Array.from(document.querySelectorAll(".add input"));
    let uploadBtnArray = Array.from(document.querySelectorAll(".add button"));
    uploadBtnArray.forEach(el => el.addEventListener("click", clickInput));

    uploadInputArray.forEach(el => el.addEventListener("change", (event) => {
        let filename = event.target.files[0].name;
        event.target.parentElement.children[3].textContent = filename;
    }));

    function clickInput(event) {
        let index = uploadBtnArray.indexOf(event.target);
        uploadInputArray[index].click();
    }
}