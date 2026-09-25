const boxesContainer = document.querySelector(".boxes-container");

const rowOne = document.querySelector(".first-row");
const rowTwo = document.querySelector(".second-row");
const rowThree = document.querySelector(".third-row");

const keysFirstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const keysSecondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const keysThirdRow = ["z", "x", "c", "v", "b", "n", "m"]; 

//variable for individual boxes in game board
const boxTiles = [];
let currentBox = 0;
let currentRow = 0;

const boxes = (e) => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const box = document.createElement("div");
            box.style.border = "10px solid gray";
            box.classList.add("box");
            box.style.width = "250px";
            box.style.height = "250px";
            e.appendChild(box);
            boxTiles.push(box);
        }
    }
}
boxes(boxesContainer);


/** Function to generate keyboard keys. */
function keyboard() {
    let keyTile;
    document.addEventListener('keydown', function(e) {
        const key = e.key.toUpperCase();

        if (key.length === 1 && key >= 'A' && key <= 'Z') {
            if(currentBox < (currentRow + 1) * 5) {
                 boxTiles[currentBox].textContent = key;
                currentBox++;
            }
        }
        if (currentRow < 5) {
            if (key === "ENTER") {
                if(currentBox === (currentRow + 1) * 5) {
                currentRow++;
                }
            }
        }
    });

    for (let i = 0; i < keysFirstRow.length; i++) {
        keyTile = document.createElement("button");
        keyTile.dataset.key = keysFirstRow[i];
        keyTile.textContent = keysFirstRow[i];
        rowOne.append(keyTile);

        keyTile.addEventListener('click', function(e) {
            if(currentBox < (currentRow + 1) * 5) {
                boxTiles[currentBox].textContent = e.target.dataset.key;
                currentBox++;
            }
        });
    }
    for (let i = 0; i < keysSecondRow.length; i++) {
        keyTile = document.createElement("button");
        keyTile.dataset.key = keysSecondRow[i];
        keyTile.textContent = keysSecondRow[i];
        rowTwo.append(keyTile);

        keyTile.addEventListener('click', function(e) {
            if(currentBox < (currentRow + 1) * 5) {
                boxTiles[currentBox].textContent = e.target.dataset.key;
                currentBox++;
            }
        });
    }
    for (let i = 0; i < keysThirdRow.length; i++) {
        keyTile = document.createElement("button");
        keyTile.dataset.key = keysThirdRow[i];
        keyTile.textContent = keysThirdRow[i];
        rowThree.append(keyTile);
        
        keyTile.addEventListener('click', function(e) {
            if(currentBox < (currentRow + 1) * 5) {
                boxTiles[currentBox].textContent = e.target.dataset.key;
                currentBox++;
            }
        });
    }
}

keyboard();

const roundInfo = [];

async function getWord() {
    const response = await fetch("words.json");
    const words = await response.json();

    const randomIndex = Math.floor(Math.random() * words.length);
    const gameWord = words[randomIndex];
    roundInfo.push(gameWord.english, gameWord.spanish, gameWord.englishDefinition, gameWord.spanishDefinition);
    console.log(gameWord.english);
}

getWord();

