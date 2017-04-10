import { USER_PARAMS_REQ_START, USER_PARAMS_REQ_SUCCESS, USER_PARAMS_REQ_FAILURE }
  from '../actions/qbParams';

function qbParams (state = {
  isFetching: false,
  errmsg: '',
  currentQB: '',
  qbTitle: '',
  username: '',
  isOwner: undefined,
  level: undefined
}, action) {
  switch (action.type) {
    case USER_PARAMS_REQ_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case USER_PARAMS_REQ_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          currentQB: action.qb, qbTitle: action.qbTitle,
          username: action.userParams.user,
          isOwner: action.userParams.isOwner, level: action.userParams.level
        });
    case USER_PARAMS_REQ_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

export default qbParams;
