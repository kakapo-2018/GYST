export default function weight (state = [], action) {
    switch (action.type) {
      case 'GET_WEIGHT':
        return {
          weight: action.weight
        };
      default:
        return state;
    }
  }
  