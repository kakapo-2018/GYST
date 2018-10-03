export default function todos(state = [], action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        todos: action.todos,
        notification: action.notification
      };
    case 'DEL_TODOS':
      return {
        todos: action.todos,
        notification: action.notification
      };
    case 'LOGOUT_SUCCESS':
      return {
        todos: '',
        notification: ''
      };
    default:
      return state;
  }
}
