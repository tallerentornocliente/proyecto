let board = [];
let currentPlayer = 'X';
let gameOver = false;

// Inicializar el tablero
for (let i = 0; i < 9; i++) {
    board.push('');
    document.getElementById(`cell-${i}`).addEventListener('click', handleCellClick);
}

function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.split('-')[1];
    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());
        checkWin();
        currentPlayer = currentPlayer === 'X'? 'O' : 'X';
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        if (board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]] && board[condition[0]]!== '') {
            gameOver = true;
            alert(`El jugador ${board[condition[0]]} ha ganado!`);
            return;
        }
    }
    if (!board.includes('')) {
        gameOver = true;
        alert('Empate!');
    }
}