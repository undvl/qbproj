import { START_SIGN_UP, SUCCESS_SIGN_UP, FALSE_SIGN_UP,
         INIT_LOGIN,
         START_LOGIN, SUCCESS_LOGIN, FALSE_LOGIN,
         LOGOUT_SUCCESS }
  from '../../actions/auth';

const jwtDecode = require('jwt-decode');

function checkTokenExpiry() {
  if (typeof (Storage) !== 'undefined') {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      const jwtExp = jwtDecode(jwt).exp;
      const expiryDate = new Date(0);

      expiryDate.setUTCSeconds(jwtExp);
      if (new Date() < expiryDate) {
        return true;
      }
    }
  }
  return false;
}

function decodeToken() {
  const jwt = localStorage.getItem('token');

  if (jwt) {
    return jwtDecode(jwt);
  }
}

export function signup (state = {
  isFetching: false,
  showAlert: false,
  alertText: ''
}, action) {
  switch (action.type) {
    case START_SIGN_UP:
      return Object.assign({}, state,
        { isFetching: true, showAlert: false, alertText: '' });
    case SUCCESS_SIGN_UP:
      return Object.assign({}, state,
        { isFetching: false, showAlert: false, alertText: '' });
    case FALSE_SIGN_UP:
      return Object.assign({}, state,
        { isFetching: false, showAlert: true, alertText: action.errmsg });
    default:
      return state;
  }
}

const loginInitialState = {
  isFetching: false,
  showAlert: false,
  alertText: ''
};

function getInitLogin() {
  if (checkTokenExpiry()) {
    return decodeToken().user;
  }
}

loginInitialState.loggedUser = getInitLogin();

export function login (state = loginInitialState, action) {
  switch (action.type) {
    case INIT_LOGIN:
      return Object.assign({}, state, {
        isFetching: false, showAlert: false, alertText: '',
        loggedUser: getInitLogin()
      });
    case START_LOGIN:
      return Object.assign({}, state,
        { isFetching: true, showAlert: false, alertText: '' });
    case SUCCESS_LOGIN:
      return Object.assign({}, state, {
        isFetching: false, showAlert: false, alertText: '',
        loggedUser: action.user
      });
    case FALSE_LOGIN:
      return Object.assign({}, state,
        { isFetching: false, showAlert: true, alertText: action.errmsg });
    case LOGOUT_SUCCESS: {
      const newState = Object.assign({}, state);

      delete newState.loggedUser;
      return newState;
    }
    default:
      return state;
  }
}
