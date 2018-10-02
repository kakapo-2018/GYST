export default function todos(state = [], action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        todos: action.todos
      };
    case 'LOGOUT_SUCCESS':
      return {
        todos: ''
      };
    default:
      return { ...state };
  }
}
