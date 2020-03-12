const host = `http://${window.location.hostname}:${window.location.port}`;
const prefix = 'api';

export default {
  game: () => [host, prefix, 'game'].join('/'),
  round: () => [host, prefix, 'game', 'move'].join('/'),
  resetGame: () => [host, prefix, 'game', 'reset'].join('/'),
  newGame: () => [host, prefix, 'game', 'next'].join('/'),
  score: () => [host, prefix, 'score'].join('/'),
  fullReset: () => [host, prefix, 'score', 'reset'].join('/'),
};
