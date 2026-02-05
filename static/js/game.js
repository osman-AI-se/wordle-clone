const ROWS = 6;
const COLS = 5;
let currentRow = 0;
let currentCol = 0;
let secretWord = "hej";


function initGame() 
{
    console.log("Game has started")
    console.log("secretWord: " , secretWord);
}

document.addEventListener("DOMContentLoaded", initGame);