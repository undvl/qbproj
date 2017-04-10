import { browserHistory } from 'react-router';

export const PL_JOIN_REQUEST_START = 'PL_JOIN_REQUEST_START';
export const PL_JOIN_REQUEST_SUCCESS = 'PL_JOIN_REQUEST_SUCCESS';
export const PL_JOIN_REQUEST_FAILURE = 'PL_JOIN_REQUEST_FAILURE';

export const PL_GET_MEMB_REQS_START = 'PL_GET_MEMB_REQS_START';
export const PL_GET_MEMB_REQS_SUCCESS = 'PL_GET_MEMB_REQS_SUCCESS';
export const PL_GET_MEMB_REQS_FAILURE = 'PL_GET_MEMB_REQS_FAILURE';

export const PL_ACCEPT_MEMB_REQS_START = 'PL_ACCEPT_MEMB_REQS_START';
export const PL_ACCEPT_MEMB_REQS_SUCCESS = 'PL_ACCEPT_MEMB_REQS_SUCCESS';
export const PL_ACCEPT_MEMB_REQS_FAILURE = 'PL_ACCEPT_MEMB_REQS_FAILURE';

export const PL_REJECT_MEMB_REQS_START = 'PL_REJECT_MEMB_REQS_START';
export const PL_REJECT_MEMB_REQS_SUCCESS = 'PL_REJECT_MEMB_REQS_SUCCESS';
export const PL_REJECT_MEMB_REQS_FAILURE = 'PL_REJECT_MEMB_REQS_FAILURE';

export const PL_MEMBERS_REQ_START = 'PL_MEMBERS_REQ_START';
export const PL_MEMBERS_REQ_SUCCESS = 'PL_MEMBERS_REQ_SUCCESS';
export const PL_MEMBERS_REQ_FAILURE = 'PL_MEMBERS_REQ_FAILURE';

export const PL_MEMBERS_CHANGE_LEVEL_START = 'PL_MEMBERS_CHANGE_LEVEL_START';
export const PL_MEMBERS_CHANGE_LEVEL_SUCCESS = 'PL_MEMBERS_CHANGE_LEVEL_SUCCESS';
export const PL_MEMBERS_CHANGE_LEVEL_FAILURE = 'PL_MEMBERS_CHANGE_LEVEL_FAILURE';


/**
 * join request
 */
function startPortalJoinRequest() {
  return { type: PL_JOIN_REQUEST_START };
}

function successPortalJoinRequest() {
  return { type: PL_JOIN_REQUEST_SUCCESS };
}

function failurePortalJoinRequest(errmsg) {
  return { type: PL_JOIN_REQUEST_FAILURE, errmsg };
}

export function processPortalJoinRequest(p) {
  return dispatch => {
    dispatch(startPortalJoinRequest());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalJoinRequest('Server Render not support this request'));
    }

    fetch('/api/pl_join_request/', {
      method: 'post',
      body: JSON.stringify(p),
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
        return dispatch(failurePortalJoinRequest(obj.message));
      }
      dispatch(successPortalJoinRequest());
      browserHistory.goBack();
    })
    .catch(err => {
      dispatch(failurePortalJoinRequest(err.message));
    });
  };
}


/**
 * get membership requests
 */
function startPortalGetMembReqs() {
  return { type: PL_GET_MEMB_REQS_START };
}

function successPortalGetMembReqs(membReqs) {
  return { type: PL_GET_MEMB_REQS_SUCCESS, membReqs };
}

function failurePortalGetMembReqs(errmsg) {
  return { type: PL_GET_MEMB_REQS_FAILURE, errmsg };
}

export function processPortalGetMembReqs(p) {
  return dispatch => {
    dispatch(startPortalGetMembReqs());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalGetMembReqs('Server Render not support this request'));
    }

    fetch(`/api/manage/${p.qb}/memb_requests/${p.type}`, {
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
        return dispatch(failurePortalGetMembReqs(obj.message));
      }
      dispatch(successPortalGetMembReqs(obj.membReqs));
    })
    .catch(err => {
      dispatch(failurePortalGetMembReqs(err.message));
    });
  };
}


/**
 * accept join request
 */

function startPortalAcceptJoinRequest() {
  return { type: PL_ACCEPT_MEMB_REQS_START };
}

function successPortalAcceptJoinRequest(joinReqID) {
  return { type: PL_ACCEPT_MEMB_REQS_SUCCESS, joinReqID };
}

function failurePortalAcceptJoinRequest(errmsg) {
  return { type: PL_ACCEPT_MEMB_REQS_FAILURE, errmsg };
}

export function processPortalAcceptJoinRequest(p) {
  return dispatch => {
    dispatch(startPortalAcceptJoinRequest());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalAcceptJoinRequest('Server Render not support this request'));
    }

    fetch('/api/pl_join_request_accept/', {
      method: 'post',
      body: JSON.stringify(p),
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
        return dispatch(failurePortalAcceptJoinRequest(obj.message));
      }
      dispatch(successPortalAcceptJoinRequest(obj.joinReqID));
    })
    .catch(err => {
      dispatch(failurePortalAcceptJoinRequest(err.message));
    });
  };
}


/**
 * reject join request
 */

function startPortalRejectJoinRequest() {
  return { type: PL_REJECT_MEMB_REQS_START };
}

function successPortalRejectJoinRequest(joinReqID) {
  return { type: PL_REJECT_MEMB_REQS_SUCCESS, joinReqID };
}

function failurePortalRejectJoinRequest(errmsg) {
  return { type: PL_REJECT_MEMB_REQS_FAILURE, errmsg };
}

export function processPortalRejectJoinRequest(p) {
  return dispatch => {
    dispatch(startPortalAcceptJoinRequest());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalAcceptJoinRequest('Server Render not support this request'));
    }

    fetch('/api/pl_join_request_reject/', {
      method: 'post',
      body: JSON.stringify(p),
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
        return dispatch(failurePortalAcceptJoinRequest(obj.message));
      }
      dispatch(successPortalAcceptJoinRequest(obj.joinReqID));
    })
    .catch(err => {
      dispatch(failurePortalAcceptJoinRequest(err.message));
    });
  };
}


/**
 * get members
 */
function startPortalGetMembers() {
  return { type: PL_MEMBERS_REQ_START };
}

function successPortalGetMembers(members) {
  return { type: PL_MEMBERS_REQ_SUCCESS, members };
}

function failurePortalGetMembers(errmsg) {
  return { type: PL_MEMBERS_REQ_FAILURE, errmsg };
}

export function processPortalGetMembers(p) {
  return dispatch => {
    dispatch(startPortalGetMembers());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalGetMembers('Server Render not support this request'));
    }

    fetch(`/api/manage/${p.qb}/members`, {
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
        return dispatch(failurePortalGetMembers(obj.message));
      }
      dispatch(successPortalGetMembers(obj.members));
    })
    .catch(err => {
      dispatch(failurePortalGetMembers(err.message));
    });
  };
}


/**
 * change member level
 */
function startPortalChangeMemberLevel() {
  return { type: PL_MEMBERS_CHANGE_LEVEL_START };
}

function successPortalChangeMemberLevel() {
  return { type: PL_MEMBERS_CHANGE_LEVEL_SUCCESS };
}

function failurePortalChangeMemberLevel(errmsg) {
  return { type: PL_MEMBERS_CHANGE_LEVEL_FAILURE, errmsg };
}

export function processPortalChangeMemberLevel(p) {
  return dispatch => {
    dispatch(startPortalChangeMemberLevel());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalChangeMemberLevel('Server Render not support this request'));
    }

    fetch('/api/manage/changeMemberLevel', {
      method: 'post',
      body: JSON.stringify(p),
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
        return dispatch(failurePortalChangeMemberLevel(obj.message));
      }
      dispatch(successPortalChangeMemberLevel());
    })
    .catch(err => {
      dispatch(failurePortalChangeMemberLevel(err.message));
    });
  };
}
