let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;
let gameMode = "human";
// let scoreX = 0;
// let scoreO = 0;

function startGame(mode) {
  gameMode = mode;
  resetGame();
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  document.getElementById("status").textContent = "";
  const oldLine = document.getElementById("win-line");
  if (oldLine) oldLine.remove();
  renderBoard();
}

 function renderBoard() {
      const boardContainer = document.getElementById("board");
      boardContainer.innerHTML = "";
      board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.textContent = cell;
        div.onclick = () => handleMove(index);
        boardContainer.appendChild(div);
      });
    }

    // Handles a player move
    function handleMove(index) {
      if (isGameOver || board[index] !== "") return;

      board[index] = currentPlayer;
      renderBoard();

      if (checkWin(currentPlayer)) {
        document.getElementById("status").textContent = `${currentPlayer} wins!`;
        isGameOver = true;
        return;
      }

      if (board.every(cell => cell !== "")) {
        document.getElementById("status").textContent = "It's a draw!";
        isGameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";

      // If playing vs AI and it's AI's turn
      if (gameMode === "ai" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
      }
    }

    // Simple AI that picks a random available spot
    function computerMove() {
      const emptyCells = board.map((cell, i) => cell === "" ? i : null).filter(i => i !== null);
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      handleMove(randomIndex);
    }

    // Checks if the given player has won
    function checkWin(player) {
      const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      return winPatterns.some(pattern => pattern.every(index => board[index] === player));
    }

    document.addEventListener("DOMContentLoaded", renderBoard);

   