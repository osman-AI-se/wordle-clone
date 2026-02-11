const state = {
    grid: Array(6)
          .fill()
          .map(() => Array(5).fill('')),
          currentRow: 0,
          currentColumn: 0,
};


function createBox(container, row, column, letter = '')
    {
        const box = document.createElement('div');
        box.className = 'box';
        box.id = `box${row}${column}`;
        box.textContent = letter;

        container.appendChild(box);
        return box;
    }
function drawGrid(container)
{
    const grid = document.createElement('div');
    grid.className = 'grid';

    for(let i = 0; i < 6;i++)//antal rader
    {
        for(let j = 0; j < 5; j++) //antal kolumner 
        {
            createBox(grid,i,j);
        }
    }
    container.appendChild(grid);
}


function initGame() //startar spelet
{
    const game = document.getElementById('game');
    if (game) {
        drawGrid(game);
    } else {
        console.error('Element with id="game" not found!');
    }
}

document.addEventListener("DOMContentLoaded", initGame);

/* ------------------  Hi Teams,  ------------------*/
/* ------------------ I need something similar this block to connect backend -------------------

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
    const key = event.key;

    if (key === "Enter") {
        submitGuess();
        return;
    }

    if (key === "Backspace") {
        if (state.currentColumn > 0) {
            state.currentColumn--;
            state.grid[state.currentRow][state.currentColumn] = '';
            updateBox(state.currentRow, state.currentColumn, '');
        }
        return;
    }

    if (/^[a-zA-Z]$/.test(key) && state.currentColumn < 5) {
        state.grid[state.currentRow][state.currentColumn] = key.toUpperCase();
        updateBox(state.currentRow, state.currentColumn, key.toUpperCase());
        state.currentColumn++;
    }
}

function updateBox(row, column, letter) {
    const box = document.getElementById(`box${row}${column}`);
    box.textContent = letter;
}

function submitGuess() {
    if (state.currentColumn !== 5) return;

    const guessWord = state.grid[state.currentRow].join('');

    fetch("/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ guess: guessWord })
    })
    .then(response => response.json())
    .then(data => {
        handleResult(data);
    });
}

function handleResult(data) {
    if (!data.valid) {
        alert(data.error);
        return;
    }

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${state.currentRow}${i}`);
        box.classList.add(data.result[i]);
    }

    if (data.status === "won") {
        alert("You won!");
        return;
    }

    if (data.status === "lost") {
        alert("Game Over!");
        return;
    }

    state.currentRow++;
    state.currentColumn = 0;
}
    */