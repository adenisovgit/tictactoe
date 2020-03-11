import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import connect from '../connect';

const mapStateToProps = ({ ui }) => {
  const props = { ui };
  return props;
};

@connect(mapStateToProps)
class App extends React.PureComponent {
  render() {
    // const { } = this.props;
    return (
      <Jumbotron fluid>
        <Container>
          <h1>Tic tac toe</h1>
          <p>
            <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">https://en.wikipedia.org/wiki/Tic-tac-toe</a>
          </p>
        </Container>
      </Jumbotron>
    );
  }
}

export default App;
