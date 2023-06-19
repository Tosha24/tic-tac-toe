import React from 'react'

const Square = ({value, onSquareClick}) => {
  return (
    <button className={`${value === 'X' ? 'bg-orange-100' : 'bg-purple-50'} border border-cyan-600 h-20 w-20 cursor-pointer bg-fuchsia-200 text-3xl`} onClick={onSquareClick}>
        {value}
    </button>
  );
}

export default Square;