export default function image(state = [], action) {
  switch (action.type) {
    case 'IMAGE_RECEIVED':
      return {
        image: action.image
      };
    case 'LOGOUT_SUCCESS':
      return {
        image: 'https://i.stack.imgur.com/l60Hf.png'
      };

    default:
      return state;
  }
}
