export default function todos(state = [], action) {
  switch (action.type) {
    case 'GET_PLAYLIST':
      return {
        spotify: action.spotify
      };
    case 'LOGOUT_SUCCESS':
      return {
        spotify: []
      };
    default:
      return state;
  }
}
