import request from 'superagent';

export function fetchData() {
  const url = `/api/ext/duck`;
  const data = request.get(url);
  return {
    type: 'FETCH_DATA',
    payload: data
  };
}
