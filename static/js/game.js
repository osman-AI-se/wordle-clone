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