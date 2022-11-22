class Gameboard {
  constructor(size = 9) {
    this.board = this.create(size);
    this.size = size;
  }

  create(size) {
    const board = [];
    for (let row = 0; row < size; row++) {
      board[row] = [];
      for (let col = 0; col < size; col++) {
        board[row][col] = "-";
      }
    }
    return board;
  }

  potentialMoves(pos) {
    const col = pos[1];
    const row = pos[0];
    const moves = [
      [row + 2, col + 1],
      [row - 2, col + 1],
      [row + 2, col - 1],
      [row - 2, col - 1],
      [row + 1, col + 2],
      [row - 1, col + 2],
      [row + 1, col - 2],
      [row - 1, col - 2],
    ];
    return moves.filter(
      (move) =>
        move[0] >= 0 &&
        move[1] >= 0 &&
        move[0] < this.size &&
        move[1] < this.size
    );
  }

  mark(pos, marker = "X") {
    const row = pos[0];
    const col = pos[1];
    this.board[row][col] = marker;
  }

  print() {
    let columnNumbers = "  ";
    for (let i = 0; i < this.size; i++) {
      columnNumbers = `${columnNumbers}${i},`;
    }
    console.log(columnNumbers.slice(0, -1));
    this.board.forEach((row, i) => console.log(i, `${row}`));
  }
}

const knightMoves = (start, target) => {
  const board = new Gameboard();
  const [targetRow, targetCol] = target;

  console.log(`start ${start}\ntarget: ${target}`);

  // prevent target position outside of the board
  if (targetRow > this.size - 1 || targetCol > this.size - 1) {
    console.log("Out of bounds! Nice try, wise guy.");
    return;
  }

  const moveHistory = new Set();
  let level = 0;
  const queue = [[start, level, []]];

  while (queue.length) {
    let [current, level, history] = queue.shift();
    const [currentRow, currentCol] = current;

    moveHistory.add(current);
    history = [...history, current];

    if (currentRow === targetRow && currentCol === targetCol) {
      console.log("found it! total moves:", level);
      console.log(history.join(" -> "), "\n");
      history.forEach((m, i) => board.mark(m, i));
      board.print();
      return;
    }

    const nextMove = board.potentialMoves(current);

    nextMove.forEach((move) => {
      // check if move has been made already:
      let historyContainsNextMove = 0;
      for (const prevMov of moveHistory) {
        if (prevMov.toString() === move.toString()) {
          historyContainsNextMove = 1;
        }
      }

      if (!historyContainsNextMove) {
        moveHistory.add(current);
        queue.push([move, level + 1, history]);
      }
    });
  }
};

knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
