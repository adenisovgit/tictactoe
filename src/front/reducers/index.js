
import { combineReducers } from 'redux';

import gameReducer, { actions as gameActions } from '../features/game/gameSlice.js';
import uiReducer, { actions as uiActions } from '../features/ui/uiSlice.js';

export default combineReducers({
  ui: uiReducer,
  game: gameReducer,
});


export const actions = {
  ...uiActions,
  ...gameActions,
};
