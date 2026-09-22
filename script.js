const boxesContainer = document.querySelector(".boxes-container");

const boxes = (e) => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const box = document.createElement("div");
            box.style.border = "solid red";
            box.classList.add("box");
            box.style.width = "100px";
            box.style.height = "100px";
            e.appendChild(box);
        }
    }
}

boxes(boxesContainer);