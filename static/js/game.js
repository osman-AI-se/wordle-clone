
const state = {
    secret: dictionary[Math.floor(Math.random()* dictionary.length)],
    grid: Array(6)
          .fill()
          .map(() => Array(5).fill('')),
          currentRow: 0,
          currentColumn: 0,
};
function updategrid(){
    for(let i = 0; i < state.grid.length;i++)
    {
        for(let j = 0;j<state.grid[i].length;j++)
        {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
      
    }
}


function createBox(container, row, column, letter = '')
    {
        const box = document.createElement('div');
        box.className = 'box';
        box.id = `box${row}${column}`;
        box.textContent = letter;

        container.appendChild(box);
        return box;
    }

function drawKeyboard(container) {
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';

    const rows = [
        ['Q','W','E','R','T','Y','U','I','O','P'],
        ['A','S','D','F','G','H','J','K','L'],
        ['Enter','Z','X','C','V','B','N','M','Backspace']
    ];

    rows.forEach(rowKeys => {
        const row = document.createElement('div');
        row.className = 'keyboard-row';
        rowKeys.forEach(key => {
            const keyBtn = document.createElement('button');
            keyBtn.className = 'key';
            keyBtn.textContent = key;
            keyBtn.dataset.key = key;
            keyBtn.addEventListener('click', () => {
                if (key === 'Enter') {
                    if (state.currentColumn === 5) {
                        const word = getCurrentWord();
                        if (isWordValid(word)) {
                            revealWord(word);
                            state.currentRow++;
                            state.currentColumn = 0;
                            updategrid();
                        } else {
                            alert(`${word} Its not a valid word, try again`);
                        }
                    }
                    return;
                }

                if (key === 'Backspace') {
                    removeLetter();
                    updategrid();
                    return;
                }

                
                if (/^[a-zA-Z]$/.test(key)) {
                    addLetter(key);
                    updategrid();
                }
            });
            row.appendChild(keyBtn);
        });
        keyboard.appendChild(row);
    });

    container.appendChild(keyboard);
}

function KeyboardEvents(guess)
{
    document.body.onkeydown = (e) => {
        const key = e.key;

        if (key === 'Enter'){
            if(state.currentColumn === 5){
                const word = getCurrentWord();
                if(isWordValid(word)){
                    revealWord(word);
                    state.currentRow++;
                    state.currentColumn = 0;
                }else{
                    alert(`${word} Its not a valid word, try again`);
                }
            }

        }
        if (key === 'Backspace'){
            removeLetter();
        }
        if (isLetter(key)){
            addLetter(key);
        }
        updategrid();

    };
}
function getCurrentWord(){
    return state.grid[state.currentRow].reduce((prev,curr) => prev + curr).toLowerCase();
}
function isWordValid(word){
    return dictionary.includes(word);

}
function revealWord(guess){
    const row = state.currentRow;
    const animation_duration = 500; // ms

    for(let i = 0; i < 5; i++){
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent.toLowerCase();
        setTimeout(() =>
    {

      
        if (letter === state.secret[i]){
            box.classList.add('right');
            
        }
        else if (state.secret.includes(letter)){
            box.classList.add('wrong');
        }
        else {
            box.classList.add('empty');
        }
    },  ((i + 1) * animation_duration) / 2);

    box.classList.add('animated');
    box.style.animationDelay = `${(i * animation_duration) / 2}ms`; 



    }
    const isWinner = state.secret === guess;
    const isOver = state.secret === 5;

    setTimeout(() => {
        if (isWinner){
        alert('Congratulations you won!')
    }
    else if (isOver){
        alert(`You lost, the correct word was ${state.secret}`)
    }
},3 * animation_duration);
}
function isLetter(key)
{
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter)
{
     if(state.currentColumn === 5) return;
     state.grid[state.currentRow][state.currentColumn] = letter.toUpperCase();
     state.currentColumn++;
}

function removeLetter()
{
    if(state.currentColumn === 0) return;
    state.grid[state.currentRow][state.currentColumn - 1] = '';
    state.currentColumn--;
}

function initGame() //startar spelet
{
    const game = document.getElementById('game');
    if(game)
        {
          
            drawKeyboard(game);
        }
        
    else 
    { 
        console.error('Element with id="game" not found!');
    }

    KeyboardEvents();



   
}

document.addEventListener("DOMContentLoaded", initGame);







