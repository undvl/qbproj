import { START_SIGN_UP, SUCCESS_SIGN_UP, FALSE_SIGN_UP,
         INIT_LOGIN,
         START_LOGIN, SUCCESS_LOGIN, FALSE_LOGIN,
         LOGOUT_SUCCESS }
  from '../../actions/auth';

import { CREATE_QB_START, CREATE_QB_SUCCESS, CREATE_QB_FAILURE }
  from '../../actions/qb';

import {
    PL_JOIN_REQUEST_START, PL_JOIN_REQUEST_SUCCESS, PL_JOIN_REQUEST_FAILURE,
    PL_GET_MEMB_REQS_START, PL_GET_MEMB_REQS_SUCCESS, PL_GET_MEMB_REQS_FAILURE,
    PL_ACCEPT_MEMB_REQS_START, PL_ACCEPT_MEMB_REQS_SUCCESS, PL_ACCEPT_MEMB_REQS_FAILURE,
    PL_REJECT_MEMB_REQS_START, PL_REJECT_MEMB_REQS_SUCCESS, PL_REJECT_MEMB_REQS_FAILURE,
    PL_MEMBERS_REQ_START, PL_MEMBERS_REQ_SUCCESS, PL_MEMBERS_REQ_FAILURE,
    PL_MEMBERS_CHANGE_LEVEL_START, PL_MEMBERS_CHANGE_LEVEL_SUCCESS, PL_MEMBERS_CHANGE_LEVEL_FAILURE
  } from '../../actions/portalUsers';

import { signup, login } from './auth';
import createQB from './createQB';
import portalUsers from './portalUsers';

function service(state = {
  signup: signup(undefined, { type: null }),
  login: login(undefined, { type: null }),
  createQB: createQB(undefined, { type: null }),
  portalUsers: portalUsers(undefined, { type: null })
}, action) {
  switch (action.type) {
    case START_SIGN_UP:
    case SUCCESS_SIGN_UP:
    case FALSE_SIGN_UP:
      return Object.assign({}, state, { signup: signup(state.signup, action) });
    case INIT_LOGIN:
    case START_LOGIN:
    case SUCCESS_LOGIN:
    case FALSE_LOGIN:
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { login: login(state.login, action) });
    case CREATE_QB_START:
    case CREATE_QB_SUCCESS:
    case CREATE_QB_FAILURE:
      return Object.assign({}, state, { createQB: createQB(state.createQB, action) });
    case PL_JOIN_REQUEST_START:
    case PL_JOIN_REQUEST_SUCCESS:
    case PL_JOIN_REQUEST_FAILURE:
    case PL_GET_MEMB_REQS_START:
    case PL_GET_MEMB_REQS_SUCCESS:
    case PL_GET_MEMB_REQS_FAILURE:
    case PL_ACCEPT_MEMB_REQS_START:
    case PL_ACCEPT_MEMB_REQS_SUCCESS:
    case PL_ACCEPT_MEMB_REQS_FAILURE:
    case PL_REJECT_MEMB_REQS_START:
    case PL_REJECT_MEMB_REQS_SUCCESS:
    case PL_REJECT_MEMB_REQS_FAILURE:
    case PL_MEMBERS_REQ_START:
    case PL_MEMBERS_REQ_SUCCESS:
    case PL_MEMBERS_REQ_FAILURE:
    case PL_MEMBERS_CHANGE_LEVEL_START:
    case PL_MEMBERS_CHANGE_LEVEL_SUCCESS:
    case PL_MEMBERS_CHANGE_LEVEL_FAILURE:
      return Object.assign({}, state, { portalUsers: portalUsers(state.portalUsers, action) });
    default:
      return state;
  }
}

export default service;
