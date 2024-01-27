import Cell from './Cell';

export default function Board({ xIsNext, squares, onPlay }) {
    function handleClick(r, c) {
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[r][c] = 'X';
        } else {
            nextSquares[r][c] = 'O';
        }
        onPlay(nextSquares);
    }

    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8];

    return (rows.map(r => <div key={`row${r}`} className="board-row">
        {cols.map(c =>
            <Cell key={`cell${r}:${c}`} color={(parseInt(r) + parseInt(c)) % 2 === 0} value={squares[r][c]} onSquareClick={() => handleClick(r, c)} />
        )}
    </div>));
}