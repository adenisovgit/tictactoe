import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// import logger from './loggermiddleware';
import reducers from './reducers';
import App from './components/app';

export default () => {
  const store = configureStore({
    reducer: reducers,
    middleware: [...getDefaultMiddleware()],
  });

  document.title = 'Tic tac toe';
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('content'),
  );
};
