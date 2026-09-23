const boxesContainer = document.querySelector(".boxes-container");

const boxes = (e) => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const box = document.createElement("div");
            box.style.border = "10px solid gray";
            box.classList.add("box");
            box.style.width = "250px";
            box.style.height = "250px";
            e.appendChild(box);
        }
    }
}

boxes(boxesContainer);