import React, { useEffect, useState } from "react";
import Square from "./Square";
import { FcUndo, FcRedo } from "react-icons/fc";
import { Tooltip } from "react-tooltip";

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [moveHistory, setMoveHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isTie, setIsTie] = useState(false);
  let status;

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newMoveHistory = moveHistory.slice(0, currentMove + 1);
    newMoveHistory.push(newBoard);
    setMoveHistory(newMoveHistory);
    setCurrentMove(currentMove + 1);

    setCurrentPlayer(currentPlayer === "X" ? "0" : "X");
  };

  useEffect(() => {
    const gameWinner = calculateWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
    } 
    else if (board.every((square) => square !== null)) {
        setIsTie(true);
    }
  }, [board, currentPlayer])

  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleUndo = () => {
    if(currentMove === 0 || winner) return;
    setCurrentMove(currentMove - 1);
    setCurrentPlayer(currentPlayer === "X" ? "0" : "X")
    setBoard(moveHistory[currentMove - 1]);
  }

  const handleRedo = () => {
    if(currentMove === moveHistory.length - 1) return;
    setCurrentMove(currentMove + 1);
    setBoard(moveHistory[currentMove + 1]);
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setCurrentMove(0);
    setMoveHistory(Array(9).fill(null));
    setIsTie(false);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div className="text-2xl font-bodyFont text-cyan-800">
        {winner ? 
        <div className='flex flex-col gap-3'> 
            The winner is Player: {winner}
            <button className='border-2 border-black rounded-full p-1 hover:bg-rose-200 hover:-translate-y-1' onClick={resetGame}>
                Reset Game
            </button>
        </div>
        : 
        isTie ?
        <div className='flex flex-col gap-3'> <span>The game is Tie</span>
          <button className='border-2 border-black rounded-full p-1 hover:bg-rose-200 hover:-translate-y-1' onClick={resetGame}>
                Reset Game
            </button>
             </div>
        :
        <span>
            Turn of Player: {currentPlayer}
        </span>
        }
      </div>
      {/* Board */}
      <div className="mt-10 flex flex-col">
        <div className="flex flex-row">
          <Square value={board[0]} onSquareClick={() => handleClick(0)} />
          <Square value={board[1]} onSquareClick={() => handleClick(1)} />
          <Square value={board[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex flex-row">
          <Square value={board[3]} onSquareClick={() => handleClick(3)} />
          <Square value={board[4]} onSquareClick={() => handleClick(4)} />
          <Square value={board[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex flex-row">
          <Square value={board[6]} onSquareClick={() => handleClick(6)} />
          <Square value={board[7]} onSquareClick={() => handleClick(7)} />
          <Square value={board[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      {/* Undo and Redo */}
      <div className="flex flex-row text-3xl gap-28 md:text-5xl my-4 md:gap-72">
        <div className="border-2 border-cyan-600 rounded-full p-4 hover:bg-fuchsia-200 hover:-translate-y-1 duration-300">
          <FcUndo data-tooltip-id="tooltip-1" data-tooltip-content="Undo" onClick={handleUndo} disabled={currentMove === 0}/>
        </div>
        <div className="border-2 border-cyan-600 rounded-full p-4 hover:bg-fuchsia-200 hover:-translate-y-1 duration-100">
          <FcRedo data-tooltip-id="tooltip-2" data-tooltip-content="Redo" onClick={handleRedo} disabled={currentMove === moveHistory.length - 1}/>
        </div>
      </div>
      <Tooltip
        id="tooltip-1"
        place="bottom"
        effect="solid"
        className="text-xs"
      />
      <Tooltip
        id="tooltip-2"
        place="bottom"
        effect="solid"
        className="text-xs"
      />
    </div>
  );
};

export default Board;
