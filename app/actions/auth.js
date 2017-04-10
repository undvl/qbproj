import { browserHistory } from 'react-router';

export const START_SIGN_UP = 'START_SIGN_UP';
export const SUCCESS_SIGN_UP = 'SUCCESS_SIGN_UP';
export const FALSE_SIGN_UP = 'FALSE_SIGN_UP';

export const INIT_LOGIN = 'INIT_LOGIN';
export const START_LOGIN = 'START_LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const FALSE_LOGIN = 'FALSE_LOGIN';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


const axios = require('axios');

import config from '../../config.json';

// const host = (process.env.NODE_ENV === 'development') ?
//   `http://${config.development.host}:${process.env.PORT || config.development.port}` : '';

function startSignUp() {
  return { type: START_SIGN_UP };
}

function successSignUp(user) {
  return { type: SUCCESS_SIGN_UP, user };
}

function falseSignUp(errmsg) {
  return { type: FALSE_SIGN_UP, errmsg };
}

export function processSignup(username, password, email) {
  return dispatch => {
    dispatch(startSignUp());
    // axios.defaults.timeout = 3000;
    // return axios.post(`${host}/signup`, {
    return axios.post('/signup', {
      username, password, email
    })
    .then(response => {
      const d = response.data;

      if (!(d.type === 'error')) {
        dispatch(successSignUp(d.body));
        return dispatch(processLogin(username, password));
        // window.location.href='/';
      }
      return dispatch(falseSignUp(d.body));
    })
    .catch(error => {
      /* Object.getOwnPropertyNames(error).forEach(function(key){
          console.log('key: '+key)
          console.log(error[key])
      })*/
      dispatch(falseSignUp(error.message));
    });
  };
}

export function initLogin() {
  return { type: INIT_LOGIN };
}

function startLogin() {
  return { type: START_LOGIN };
}

function successLogin(user) {
  return { type: SUCCESS_LOGIN, user };
}

function falseLogin(errmsg) {
  return { type: FALSE_LOGIN, errmsg };
}

export function processLogin(username, password) {
  return dispatch => {
    dispatch(startLogin());
    // return axios.post(`${host}/login`, {
    return axios.post('/login', {
      username, password
    })
    .then(response => {
      const d = response.data;

      if (!(d.type === 'error')) {
        localStorage.setItem('token', d.body.token);
        dispatch(successLogin(d.body.user));
        return browserHistory.push('/');
      }
      return dispatch(falseLogin(d.body));
    })
    .catch(error => {
      return dispatch(falseLogin(error.message));
    });
  };
}

export function logout() {
  localStorage.removeItem('token');
  browserHistory.push('/');
  return { type: LOGOUT_SUCCESS };
}
