/* eslint-disable react/no-array-index-key */
import React from 'react';

import Cell from './cell';

const Board = (props) => {
  const { data, small, handleRound } = props;
  return (
    <div>
      {data.map((line, lineIndex) => (
        <div key={lineIndex} className="board-row">
          {line.map((cell, cellIndex) => {
            const index = lineIndex * 3 + cellIndex + 1;
            return (
              <Cell key={index} value={cell} handleClick={() => handleRound(index)} small={small} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
