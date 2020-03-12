/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import connect from '../connect';
import Board from './board';
import GameHistory from './gamehistory';

const mapStateToProps = ({
  game: {
    board, history, ai, player,
  },
}) => ({
  board, history, ai, player,
});

const Game = (props) => {
  const {
    handleNewGame, handleRound, handleResetGame, handleGetGame, board, ai, player, history,
  } = props;
  useEffect(() => {
    handleGetGame();
  }, []);

  return (
    <Container>
      <Row>
        <Col sm={2}>
          <Button variant="outline-primary" onClick={handleNewGame}>Start new game</Button>
        </Col>
        <Col sm={3}>
          <Button variant="outline-primary" onClick={handleResetGame}>Reset current game</Button>
        </Col>
      </Row>
      <Row className="card-body">
        {`AI: ${ai}, player: ${player} \n`}
      </Row>
      <Row>
        <Col sm={4}>
          <Board data={board} handleRound={handleRound} />
        </Col>
        <Col>
          <Container fluid className="overflow-auto">
            <GameHistory history={history} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps)(Game);
