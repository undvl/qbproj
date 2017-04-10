
let nodeFetch;

if (typeof window === 'undefined') {
  nodeFetch = require('node-fetch');
}

// import config from '../../config.json';

export const COMMENTS_REQ_START = 'COMMENTS_REQ_START';
export const COMMENTS_REQ_SUCCESS = 'COMMENTS_REQ_SUCCESS';
export const COMMENTS_REQ_FAILURE = 'COMMENTS_REQ_FAILURE';

export const COMMENTS_ADD_START = 'COMMENTS_ADD_START';
export const COMMENTS_ADD_SUCCESS = 'COMMENTS_ADD_SUCCESS';
export const COMMENTS_ADD_FAILURE = 'COMMENTS_ADD_FAILURE';


/**
 * get comments
 */
function startCommentsReq() {
  return { type: COMMENTS_REQ_START };
}

function successCommentsReq(comments) {
  return { type: COMMENTS_REQ_SUCCESS, comments };
}

function failureCommentsReq(errmsg) {
  return { type: COMMENTS_REQ_FAILURE, errmsg };
}

export function processCommentsReq(themeID) {
  return dispatch => {
    dispatch(startCommentsReq());
    if (typeof window === 'undefined') {
      // Not used, because not set server rendering for comments
      nodeFetch(`http://localhost:3000/api/pl_theme_comments/${themeID}`)
      .then(res => {
        return res.json();
      }).then(obj => {
        if (!obj.success) return dispatch(failureCommentsReq(obj.message));
        dispatch(successCommentsReq(obj.comments));
      })
      .catch(err => {
        dispatch(failureCommentsReq(err.message));
      });
    } else {
      fetch(`/api/pl_theme_comments/${themeID}`, {
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
          return dispatch(failureCommentsReq(obj.message));
        }
        dispatch(successCommentsReq(obj.comments));
      })
      .catch(err => {
        dispatch(failureCommentsReq(err.message));
      });
    }
  };
}


/**
 * add comment
 */
function startCommentsAdd() {
  return { type: COMMENTS_ADD_START };
}

function successCommentsAdd() {
  return { type: COMMENTS_ADD_SUCCESS };
}

function failureCommentsAdd(errmsg) {
  return { type: COMMENTS_ADD_FAILURE, errmsg };
}
export function processCommentsAdd(p) {
  return dispatch => {
    dispatch(startCommentsAdd());
    if (typeof window === 'undefined') {
      return dispatch(failureCommentsAdd('Server Render not support this request'));
    }
    fetch('/api/pl_theme_comment_add/', {
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
        return dispatch(failureCommentsAdd(obj.message));
      }
      dispatch(successCommentsAdd());
      dispatch(processCommentsReq(p.themeID));
    })
    .catch(err => {
      dispatch(failureCommentsAdd(err.message));
    });
  };
}
