export default function mail(state = [], action) {
  switch (action.type) {
    case 'SET_MAIL':
      return {
        mail: action.counter
      };
    case 'LOGOUT_SUCCESS':
      return {
        mail: []
      };
    default:
      return state;
  }
}
