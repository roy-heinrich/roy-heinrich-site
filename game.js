(() => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const status = document.getElementById('status');
  const reset = document.getElementById('reset');
  const board = new Array(9).fill('');
  let current = 'X';
  let finished = false;

  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function updateStatus(text) { status.textContent = text; }

  function checkWinner() {
    for (const [a,b,c] of wins) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        finished = true;
        updateStatus(`Player ${board[a]} wins!`);
        highlight([a,b,c]);
        return true;
      }
    }
    if (board.every(Boolean)) {
      finished = true;
      updateStatus('Draw!');
      return true;
    }
    return false;
  }

  function highlight(idxs) {
    idxs.forEach(i => cells[i].classList.add('win'));
  }

  function handleMove(idx) {
    if (finished || board[idx]) return;
    board[idx] = current;
    cells[idx].textContent = current;
    cells[idx].setAttribute('aria-label', `cell ${idx+1} ${current}`);
    if (!checkWinner()) {
      current = current === 'X' ? 'O' : 'X';
      updateStatus(`Player ${current}'s turn`);
      if (current === 'O') setTimeout(aiMove, 250); // simple AI delay
    }
  }

  function aiMove() {
    if (finished) return;
    // simple AI: win > block > center > corners > sides
    const empty = board.map((v,i) => v ? null : i).filter(v => v !== null);
    const pick = (
      findLine('O') ??
      findLine('X') ??
      (empty.includes(4) ? 4 : null) ??
      empty.find(i => [0,2,6,8].includes(i)) ??
      empty[0]
    );
    if (typeof pick === 'number') handleMove(pick);
  }

  function findLine(player) {
    for (const [a,b,c] of wins) {
      const line = [board[a], board[b], board[c]];
      if (line.filter(v => v === player).length === 2 && line.includes('')) {
        const idx = [a,b,c][line.indexOf('')];
        if (board[idx] === '') return idx;
      }
    }
    return null;
  }

  cells.forEach(btn => btn.addEventListener('click', () => handleMove(Number(btn.dataset.idx))));
  reset.addEventListener('click', () => {
    for (let i=0;i<9;i++){ board[i]=''; cells[i].textContent=''; cells[i].classList.remove('win'); cells[i].setAttribute('aria-label', `cell ${i+1}`);} 
    current='X'; finished=false; updateStatus("Player X's turn");
  });
})();









