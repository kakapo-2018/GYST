export default function calories(state = [], action) {
  switch (action.type) {
    case 'GET_CALORIES':
      return {
        totalcalories: action.totalcalories
      };
    case 'SET_CALORIES':
      return {
        totalcalories: action.totalcalories
      };
    default:
      return state;
  }
}