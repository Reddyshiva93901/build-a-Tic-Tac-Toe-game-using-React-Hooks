import React, { useState, useEffect } from "react";
import "./App.css";

const PLAYER_X = "X";
const PLAYER_O = "O";
const INITIAL_BOARD = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          return;
        }
      }

      if (board.every((cell) => cell !== null)) {
        setWinner("Draw");
      }
    };

    checkWinner();
  }, [board]);

  const handleCellClick = (index) => {
    if (!board[index] && !winner) {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[index] = currentPlayer;
        return newBoard;
      });

      setCurrentPlayer((prevPlayer) =>
        prevPlayer === PLAYER_X ? PLAYER_O : PLAYER_X
      );
    }
  };

  const handleRestart = () => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer(PLAYER_X);
    setWinner(null);
  };

  const renderCell = (index) => (
    <div className="cell" onClick={() => handleCellClick(index)}>
      {board[index]}
    </div>
  );

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      <div className="status">
        {winner ? (
          <p>{winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`}</p>
        ) : (
          <p>Current Player: {currentPlayer}</p>
        )}
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default App;
