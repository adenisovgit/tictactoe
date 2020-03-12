import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as uiActions } from '../ui/uiSlice.js';
import routes from '../../routes';


const initialState = {
  board: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], history: [], ai: 'X', player: 'O', end: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    newRound: (state, action) => {
      const { payload: board } = action;
      const { history } = state;
      return ({ ...state, board, history: [...history, board] });
    },
    newGame: (state, action) => {
      const {
        payload: {
          board, ai, player,
        },
      } = action;
      return ({
        ...initialState, board, ai, player,
      });
    },
    loadGame: (state, action) => {
      const {
        payload: {
          board, ai, player, end,
        },
      } = action;
      return ({
        ...initialState, board, ai, player, end,
      });
    },
    clearGame: () => initialState,
  },
});

export const handleGetGame = () => async (dispatch) => {
  try {
    dispatch(uiActions
      .setNotification({ notificationType: 'secondary', notificationShow: true, message: 'Loading game' }));
    const res = await axios.get(routes.game());
    const {
      data: {
        result: {
          board, end, winner = 'nobody', ai, player,
        },
      },
    } = res;
    console.log(res.data);
    dispatch(gameSlice.actions.loadGame({
      board, ai, player, end,
    }));
    const message = end ? `Game loaded, ${winner.toUpperCase()} wins! Please,start new game.` : 'Game loaded, your turn, messir:';
    dispatch(uiActions
      .setNotification({ notificationType: 'success', notificationShow: true, message }));
  } catch (err) {
    dispatch(uiActions
      .setNotification({ notificationType: 'warning', notificationShow: true, message: `Can't start game, ${err}` }));
  }
};

export const handleNewGame = () => async (dispatch) => {
  try {
    dispatch(uiActions
      .setNotification({ notificationType: 'secondary', notificationShow: true, message: 'Preparing game' }));
    const res = await axios.get(routes.newGame());
    const {
      data: {
        result: {
          board, ai, player,
        },
      },
    } = res;
    dispatch(gameSlice.actions.newGame({
      board, ai, player,
    }));
    if (ai === 'X') dispatch(gameSlice.actions.newRound(board));
    dispatch(uiActions
      .setNotification({ notificationType: 'success', notificationShow: true, message: 'Game prepared, your turn, messir' }));
  } catch (err) {
    dispatch(uiActions
      .setNotification({ notificationType: 'warning', notificationShow: true, message: `Can't start game, ${err}` }));
  }
};

export const handleRound = (index) => async (dispatch, getState) => {
  const {
    board: playerMove, player, end: endBefore,
  } = getState().game;
  if (endBefore) return;

  try {
    const getBoardAfterPlayerMove = () => {
      const tmp = [...playerMove[0], ...playerMove[1], ...playerMove[2]];
      tmp[index - 1] = player;
      const result = [tmp.splice(0, 3), tmp.splice(0, 3), tmp];
      return result;
    };

    dispatch(uiActions
      .setNotification({ notificationType: 'secondary', notificationShow: true, message: 'Processing your turn' }));
    const res = await axios.post(routes.round(), { index });
    const {
      data: {
        result: {
          board, end: gameEnd, winner = 'nobody',
        },
      },
    } = res;
    console.log('round', res.data);

    if (!(gameEnd && winner === 'player')) {
      dispatch(gameSlice.actions.newRound(getBoardAfterPlayerMove()));
    }

    dispatch(gameSlice.actions.newRound(board));

    const message = gameEnd ? `Game finished, ${winner.toUpperCase()} wins! Please,start new game.` : 'You turn, messir.';
    dispatch(uiActions
      .setNotification({ notificationType: 'success', notificationShow: true, message }));
  } catch (err) {
    dispatch(uiActions
      .setNotification({ notificationType: 'warning', notificationShow: true, message: `Can't proccess turn, please check connection: ${err}` }));
  }
};


export const handleResetGame = () => async (dispatch) => {
  try {
    dispatch(uiActions
      .setNotification({ notificationType: 'secondary', notificationShow: true, message: 'Reseting current game' }));
    const res = await axios.post(routes.resetGame());
    const {
      data: {
        result: {
          board, ai, player,
        },
      },
    } = res;
    console.log('!!! reset ', res.data);
    dispatch(gameSlice.actions.newGame({
      board, ai, player,
    }));
    if (ai === 'X') dispatch(gameSlice.actions.newRound(board));


    dispatch(uiActions
      .setNotification({ notificationType: 'success', notificationShow: true, message: 'Game ready' }));
  } catch (err) {
    dispatch(uiActions
      .setNotification({ notificationType: 'warning', notificationShow: true, message: `Can't reset, please check connection: ${err}` }));
  }
};


export const { actions, reducer } = gameSlice;
export default reducer;
