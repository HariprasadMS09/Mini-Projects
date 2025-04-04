let bdy = document.querySelector("body");
let currMode = "Light";
let modeBtn = document.querySelector(".mode button"); // Select the button directly

modeBtn.addEventListener("click", () => {
    if (currMode === "Light") {
        currMode = "Dark";
        bdy.style.backgroundColor = "black";
        modeBtn.querySelector("i").classList.remove("fa-cloud-moon");
        modeBtn.querySelector("i").classList.add("fa-sun");
    } else {
        currMode = "Light";
        bdy.style.backgroundColor = "white";
        modeBtn.querySelector("i").classList.remove("fa-sun");
        modeBtn.querySelector("i").classList.add("fa-cloud-moon");
    }
});
