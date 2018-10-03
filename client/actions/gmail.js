function getMail(counter) {
  return {
    type: 'SET_MAIL',
    counter: counter
  };
}

//getting counter info

export function emailCounter(counter) {
  return function(dispatch) {
    dispatch(getMail(counter));
  };
}
