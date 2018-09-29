export default function todos(state = [], action) {
  switch (action.type) {
    case 'GET_INSTA':
      return {
        insta: action.insta
      };
    default:
      return state;
  }
}
