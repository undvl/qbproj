import { browserHistory } from 'react-router';

export const CREATE_QB_START = 'CREATE_QB_START';
export const CREATE_QB_SUCCESS = 'CREATE_QB_SUCCESS';
export const CREATE_QB_FAILURE = 'CREATE_QB_FAILURE';

function startCreateQB(name) {
  return { type: CREATE_QB_START, name };
}

function successCreateQB(name) {
  return { type: CREATE_QB_SUCCESS, name };
}

function failureCreateQB(alertText) {
  return { type: CREATE_QB_FAILURE, alertText };
}

export function processCreateQB({ name, title, isPrivate, category, catDescr, tags }) {
  return dispatch => {
    dispatch(startCreateQB(name));
    fetch('/api/create_qb', {
      method: 'post',
      body: JSON.stringify({ name, title, isPrivate, category, catDescr, tags }),
      headers: new Headers({
        'x-access-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    })
    .then(res => {
      return res.json();
    })
    .then(obj => {
      if (!obj.success) {
        return dispatch(failureCreateQB(obj.message));
      }
      dispatch(successCreateQB(obj.name));
      return browserHistory.push(`/q/${obj.name}`);
      // dispatch(successThemesListReq(qb, json.groups));
    })
    .catch(err => {
    //   console.log(err);
      dispatch(failureCreateQB(err.message));
    });
  };
}
