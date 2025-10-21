(() => {
  let board = Array(9).fill().map(() => Array(9).fill(0));
  let selectedCell = null;
  let gameBoard = null;
  let status = null;

  function init() {
    gameBoard = document.getElementById('board');
    status = document.getElementById('status');
    
    // Create 9x9 grid
    for (let i = 0; i < 81; i++) {
      const cell = document.createElement('div');
      cell.className = 'sudoku-cell';
      cell.dataset.row = Math.floor(i / 9);
      cell.dataset.col = i % 9;
      cell.addEventListener('click', () => selectCell(cell));
      gameBoard.appendChild(cell);
    }

    // Number pad events
    document.querySelectorAll('.num-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const num = parseInt(btn.dataset.num);
        if (selectedCell && num > 0) {
          setCell(selectedCell, num);
        } else if (selectedCell && num === 0) {
          clearCell(selectedCell);
        }
      });
    });

    // Game actions
    document.getElementById('new-game').addEventListener('click', newGame);
    document.getElementById('solve').addEventListener('click', solvePuzzle);

    newGame();
  }

  function selectCell(cell) {
    document.querySelectorAll('.sudoku-cell').forEach(c => c.classList.remove('selected'));
    cell.classList.add('selected');
    selectedCell = cell;
  }

  function setCell(cell, num) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    if (isValidMove(row, col, num)) {
      board[row][col] = num;
      cell.textContent = num;
      cell.classList.add('user-input');
      
      if (isComplete()) {
        status.textContent = 'Congratulations! Puzzle solved!';
      }
    } else {
      status.textContent = 'Invalid move!';
      setTimeout(() => status.textContent = 'Select a cell and enter a number', 2000);
    }
  }

  function clearCell(cell) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    board[row][col] = 0;
    cell.textContent = '';
    cell.classList.remove('user-input');
  }

  function isValidMove(row, col, num) {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (board[row][c] === num) return false;
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }
    
    return true;
  }

  function isComplete() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) return false;
      }
    }
    return true;
  }

  function generatePuzzle() {
    // Simple puzzle generation - fill some cells randomly
    board = Array(9).fill().map(() => Array(9).fill(0));
    
    // Fill diagonal 3x3 boxes first
    for (let box = 0; box < 9; box += 3) {
      fillBox(box, box);
    }
    
    // Fill remaining cells
    fillRemaining(0, 3);
    
    // Remove some cells to create puzzle
    let cellsToRemove = 40;
    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        cellsToRemove--;
      }
    }
  }

  function fillBox(row, col) {
    const nums = [1,2,3,4,5,6,7,8,9];
    shuffle(nums);
    let idx = 0;
    for (let r = row; r < row + 3; r++) {
      for (let c = col; c < col + 3; c++) {
        board[r][c] = nums[idx++];
      }
    }
  }

  function fillRemaining(row, col) {
    if (col >= 9 && row < 8) {
      row++;
      col = 0;
    }
    if (row >= 9) return true;
    
    if (row < 3) {
      if (col < 3) col = 3;
    } else if (row < 6) {
      if (col === Math.floor(row / 3) * 3) col += 3;
    } else {
      if (col === 6) {
        row++;
        col = 0;
        if (row >= 9) return true;
      }
    }
    
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(row, col, num)) {
        board[row][col] = num;
        if (fillRemaining(row, col + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function newGame() {
    generatePuzzle();
    renderBoard();
    status.textContent = 'Select a cell and enter a number';
    selectedCell = null;
  }

  function renderBoard() {
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      const value = board[row][col];
      
      cell.textContent = value || '';
      cell.classList.toggle('given', value !== 0);
      cell.classList.remove('user-input');
    });
  }

  function solvePuzzle() {
    // Simple solver - just fill remaining cells
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(r, c, num)) {
              board[r][c] = num;
              break;
            }
          }
        }
      }
    }
    renderBoard();
    status.textContent = 'Puzzle solved!';
  }

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!selectedCell) return;
    
    const key = e.key;
    if (key >= '1' && key <= '9') {
      setCell(selectedCell, parseInt(key));
    } else if (key === 'Backspace' || key === 'Delete') {
      clearCell(selectedCell);
    }
  });

  init();
})();


