let gameBoard = [];
let currentPlayer = 'X';
let gameOver = false;

// Inicializar el tablero
for (let i = 0; i < 9; i++) {
    gameBoard.push('');
    document.getElementById(`cell-${i}`).addEventListener('click', handleCellClick);
}

// Función para manejar el click en una celda
function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.split('-')[1];
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWin();
        if (!gameOver) {
            currentPlayer = 'O';
            setTimeout(() => {
                const bestMove = minimax(gameBoard, 'O');
                gameBoard[bestMove.index] = 'O';
                document.getElementById(`cell-${bestMove.index}`).textContent = 'O';
                checkWin();
                currentPlayer = 'X';
            }, 500);
        }
    }
}

// Función para verificar si hay un ganador
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
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[0]] !== '') {
            gameOver = true;
            document.getElementById('game-status').textContent = `Ganó ${gameBoard[condition[0]]}!`;
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameOver = true;
        document.getElementById('game-status').textContent = 'Empate!';
    }
}

// Función para reiniciar el juego
document.getElementById('new-game').addEventListener('click', () => {
    gameBoard = [];
    currentPlayer = 'X';
    gameOver = false;
    for (let i = 0; i < 9; i++) {
        gameBoard.push('');
        document.getElementById(`cell-${i}`).textContent = '';
    }
    document.getElementById('game-status').textContent = '';
});

// Función para el algoritmo minimax
function minimax(board, depth, isMaximizing) {
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
        if (board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]] && board[condition[0]] !== '') {
            if (board[condition[0]] === 'X') {
                return { score: -1 };
            } else {
                return { score: 1 };
            }
        }
    }
    if (!board.includes('')) {
        return { score: 0 };
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score = minimax(board, depth + 1, false).score;
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return { score: bestScore, index: findBestMove(bestScore) };
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                const score = minimax(board, depth + 1, true).score;
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return { score: bestScore, index: findBestMove(bestScore) };
    }
}

// Función para encontrar el mejor movimiento
function findBestMove(score) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            const score2 = minimax(gameBoard, 0, false).score;
            gameBoard[i] = '';
            if (score2 > bestScore) {
                bestScore = score2;
                move = i;
            }
        }
    }
    return move;
}