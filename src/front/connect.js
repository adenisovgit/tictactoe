import { connect } from 'react-redux';
import { actions as actionCreators } from './reducers';
import {
  handleNewGame, handleRound, handleResetGame, handleGetGame,
} from './features/game/gameSlice';

export default (mapStateToProps) => (Component) => connect(mapStateToProps,
  {
    ...actionCreators,
    handleNewGame,
    handleRound,
    handleResetGame,
    handleGetGame,
  })(Component);
