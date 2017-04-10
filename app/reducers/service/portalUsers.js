import {
    PL_JOIN_REQUEST_START, PL_JOIN_REQUEST_SUCCESS, PL_JOIN_REQUEST_FAILURE,
    PL_GET_MEMB_REQS_START, PL_GET_MEMB_REQS_SUCCESS, PL_GET_MEMB_REQS_FAILURE,
    PL_ACCEPT_MEMB_REQS_START, PL_ACCEPT_MEMB_REQS_SUCCESS, PL_ACCEPT_MEMB_REQS_FAILURE,
    PL_REJECT_MEMB_REQS_START, PL_REJECT_MEMB_REQS_SUCCESS, PL_REJECT_MEMB_REQS_FAILURE,
    PL_MEMBERS_REQ_START, PL_MEMBERS_REQ_SUCCESS, PL_MEMBERS_REQ_FAILURE,
    PL_MEMBERS_CHANGE_LEVEL_START, PL_MEMBERS_CHANGE_LEVEL_SUCCESS, PL_MEMBERS_CHANGE_LEVEL_FAILURE
  } from '../../actions/portalUsers';


function portalUsers (state = {
  joinRequest: joinRequest(undefined, { type: null }),
  getMembReqs: getMembReqs(undefined, { type: null }),
  acceptJoinRequest: acceptJoinRequest(undefined, { type: null }),
  rejectJoinRequest: rejectJoinRequest(undefined, { type: null }),
  getMembers: getMembers(undefined, { type: null }),
  changeMemberLevel: changeMemberLevel(undefined, { type: null })
}, action) {
  switch (action.type) {
    case PL_JOIN_REQUEST_START:
    case PL_JOIN_REQUEST_SUCCESS:
    case PL_JOIN_REQUEST_FAILURE:
      return Object.assign({}, state, { joinRequest: joinRequest(state.joinRequest, action) });
    case PL_GET_MEMB_REQS_START:
    case PL_GET_MEMB_REQS_SUCCESS:
    case PL_GET_MEMB_REQS_FAILURE:
      return Object.assign({}, state, { getMembReqs: getMembReqs(state.getMembReqs, action) });
    case PL_ACCEPT_MEMB_REQS_START:
    case PL_ACCEPT_MEMB_REQS_SUCCESS:
    case PL_ACCEPT_MEMB_REQS_FAILURE:
      return Object.assign({}, state, { acceptJoinRequest: acceptJoinRequest(state.acceptJoinRequest, action) });
    case PL_REJECT_MEMB_REQS_START:
    case PL_REJECT_MEMB_REQS_SUCCESS:
    case PL_REJECT_MEMB_REQS_FAILURE:
      return Object.assign({}, state, { rejectJoinRequest: rejectJoinRequest(state.rejectJoinRequest, action) });
    case PL_MEMBERS_REQ_START:
    case PL_MEMBERS_REQ_SUCCESS:
    case PL_MEMBERS_REQ_FAILURE:
      return Object.assign({}, state, { getMembers: getMembers(state.getMembers, action) });
    case PL_MEMBERS_CHANGE_LEVEL_START:
    case PL_MEMBERS_CHANGE_LEVEL_SUCCESS:
    case PL_MEMBERS_CHANGE_LEVEL_FAILURE:
      return Object.assign({}, state, { changeMemberLevel: changeMemberLevel(state.changeMemberLevel, action) });
    default:
      return state;
  }
}

function joinRequest (state = {
  isFetching: false,
  errmsg: ''
}, action) {
  switch (action.type) {
    case PL_JOIN_REQUEST_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_JOIN_REQUEST_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: ''
        });
    case PL_JOIN_REQUEST_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

function getMembReqs (state = {
  isFetching: false,
  errmsg: '',
  membReqs: []
}, action) {
  switch (action.type) {
    case PL_GET_MEMB_REQS_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_GET_MEMB_REQS_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '', membReqs: action.membReqs });
    case PL_GET_MEMB_REQS_FAILURE:
      return Object.assign({}, getMembReqs(undefined, { type: null }), //state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

function acceptJoinRequest (state = {
  isFetching: false,
  errmsg: '',
  joinReqID: ''
}, action) {
  switch (action.type) {
    case PL_ACCEPT_MEMB_REQS_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_ACCEPT_MEMB_REQS_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '', joinReqID: action.joinReqID
        });
    case PL_ACCEPT_MEMB_REQS_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

function rejectJoinRequest (state = {
  isFetching: false,
  errmsg: '',
  joinReqID: ''
}, action) {
  switch (action.type) {
    case PL_REJECT_MEMB_REQS_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '', joinReqID: '' });
    case PL_REJECT_MEMB_REQS_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '', joinReqID: action.joinReqID
        });
    case PL_REJECT_MEMB_REQS_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg, joinReqID: '' });
    default:
      return state;
  }
}

function getMembers (state = {
  isFetching: false,
  errmsg: '',
  members: []
}, action) {
  switch (action.type) {
    case PL_MEMBERS_REQ_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_MEMBERS_REQ_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '', members: action.members
        });
    case PL_MEMBERS_REQ_FAILURE:
      return Object.assign({}, getMembers(undefined, { type: null }), //state,
        { isFetching: false, errmsg: action.errmsg, joinReqID: '' });
    default:
      return state;
  }
}

function changeMemberLevel (state = {
  isFetching: false,
  errmsg: ''
}, action) {
  switch (action.type) {
    case PL_MEMBERS_CHANGE_LEVEL_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_MEMBERS_CHANGE_LEVEL_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '' });
    case PL_MEMBERS_CHANGE_LEVEL_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}


export default portalUsers;
