/* eslint-disable no-restricted-globals */
import React from 'react';

const Cell = (props) => {
  const { handleClick, value, small } = props;
  const buttonCN = `cell ${small && 'small'}`;
  const onClick = (isNaN(value) || small) ? () => null : handleClick;
  return (
    <button type="button" className={buttonCN} onClick={onClick}>
      {!isNaN(value) || value}
    </button>
  );
};

export default Cell;
