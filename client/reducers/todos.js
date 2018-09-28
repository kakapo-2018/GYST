export default function todos(state = [], action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        todos: action.todos
      };
    default:
      return { ...state };
  }
}
