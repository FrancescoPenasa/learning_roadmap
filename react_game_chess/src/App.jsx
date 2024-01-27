import { useState } from 'react'
import './App.css'

function Cell({ color, value, onSquareClick }) {
  // remove the logic from here
  const [isHighlight, setIsHighlight] = useState("cell");

  if (color) {
    return <div className={isHighlight} style={{
      backgroundColor: '#ffcf9f'
    }
    } onClick={onSquareClick}>
      {value}
    </div >
  } else {
    return <div className={isHighlight} style={{
      backgroundColor: '#d28c45',
    }
    } onClick={onSquareClick}>
      {value}
    </div >
  }
}


function Board({ xIsNext, squares, onPlay }) {
  const [firstClick, setFirstClick] = useState(-1);
  const [secondClick, setSecondClick] = useState(-1);

  // here the logic to move
  function handleClick(r, c) {
    const nextSquares = squares.slice();
    if (firstClick === -1) {
      setFirstClick(r * 8 + c);
      setSecondClick(-1);
    }

    if (secondClick === -1 && firstClick !== -1) {
      setSecondClick(r * 8 + c);

      nextSquares[r * 8 + c] = nextSquares[firstClick];
      nextSquares[firstClick] = '';
      setFirstClick(-1);
    }

    onPlay(nextSquares);
  }

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  return (rows.map(r => <div key={`row${r}`} className="board-row">
    {cols.map(c =>
      <Cell key={`cell${r}:${c}`} color={(r + c) % 2 === 0} value={squares[r * 8 + c]} onSquareClick={() => handleClick(r, c)} />
    )}
  </div>));
}

function App() {
  const initialBoard = Array('rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  initialBoard.map(item => item !== '' ? 'p0' + item : item);
  const [history, setHistory] = useState([initialBoard.map(item => item !== '' ? 'p0' + item : item).concat(initialBoard.slice().reverse().map(item => item !== '' ? 'p1' + item : item))]);
  // const [history, setHistory] = useState([initialBoard.concat(initialBoard.slice().reverse())]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <>
      <header>
        <h1>Chess game</h1>
      </header>
      <div className="board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <footer>
        This is a game of chess
      </footer>
    </>
  )
}

export default App
