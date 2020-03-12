import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import connect from '../connect';
import Game from './game';
import GlobalHistory from './globalhistory';
import Notification from '../features/ui/notification';

const mapStateToProps = ({ ui }) => {
  const props = { ui };
  return props;
};

@connect(mapStateToProps)
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { view: 'game' };
  }

  render() {
    const { view } = this.state;
    const { ui: { notificationShow, notificationType, message } } = this.props;
    return (
      <>
        <Jumbotron fluid>
          <Container>
            <Notification show={notificationShow} type={notificationType} message={message} />
            <h1>Tic tac toe</h1>
            <p>
              <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">https://en.wikipedia.org/wiki/Tic-tac-toe</a>
            </p>
            <Button variant="primary" onClick={() => this.setState({ view: 'game' })}>Текущая игра</Button>
            {' '}
            <Button variant="primary" onClick={() => this.setState({ view: 'history' })}>История игр</Button>
          </Container>
        </Jumbotron>
        {view === 'game' ? <Game /> : <GlobalHistory />}
      </>
    );
  }
}

export default App;
