export default function todos(state = [], action) {
  switch (action.type) {
    case 'GET_INSTA':
      return {
        insta: action.insta
      };
    case 'LOGOUT_SUCCESS':
      return {
        insta: ''
      };
    default:
      return state;
  }
}
