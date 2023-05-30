import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  /**
   * ! important
   * when you passing onSquareClick={handleClick}, you were passing the handleClick function down as a prop.
   * you were not calling it, but now you are calling that function right away
   * notice the parentheses in handleClick, and that's why it runs too early.
   * you don't want to call handleClick until the user clicks!
   *
   * * you could fix by creating a function like handleFirstSquareClcik that calls handleClick(0)
   */
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
} // ========== end of Board function.

/**
 * Now thta your state handling is in the Board component, the parent Board component passes props to the child S
 * Squaare components so that they can be displayed correctly.
 * When click on a Square, the child Square component now asks the parent Board component to update the state of
 * the board.
 * When the Board's state changes, both the Board component and every child Square re-renders automatically
 * Keeping the state of all squares in the Board component will allow it to determine the winner in the future.
 *
 */

function calculateWinner(squares) {
  console.log("running calculateWinner function");
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    console.log(`i : ${i}`);
    const [a, b, c] = lines[i];
    console.log(`a : ${a}`);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
