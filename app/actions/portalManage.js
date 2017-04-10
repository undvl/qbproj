import { browserHistory } from 'react-router';

import { processThemesUserLevelReq } from './portal';

export const PL_GROUP_ADD_START = 'PL_GROUP_ADD_START';
export const PL_GROUP_ADD_SUCCESS = 'PL_GROUP_ADD_SUCCESS';
export const PL_GROUP_ADD_FAILURE = 'PL_GROUP_ADD_FAILURE';

export const PL_GROUP_DEL_START = 'PL_GROUP_DEL_START';
export const PL_GROUP_DEL_SUCCESS = 'PL_GROUP_DEL_SUCCESS';
export const PL_GROUP_DEL_FAILURE = 'PL_GROUP_DEL_FAILURE';

export const PL_THEME_ADD_START = 'PL_THEME_ADD_START';
export const PL_THEME_ADD_SUCCESS = 'PL_THEME_ADD_SUCCESS';
export const PL_THEME_ADD_FAILURE = 'PL_THEME_ADD_FAILURE';

export const PL_THEME_DEL_START = 'PL_THEME_DEL_START';
export const PL_THEME_DEL_SUCCESS = 'PL_THEME_DEL_SUCCESS';
export const PL_THEME_DEL_FAILURE = 'PL_THEME_DEL_FAILURE';


/**
 * add Group
 */
function startPortalGroupAdd() {
  return { type: PL_GROUP_ADD_START };
}

function successPortalGroupAdd(groupName) {
  return { type: PL_GROUP_ADD_SUCCESS, groupName };
}

function failurePortalGroupAdd(errmsg) {
  return { type: PL_GROUP_ADD_FAILURE, errmsg };
}

export function processPortalGroupAdd(p) {
  return dispatch => {
    dispatch(startPortalGroupAdd());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalGroupAdd('Server Render not support this request'));
    }

    fetch('/api/pl_group_add/', {
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
        return dispatch(failurePortalGroupAdd(obj.message));
      }
      dispatch(successPortalGroupAdd(obj.groupName));
      dispatch(processThemesUserLevelReq(p.qb));
    })
    .catch(err => {
    //   console.log(err);
      dispatch(failurePortalGroupAdd(err.message));
    });
  };
}

/**
 * del Group
 */
function startPortalGroupDel() {
  return { type: PL_GROUP_DEL_START };
}

function successPortalGroupDel(nModified) {
  return { type: PL_GROUP_DEL_SUCCESS, nModified };
}

function failurePortalGroupDel(errmsg) {
  return { type: PL_GROUP_DEL_FAILURE, errmsg };
}

export function processPortalGroupDel(p) {
  return dispatch => {
    dispatch(startPortalGroupDel());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalGroupDel('Server Render not support this request'));
    }

    fetch('/api/pl_group_del/', {
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
        return dispatch(failurePortalGroupDel(obj.message));
      }
      dispatch(successPortalGroupDel(obj.nModified));
      dispatch(processThemesUserLevelReq(p.qb));
    })
    .catch(err => {
      dispatch(failurePortalGroupDel(err.message));
    });
  };
}

/**
 * add Theme
 */
function startPortalThemeAdd() {
  return { type: PL_THEME_ADD_START };
}

function successPortalThemeAdd(themeTitle) {
  return { type: PL_THEME_ADD_SUCCESS, themeTitle };
}

function failurePortalThemeAdd(errmsg) {
  return { type: PL_THEME_ADD_FAILURE, errmsg };
}

export function processPortalThemeAdd(p) {
  return dispatch => {
    dispatch(startPortalThemeAdd());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalThemeAdd('Server Render not support this request'));
    }

    fetch('/api/pl_theme_add/', {
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
        return dispatch(failurePortalThemeAdd(obj.message));
      }
      dispatch(successPortalThemeAdd(obj.themeTitle));
      browserHistory.goBack();
    })
    .catch(err => {
      dispatch(failurePortalThemeAdd(err.message));
    });
  };
}


/**
 * del Theme
 */
function startPortalThemeDel() {
  return { type: PL_THEME_DEL_START };
}

function successPortalThemeDel(nModified) {
  return { type: PL_THEME_DEL_SUCCESS, nModified };
}

function failurePortalThemeDel(errmsg) {
  return { type: PL_THEME_DEL_FAILURE, errmsg };
}

export function processPortalThemeDel(p) {
  return dispatch => {
    dispatch(startPortalThemeDel());
    if (typeof window === 'undefined') {
      return dispatch(failurePortalThemeDel('Server Render not support this request'));
    }

    fetch('/api/pl_theme_del/', {
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
        return dispatch(failurePortalThemeDel(obj.message));
      }
      dispatch(successPortalThemeDel(obj.nModified));
      dispatch(processThemesUserLevelReq(p.qb));
    })
    .catch(err => {
      dispatch(failurePortalThemeDel(err.message));
    });
  };
}
