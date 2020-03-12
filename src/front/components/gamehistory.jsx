/* eslint-disable react/no-array-index-key */
import React from 'react';

import Board from './board';

const GameHistory = (props) => {
  const { history } = props;

  return (
    <div>
      История игры:
      {history.map((round, rIndex) => (
        <div key={rIndex}>
          Ход номер:
          {rIndex + 1}
          <Board data={round} small />
        </div>
      ))}
    </div>
  );
};

export default GameHistory;
