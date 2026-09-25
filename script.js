const boxesContainer = document.querySelector(".boxes-container");
const rowOne = document.querySelector(".first-row");
const rowTwo = document.querySelector(".second-row");
const rowThree = document.querySelector(".third-row");
const winScreen = document.querySelector(".winScreen");
const wordEnglish = document.querySelector(".word-english");
const definitionEnglish = document.querySelector(".definition-english");
const wordSpanish = document.querySelector(".word-spanish");
const definitionSpanish = document.querySelector(".definition-spanish");

//Variables that store keyboard rows with their respective letters
const keysFirstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const keysSecondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const keysThirdRow = ["z", "x", "c", "v", "b", "n", "m"]; 

//variable for individual boxes in game board
const boxTiles = [];

//Variables for...
let currentBox = 0;
let currentRow = 0;

/** Function to create game board. */
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

function createKeyboard() {
    createRow(keysFirstRow, rowOne);
    createRow(keysSecondRow, rowTwo);
    createRow(keysThirdRow, rowThree);
}

function createRow(keys, row) {
    for (let i = 0; i < keys.length; i++) {
        const keyTile = document.createElement("button");

        keyTile.dataset.key = keys[i];
        keyTile.textContent = keys[i];

        row.append(keyTile);

        keyTile.addEventListener('click', function(e) {
            enterLetter(e.target.dataset.key);
        });
    }
}

function enterLetter(letter) {
    if(currentBox < (currentRow + 1) * 5) {
        boxTiles[currentBox].textContent = letter;
        currentBox++;
    }
}

function guessWord() {
    const guessArray = [];
    const rowStart = currentRow * 5;

    for (let i = 0; i < 5; i++) {
        guessArray.push(boxTiles[rowStart + i].textContent);
    }

    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === gameWordArray[i]) {
            boxTiles[rowStart + i].style.backgroundColor = "green";
        } else if (gameWordArray.includes(guessArray[i])) {
            boxTiles[rowStart + i].style.backgroundColor = "yellow";
        }
    }
    if (guessArray.join() === gameWordArray.join()) {
        wordEnglish.textContent = roundInfo[0];
        definitionEnglish.textContent = roundInfo[2];
        wordSpanish.textContent = roundInfo[1];
        definitionSpanish.textContent = roundInfo[3];

        winScreen.style.display = "flex";

        return;
    }
    currentRow++;
}

function handleKeyboardInput(e) {
    const key = e.key.toUpperCase();

    if (key.length === 1 && key >= "A" && key <= "Z") {
        enterLetter(key);
    }
    if (key === "ENTER") {
        if (currentBox === (currentRow + 1) * 5) {
            guessWord();
        }
    }
}
document.addEventListener("keydown", handleKeyboardInput);
createKeyboard();

const roundInfo = [];
const gameWordArray = [];

async function getWord() {
    const response = await fetch("words.json");
    const words = await response.json();

    const randomIndex = Math.floor(Math.random() * words.length);
    const gameWord = words[randomIndex];

    roundInfo.push(
        gameWord.english, 
        gameWord.spanish, 
        gameWord.englishDefinition, 
        gameWord.spanishDefinition
    );

    for(let i = 0; i < gameWord.english.length; i++) {
        gameWordArray.push(gameWord.english.charAt(i).toUpperCase());
    }

    console.log(gameWord.english);
    console.log(gameWordArray);
}
getWord();




