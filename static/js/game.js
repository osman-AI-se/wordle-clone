
// const state = {
//     secret: dictionary[Math.floor(Math.random()* dictionary.length)],
//     grid: Array(6)
//           .fill()
//           .map(() => Array(5).fill('')),
//           currentRow: 0,
//           currentColumn: 0,
// };
// function updategrid(){
//     for(let i = 0; i < state.grid.length;i++)
//     {
//         for(let j = 0;j<state.grid[i].length;j++)
//         {
//             const box = document.getElementById(`box${i}${j}`);
//             box.textContent = state.grid[i][j];
//         }
      
//     }
// }


// function createBox(container, row, column, letter = '')
//     {
//         const box = document.createElement('div');
//         box.className = 'box';
//         box.id = `box${row}${column}`;
//         box.textContent = letter;

//         container.appendChild(box);
//         return box;
//     }

// function drawKeyboard(container) {
//     const keyboard = document.createElement('div');
//     keyboard.className = 'keyboard';

//     const rows = [
//         ['Q','W','E','R','T','Y','U','I','O','P'],
//         ['A','S','D','F','G','H','J','K','L'],
//         ['Enter','Z','X','C','V','B','N','M','Backspace']
//     ];

//     rows.forEach(rowKeys => {
//         const row = document.createElement('div');
//         row.className = 'keyboard-row';
//         rowKeys.forEach(key => {
//             const keyBtn = document.createElement('button');
//             keyBtn.className = 'key';
//             keyBtn.textContent = key;
//             keyBtn.dataset.key = key;
//             keyBtn.addEventListener('click', () => {
//                 if (key === 'Enter') {
//                     if (state.currentColumn === 5) {
//                         const word = getCurrentWord();
//                         if (isWordValid(word)) {
//                             revealWord(word);
//                             state.currentRow++;
//                             state.currentColumn = 0;
//                             updategrid();
//                         } else {
//                             alert(`${word} Its not a valid word, try again`);
//                         }
//                     }
//                     return;
//                 }

//                 if (key === 'Backspace') {
//                     removeLetter();
//                     updategrid();
//                     return;
//                 }

                
//                 if (/^[a-zA-Z]$/.test(key)) {
//                     addLetter(key);
//                     updategrid();
//                 }
//             });
//             row.appendChild(keyBtn);
//         });
//         keyboard.appendChild(row);
//     });

//     container.appendChild(keyboard);
// }

// function KeyboardEvents(guess)
// {
//     document.body.onkeydown = (e) => {
//         const key = e.key;

//         if (key === 'Enter'){
//             if(state.currentColumn === 5){
//                 const word = getCurrentWord();
//                 if(isWordValid(word)){
//                     revealWord(word);
//                     state.currentRow++;
//                     state.currentColumn = 0;
//                 }else{
//                     alert(`${word} Its not a valid word, try again`);
//                 }
//             }

//         }
//         if (key === 'Backspace'){
//             removeLetter();
//         }
//         if (isLetter(key)){
//             addLetter(key);
//         }
//         updategrid();

//     };
// }
// function getCurrentWord(){
//     return state.grid[state.currentRow].reduce((prev,curr) => prev + curr).toLowerCase();
// }
// function isWordValid(word){
//     return dictionary.includes(word);

// }
// function revealWord(guess){
//     const row = state.currentRow;
//     const animation_duration = 500; // ms

//     for(let i = 0; i < 5; i++){
//         const box = document.getElementById(`box${row}${i}`);
//         const letter = box.textContent.toLowerCase();
//         setTimeout(() =>
//     {

      
//         if (letter === state.secret[i]){
//             box.classList.add('right');
            
//         }
//         else if (state.secret.includes(letter)){
//             box.classList.add('wrong');
//         }
//         else {
//             box.classList.add('empty');
//         }
//     },  ((i + 1) * animation_duration) / 2);

//     box.classList.add('animated');
//     box.style.animationDelay = `${(i * animation_duration) / 2}ms`; 



//     }
//     const isWinner = state.secret === guess;
//     const isOver = state.secret === 5;

//     setTimeout(() => {
//         if (isWinner){
//         alert('Congratulations you won!')
//     }
//     else if (isOver){
//         alert(`You lost, the correct word was ${state.secret}`)
//     }
// },3 * animation_duration);
// }
// function isLetter(key)
// {
//     return key.length === 1 && key.match(/[a-z]/i);
// }

// function addLetter(letter)
// {
//      if(state.currentColumn === 5) return;
//      state.grid[state.currentRow][state.currentColumn] = letter.toUpperCase();
//      state.currentColumn++;
// }

// function removeLetter()
// {
//     if(state.currentColumn === 0) return;
//     state.grid[state.currentRow][state.currentColumn - 1] = '';
//     state.currentColumn--;
// }

// function initGame() //startar spelet
// {
//     const game = document.getElementById('game');
//     if(game)
//         {
          
//             drawKeyboard(game);
//         }
        
//     else 
//     { 
//         console.error('Element with id="game" not found!');
//     }

//     KeyboardEvents();



   
// }

// document.addEventListener("DOMContentLoaded", initGame);
let currentRow = 0;
let currentCol = 0;
let currentGuess = "";
let gameOver = false;

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const keys = document.querySelectorAll(".key");

function handleKey(key) {
    if (gameOver) return;

    if (key === "Enter") {
        submitGuess();
        return;
    }

    if (key === "Backspace") {
        removeLetter();
        return;
    }

    if (/^[A-Z]$/.test(key)) {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (currentCol === 5) return;

    const box = document.querySelector(
        `.box[data-row="${currentRow}"][data-col="${currentCol}"]`
    );

    box.textContent = letter;
    currentGuess += letter;
    currentCol++;
}

function removeLetter() {
    if (currentCol === 0) return;

    currentCol--;
    currentGuess = currentGuess.slice(0, -1);

    const box = document.querySelector(
        `.box[data-row="${currentRow}"][data-col="${currentCol}"]`
    );

    box.textContent = "";
}

function submitGuess() {
    if (currentGuess.length !== 5) {
        message.textContent = "Word must be 5 letters!";
        return;
    }

    fetch("/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ guess: currentGuess })
    })
        .then(res => res.json())
        .then(data => {
            if (!data.valid) {
                message.textContent = data.error;

            
                return;
            }

            updateColors(data.result);
            updateKeyboard(data.result);

            if (data.status === "won") {
                message.textContent = "🎉 You won!";
                gameOver = true;
            } else if (data.status === "lost") {
                message.textContent = "You lost!";
                gameOver = true;
            } else {
                currentRow++;
                currentCol = 0;
                currentGuess = "";
            }
        });
}

function updateColors(result) {
    for (let i = 0; i < 5; i++) {
        const box = document.querySelector(
            `.box[data-row="${currentRow}"][data-col="${i}"]`
        );

        box.classList.remove("empty");
        box.classList.add(
            result[i] === "green"
                ? "correct"
                : result[i] === "yellow"
                ? "present"
                : "absent"
        );
    }
}

function updateKeyboard(result) {
    for (let i = 0; i < 5; i++) {
        const keyBtn = document.querySelector(
            `.key[data-key="${currentGuess[i]}"]`
        );

        if (!keyBtn) continue;

        if (result[i] === "green") {
            keyBtn.classList.add("correct");
        } else if (result[i] === "yellow") {
            keyBtn.classList.add("present");
        } else {
            keyBtn.classList.add("absent");
        }
    }
}

keys.forEach(key =>
    key.addEventListener("click", () =>
        handleKey(key.dataset.key)
    )
);

document.addEventListener("keydown", e =>
    handleKey(e.key.toUpperCase())
);






