export default function weight(state = [], action) {
  switch (action.type) {
    case 'GET_WEIGHT':
      return {
        weight: action.weight
      };
    case 'SET_WEIGHT':
      return {
        weight: action.weight
      };
    case 'LOADING_WEIGHT':
      return {
        loading: true
      };
    case 'LOGOUT_SUCCESS':
      return {
        weight: ''
      };
    default:
      return state;
  }
}
