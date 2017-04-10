const axios = require('axios');

let nodeFetch;

if (typeof window === 'undefined') {
  nodeFetch = require('node-fetch');
}

// import config from '../../config.json';

export const THEMES_LIST_REQ_START = 'THEMES_LIST_REQ_START';
export const THEMES_LIST_REQ_SUCCESS = 'THEMES_LIST_REQ_SUCCESS';
export const THEMES_LIST_REQ_FAILURE = 'THEMES_LIST_REQ_FAILURE';

export const PL_THEME_REQ_START = 'PL_THEME_REQ_START';
export const PL_THEME_REQ_SUCCESS = 'PL_THEME_REQ_SUCCESS';
export const PL_THEME_REQ_FAILURE = 'PL_THEME_REQ_FAILURE';

// export const CLEAR_PORTAL = 'CLEAR_PORTAL';

export const ACCORDION_ACCTIVE_KEY = 'ACCORDION_ACCTIVE_KEY';

export const THEMES_USER_LEVEL_REQ_START = 'THEMES_USER_LEVEL_REQ_START';
export const THEMES_USER_LEVEL_REQ_SUCCESS = 'THEMES_USER_LEVEL_REQ_SUCCESS';
export const THEMES_USER_LEVEL_REQ_FAILURE = 'THEMES_USER_LEVEL_REQ_FAILURE';

// const host = (process.env.NODE_ENV === 'development') ?
//   `http://${config.development.host}:${process.env.PORT || config.development.port}` : '';

function startThemesListReq() {
  return { type: THEMES_LIST_REQ_START };
}

function successThemesListReq(qb, themesList) {
  return { type: THEMES_LIST_REQ_SUCCESS, qb, themesList };
}

function failureThemesListReq(errmsg) {
  return { type: THEMES_LIST_REQ_FAILURE, errmsg };
}

export function processThemesListReq(qb) {
  return dispatch => {
    dispatch(startThemesListReq());
    if (typeof window === 'undefined') {
      nodeFetch(`http://localhost:3000/api/pl_themes/${qb}`)
      .then(res => {
        return res.json();
      }).then(json => {
        if (!json.success) return dispatch(failureThemesListReq(json.message));
        dispatch(successThemesListReq(qb, json.groups));
      })
      .catch(err => {
        dispatch(failureThemesListReq(err.message));
      });
    } else {
      if (typeof (Storage) !== 'undefined') {
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
      }
      // axios.get(`${host}/api/pl_themes/${qb}`)
      axios.get(`/api/pl_themes/${qb}`)
      .then(response => {
        const d = response.data;

        if (!d.success) return dispatch(failureThemesListReq(d.message));
        dispatch(successThemesListReq(qb, d.groups));
      })
      .catch(error => {
        // Object.getOwnPropertyNames(error).forEach(key => {
        //   console.log(`key: ${key}`);
        //   console.log(error[key]);
        // });
        dispatch(failureThemesListReq(error.message));
      });
    }
  };
}

function startPortalThemeReq() {
  return { type: PL_THEME_REQ_START };
}

function successPortalThemeReq(theme) {
  return { type: PL_THEME_REQ_SUCCESS, theme };
}

function failurePortalThemeReq(errmsg) {
  return { type: PL_THEME_REQ_FAILURE, errmsg };
}

export function processPortalThemeReq(themeID) {
  return dispatch => {
    dispatch(startPortalThemeReq());
    if (typeof window === 'undefined') {
      nodeFetch(`http://localhost:3000/api/pl_theme/${themeID}`)
      .then(res => {
        return res.json();
      }).then(json => {
        if (!json.success) return dispatch(failurePortalThemeReq(json.message));
        dispatch(successPortalThemeReq(json.theme));
      })
      .catch(err => {
        dispatch(failurePortalThemeReq(err.message));
      });
    } else {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
      axios.get(`/api/pl_theme/${themeID}`)
      .then(response => {
        const d = response.data;

        if (!d.success) return dispatch(failurePortalThemeReq(d.message));
        dispatch(successPortalThemeReq(d.theme));
      })
      .catch(error => {
        dispatch(failurePortalThemeReq(error.message));
      });
    }
  };
}

// export function clearPortal() {
//   return { type: CLEAR_PORTAL };
// }

export function accordionActiveKey(activeKey) {
  return { type: ACCORDION_ACCTIVE_KEY, activeKey };
}


/**
 * Request user level for themes.
 */
function startThemesUserLevelReq() {
  return { type: THEMES_USER_LEVEL_REQ_START };
}

function successThemesUserLevelReq(themesList) {
  return { type: THEMES_USER_LEVEL_REQ_SUCCESS, themesList };
}

function failureThemesUserLevelReq(errmsg) {
  return { type: THEMES_USER_LEVEL_REQ_FAILURE, errmsg };
}
export function processThemesUserLevelReq(qb) {
  return dispatch => {
    dispatch(startThemesUserLevelReq());
    if (typeof window === 'undefined') {
      return dispatch(failureThemesUserLevelReq('Server Render not support this request'));
    }

    fetch(`/api/pl_themes_user_level/${qb}`, {
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
        return dispatch(failureThemesUserLevelReq(obj.message));
      }
      dispatch(successThemesUserLevelReq(obj.groups));
    })
    .catch(err => {
      dispatch(failureThemesUserLevelReq(err.message));
    });
  };
}

