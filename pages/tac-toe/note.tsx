import { useState } from "react";
function board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
}

function Square2({ value }) {
  //Next, you'll edit the square component to recieve the value prop from the Board component.
  //this will require removing the Square component's own stateful tracking of value and
  //the button's onClick prop:
  // * const [value, setValue] = useState(null); ==> no longer used
  // function handleClick() {
  //   setValue("X");
  // }

  return <button className="square">{value}</button>;
}

// *Array(9).fill(null) creates n array with nine elements and sets each of them to null
//the useState() call around it declares a squares state variable that's initially set to that array.
//Each entry in the array corresponds to the value of a square. When you fill the board in later,
//t=he squares array will look like this:
//['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
/**
 *  *Now, your Board component needs to pass the value
 * <Square /> => <Square value={squares[0]} />
 */
// Each square will now receive a value prop that will either be 'X',or null

/**
 * *Each Square will now receive a value prop that will either be 'X', '0'.=, or null for empty squares
 * * Next,you need to change what happens when a Square is clicked.
 *  The @Board component now maintains which squares qre filled.
 *  ? You'll need to create a way for the Square to update the Board's state.
 *   Since state is private to a component that defines it,
 *   ! you cannot update the Board's state directly from Square
 *
 * *Instead, you'll pass a down a function from the Board component to the square component,
 * and you'll have square call that function when a square is clicked.
 * You'll start with the function that the Square component will call when it is clicked.
 *
 */

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/**
 * Now you'll connect the onSquareClick prop to a function in the Board component that you'll
 * name handleClick.
 * *To connect onSquareClick to handleClick you'll pass a function to the onSquareClick prop
 * *of the first Square component:
 */

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  //you will define the handleClick function inside the Board component to update the squares
  // array holding your baard's state:

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares); // calling the setSquares function lets React know the
    //state of the component has changed. This will trigger a re-render of the components that
    //use the squares state (Board) as well as its child components
    // (the Square components that make up the board )
  }

  //The handleClick function creates a copy of the squares array (nextSquares)
  //with the JavaScript slice() Array method. Then, handleClick updates the nextSquares array to
  //add X to the first ([0] index) square.

  /**
   * * calling the setSquares function lets React know the state of the component has changed.
   * This will trigger a re-render of the components that use the squares state ( Board )
   * as well as its child components (the square components that make up the board).
   *
   */

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
      </div>
    </>
  );
}

//Now you can add X's to the board... but only to the upper left square
/**
 * *Your handleClick function is hardcodded to update the index for the upper left square (0).
 * Let's update handleClick to be able to update any square. Add an argument i to the handleClick
 * function that takes the index of the square to update:
 */

export function Board3() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }
  /**
   * Next, you will need to past that i to handleClick.
   * You could try to set the onSquareClick prop of square to be handleClick(0)
   * directly in the JSX like this, but it won't work:
   */

  return (
    <>
      <Square value={squares[0]} onSquareClick={handleClick(0)} />
    </>
  );

  /**
   * Here is why this doesnt wotk.
   * * The handleClick(0) call will be a part of rendering of the board component.
   * Because handleClick(0) alters the state of the board component by calling setSquares,
   * your entire board component will be re-rendered again.
   * But this runs handleClick(0) again, leading to an infinite loop:
   *
   * ? Why didn't this problem problem happen earlier?
   * When you were passing onSquareClick={handleClick},
   * you were passing the handleClick function down as a prop. -> you were not calling it!
   * * But now you are calling that function right away
   * -- notice the parentheses in handleClick(0) -- and that's why it runs too early.
   * ! You don't want to call handleClick until the user clicks!
   *
   * you could fix by creating a function like  handleFirstSquareC;ocl that calls handleClick(0),
   * a function like handleSecondSquareClick that calls handleClick(1), and so on.
   * You would pass (rather than call) these function down as props like
   * onSquareClick={handleFirstSquareClick}.
   *
   * However, defining nine different functions and giving each of them name is too verbose.
   * instead:
   */
  //<div className="board-row"><Square value={squares[0]} onSquareClick={() => handleClick(0)></div>
}

// notice the new () => syntax. Here, () => handleClick(0) is an arrow function, which is a
/**
 * shorter way to define functions. When the square is blocked, the code after the => "arrow"
 * will run, calling handleClick(0)
 *
 * * Now you need to. update the other eight squares to call handleClick from the arrow function
 * you pass. Make sure that the argument for each call of the handleClick corresponds
 * to the index of the correct square:
 */

/**
 * * Why immutability is important
 * Note how in handleClick, you call .slice() to create a coppy of the squares array instead of modifying
 * the existing array. To explain why, we need to discuss immutability andand why immutability is important to learn.
 *
 * There are generally two approaches to changing data. The first approach is to mutate the data by directly changing
 * the data's values. The second approach is to replace the data with a new copy which has the desired changes.
 * Here is what it would look like if you mutated the squares array:
 */

const squares = [null, null, null, null, null, null];
squares[0] = "X";

const squares2 = [null, null, null, null, null];
const nextSquares = ["X", null];

/**
 * There is also another benefit of immutability. By default, all child components re-render automatically
 * when the state of a parent component changes. This includes even the child components that weren't affected
 * by the change. Although re-rendering is not by itself noticeable to the user (you shouldn't actively try to avoid it)
 * you might want to skip re-rendering a part of the tree the clearly wasn't affected by it for performance reasons.
 *
 * immutabilty makes it very cheap for components to compare whether their data has chagned or not.
 * You can learn more about how React choose when to render a component in the memo API reeference.
 */

/**
 * *Taking turns
 *
 * It's now time to fix a major defect in this tic-tac-toe game : the "O"s cannot be marked on the board.
 *
 * You'll set the first move to be "X" by default. Let's keep track of this by adding another piece of state
 * to the Board component:
 */

function Board123() {
  const [xIsNext, setXisNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXisNext(!xIsNext);
  }
}

/**
 * Now, as you click on different squares, they will alternate between X and O, as they should!
 *
 * But wait, there's a problem. Try clicking on the same square multiple times,
 * the X is overwritten by an 0! While this would add a very
 *
 * The X is overwritten by an 0! while this would add avery interesting twist to the game,
 * we stick to the original rules now.
 *
 * when you mark a square with a X or an O you arent first checkings to see if the square already has value
 * You can fix this by returning early. You'll check to see if the square already has a X or an 0.
 * If the square is already filled, you will return in the handleClick funciton early -- before it tries
 * to update the board state
 */

/**
 * *DECLARING A WINNER
 * Now that the player can take turns, you'll want to show when the game is won and there are no more turns to make.
 * To do this you'll add a helper function called calculateWinner that takes an array of 9 squares, checks for a winner
 * and returns 'X', 'O', or null as appropriate. Don't worry too much about the calculateWinner function;
 */

function calculateWinner(squares) {
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * You will call calculateWinner (squares) in the Board component's handleClick function to check if a
 * player has won. You can perform this check at the same time you check if a user has clicked a
 * square
 */

function handleClick2(i) {
  if (squares[i] || calculateWinner(squares)) {
    return;
  }
  const nextSquares = squares.slice();
}

/**
 * Tp le  the players know when the game is over, you can display text such as a
 * "Winner: X" or "Winner: O". To do that you'll add a status a status section to the Board
 * component. The status will display the winner if the game is over and if the game is ongoing you'll
 * display which player's turn is next:
 *
 */

function Board44() {
  const [xIsNext, setXIsNext] = useState(true);
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
    </>
  );
}

/**
 * *Adding time travel
 * as a final exercise, let's make it possible to "go back in time" to the previous moves in the game
 *
 * Storing a history of moves.
 * if you mutated the squares array, implementing time travel would be very difficult.
 *
 * However, you used slice() to create a new copy of the squares
 *
 */
