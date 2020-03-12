/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import routes from '../routes';

import connect from '../connect';

const GlobalHistory = (props) => {
  const [state, setState] = useState({
    isFetching: false, ai: 0, player: 0, X: 0, O: 0, list: [],
  });

  const { setNotification } = props;
  const handleGetStats = async () => {
    if (state.isFetching) return;
    try {
      setState((prevState) => ({
        ...prevState, isFetching: true,
      }));
      setNotification({ notificationType: 'secondary', notificationShow: true, message: 'Loading statistics' });
      const res = await axios.get(routes.score());
      const {
        data: {
          result: {
            ai, player, X, O, list,
          },
        },
      } = res;
      setState((prevState) => ({
        ...prevState, ai, player, X, O, list,
      }));
      setNotification({ notificationType: 'success', notificationShow: true, message: 'Statistics loaded' });
    } catch (err) {
      setNotification({ notificationType: 'warning', notificationShow: true, message: `Can't load statristics: ${err}` });
    } finally {
      setState((prevState) => ({
        ...prevState, isFetching: false,
      }));
    }
  };

  const handleResetStats = async () => {
    if (state.isFetching) return;
    try {
      setState((prevState) => ({
        ...prevState, isFetching: true,
      }));
      setNotification({ notificationType: 'secondary', notificationShow: true, message: 'Reseting statistics' });
      const res = await axios.post(routes.fullReset());
      const {
        data: {
          result: {
            ai, player, X, O, list,
          },
        },
      } = res;
      console.log(ai, player, X, O, list);
      setState((prevState) => ({
        ...prevState, ai, player, X, O, list,
      }));
      setNotification({ notificationType: 'success', notificationShow: true, message: 'Statistics reset' });
    } catch (err) {
      setNotification({ notificationType: 'warning', notificationShow: true, message: `Can't reset statristics: ${err}` });
    } finally {
      setState((prevState) => ({
        ...prevState, isFetching: false,
      }));
    }
  };

  useEffect(() => {
    handleGetStats();
  }, []);

  return (
    <Container>
      <Col sm={4}>
        <Row>
          <Col>
            <Button variant="outline-primary" onClick={handleGetStats}>Refresh statistics</Button>
          </Col>
          <Col>
            <Button variant="outline-primary" onClick={handleResetStats}>Reset statistics</Button>
          </Col>
        </Row>
        <Row className="card-body">
          Players win:
          {`AI: ${state.ai}, human: ${state.player}`}
        </Row>
        <Row className="card-body">
          Teams win:
          {`O: ${state.O}, X: ${state.X}`}
        </Row>
      </Col>
      <Col sm={8}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Who wins</th>
              <th>Team wins</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {state.list.map((el, id) => (
              <tr key={id}>
                <td>{el.winner}</td>
                <td>{el.team}</td>
                <td>{new Date(el.ts).toString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Container>
  );
};

export default connect(null)(GlobalHistory);
