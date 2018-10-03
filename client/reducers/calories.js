export default function calories(state = [], action) {
  switch (action.type) {
    case 'GET_CALORIES':
      return {
        totalcalories: action.totalcalories,
        returnedCals: true
      };
    case 'SET_CALORIES':
      return {
        totalcalories: action.totalcalories
      };
    case 'LOGOUT_SUCCESS':
      return {
        totalcalories: ''
      };
    default:
      return state;
  }
}
