const boxesContainer = document.querySelector(".boxes-container");
const rowOne = document.querySelector(".first-row");
const rowTwo = document.querySelector(".second-row");
const rowThree = document.querySelector(".third-row");
const winScreen = document.querySelector(".winScreen");
const wordEnglish = document.querySelector(".word-english");
const definitionEnglish = document.querySelector(".definition-english");
const wordSpanish = document.querySelector(".word-spanish");
const definitionSpanish = document.querySelector(".definition-spanish");
const closeBtn = document.querySelector("#close-btn");

//Variables storing keyboard rows
const keysFirstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const keysSecondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const keysThirdRow = ["z", "x", "c", "v", "b", "n", "m", "ENTER", "BACKSPACE"]; 

//variables for board tracking
const boxTiles = [];
let currentBox = 0;
let currentRow = 0;
let isGameOver = false;

const roundInfo = [];
const gameWordArray = [];


/** Create 5x5 game board grid. */
const createBoard = (container) => {
    for (let i = 0; i < 25; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        container.appendChild(box);
        boxTiles.push(box);
    }
};

createBoard(boxesContainer);

/** Create on-screen keyboard. */
function createKeyboard() {
    createRow(keysFirstRow, rowOne);
    createRow(keysSecondRow, rowTwo);
    createRow(keysThirdRow, rowThree);
}

function createRow(keys, rowElement) {
    keys.forEach((key) => {
        const keyTile = document.createElement("button");
        keyTile.dataset.key = key.toUpperCase();
        keyTile.textContent = key.toUpperCase();

        keyTile.addEventListener('click', (e) => {
            handleInput(e.target.dataset.key);
        });
        rowElement.append(keyTile);
    });
}

/** Handle input for physical and on-screen keyboards. */
function handleInput(key) {
    if(isGameOver) return;

    if (key === "ENTER") {
        if (currentBox === (currentRow + 1) * 5) {
            guessWord();
        }
    } else if (key === "BACKSPACE" || key === "DELETE") {
        deleteLetter();
    } else if (key.length === 1 && key >= "A" && key <= "Z") {
        enterLetter(key);
    }
}

/** Insert letter into current row. */
function enterLetter(letter) {
    if (currentBox < (currentRow + 1) * 5) {
        boxTiles[currentBox].textContent = letter.toUpperCase();
        currentBox++;
    }
}

/** Remove last letter in current row. */
function deleteLetter() {
    const rowStart = currentRow * 5;
    if (currentBox > rowStart) {
        currentBox--;
        boxTiles[currentBox].textContent = "";
    }
}

/** Process player guess. */
function guessWord() {
    const rowStart = currentRow * 5;
    const guessArray = [];

    for (let i = 0; i < 5; i++) {
        guessArray.push(boxTiles[rowStart + i].textContent);
    }

    //Maps letter counts to handle repeated letters in word
    const targetLetterCounts = {};
    gameWordArray.forEach((char) => {
        targetLetterCounts[char] = (targetLetterCounts[char] || 0) + 1;
    });

    //Will default all tiles to gray
    const tileStates = Array(5).fill("absent");

    //Marks correct positions with green 
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === gameWordArray[i]) {
            tileStates[i] = "correct";
            targetLetterCounts[guessArray[i]]--;
        }
    }

    //Marks present letters in wrong positions with yellow
    for (let i = 0; i < 5; i++) {
        if (tileStates[i] !== "correct" && targetLetterCounts[guessArray[i]] > 0) {
            tileStates[i] = "present";
            targetLetterCounts[guessArray[i]]--;
        }
    }

    //Adding respective colors to tiles
    for (let i = 0; i < 5; i++) {
        const tile = boxTiles[rowStart + i];
        if (tileStates[i] === "correct") {
            tile.style.backgroundColor ="#2A9D8F";
            tile.style.color = "white";
        } else if (tileStates[i] == "present") {
            tile.style.backgroundColor = "#E9C46A";
            tile.style.color = "white";
        } else {
            tile.style.backgroundColor = "#8D99AE";
            tile.style.color = "white";
        }
    }

    //Check win condition
    if (guessArray.join("") === gameWordArray.join("")) {
        isGameOver = true;
        showWinScreen();
        return;
    }
    currentRow++;

    //Check lose condition
    if (currentRow === 5) {
        isGameOver = true;
        showWinScreen();
    }
}

//creating backdrop element for blur effect
const backdrop = document.createElement("div");
backdrop.classList.add("modal-backdrop");
document.body.appendChild(backdrop);

/** Show win screen with background blur. */
function showWinScreen() {
    wordEnglish.textContent = roundInfo[0];
    wordSpanish.textContent = roundInfo[1];
    definitionEnglish.textContent = roundInfo[2];
    definitionSpanish.textContent = roundInfo[3];

    winScreen.style.display = "flex";
    backdrop.classList.add("active");
}

/** Hide win screen and remove blur. */
function hideWinScreen() {
    winScreen.style.display = "none";
    backdrop.classList.remove("active");
}

if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        hideWinScreen();
        resetGame();
    });
}

/** Event listener for physical keyboard. */
document.addEventListener("keydown", (e) => {
    handleInput(e.key.toUpperCase());
});

/** Gets game round word. */
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

    for (let i = 0; i < gameWord.english.length; i++) {
        gameWordArray.push(gameWord.english.charAt(i).toUpperCase());
    }
}

/** Reset game */
function resetGame() {
    hideWinScreen();

    //reset variables
    currentBox = 0;
    currentRow = 0;
    isGameOver = false;
    roundInfo.length = 0;
    gameWordArray.length = 0;
    boxTiles.length = 0;

    //clear board
    boxesContainer.innerHTML = "";
    

    //create board and get new word
    createBoard(boxesContainer);
    getWord();
}

//Start game
createKeyboard();
getWord();




