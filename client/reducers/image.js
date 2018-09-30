export default function todos(state = [], action) {
  switch (action.type) {
    case 'IMAGE_RECEIVED':
      return {
        image: action.image
      };
    default:
      return state;
  }
}
