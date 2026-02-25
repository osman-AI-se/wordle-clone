
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






