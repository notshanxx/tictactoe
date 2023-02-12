const grid = document.getElementById("grid-div");
const resetBtn = document.getElementById("reset-button");
const announceDisplay = document.getElementById("announce");
// const turnDisplay = document.getElementById("turn");

let gridArr = ["", "", "", "", "", "", "", "", ""];
let isXTurn = true;
let gridcell = grid.children;

// event listeners
resetBtn.addEventListener("click", () => {
  gridArr.forEach((element, index, array) => {
    //  to default
    array[index] = "";
    // gridArr and gridcell have same index so it will clear
    gridcell[index].textContent = "";
    // disable click
    grid.style.pointerEvents = "auto";
    announceDisplay.textContent = `Player X turn`;
    isXTurn = true;
  });
});

// add event listener on all the grids children or the squares
for (let i = 0; i < gridcell.length; i++) {
  let gridChild = gridcell[i];

  gridChild.addEventListener("click", () => {
    // prevent reassigning
    if (gridChild.textContent === "") {
      // if isXTurn = true add X else O
      if (isXTurn) {
        gridChild.textContent = "X";
        isXTurn = false;
        gridArr[i] = "X";
      } else {
        gridChild.textContent = "O";
        isXTurn = true;
        gridArr[i] = "O";
      }
      // end of second condition
    }
    // check winner every move
    checkWinner(gridArr);
  });
}
// board = the gridArr
function checkWinner(board) {
  // winning combination the grid position
  // EXAMPLE
  // [0,4,8]

  // [X,O,O]
  // [O,X,O]
  // [O,O,X]
  // which the first X index is 0 second X index is 4 last X is 8

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    // a b c is the combination
    // checkwether if there is the same str in each combination
    // try all combination
    const [a, b, c] = winningCombinations[i];
    // if a b c is same and is not "" do this
    if (board[a] === board[b] && board[b] === board[c] && board[a] != "") {
      // disable click
      grid.style.pointerEvents = "none";
      announceDisplay.textContent = `Player ${board[a]} is the Winner`;
      return;
    }
  }
  // display whose turn
  if (isXTurn) {
    announceDisplay.textContent = `Player X turn`;
  } else {
    announceDisplay.textContent = `Player O turn`;
  }
  // if all grid is fille and no winner display draw
  if (gridArr.every(Boolean)) {
    announceDisplay.textContent = `Draw`;
  }
}
