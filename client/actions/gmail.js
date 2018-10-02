function getMail(counter) {
  return {
    type: 'SET_MAIL',
    counter: counter
  };
}

//adding weight info

export function emailCounter(counter) {
  return function(dispatch) {
    dispatch(getMail(counter));
  };
}
