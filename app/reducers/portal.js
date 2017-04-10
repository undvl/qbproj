import { THEMES_LIST_REQ_START, THEMES_LIST_REQ_SUCCESS, THEMES_LIST_REQ_FAILURE,
         PL_THEME_REQ_START, PL_THEME_REQ_SUCCESS, PL_THEME_REQ_FAILURE,
         CLEAR_PORTAL,
         ACCORDION_ACCTIVE_KEY,
         THEMES_USER_LEVEL_REQ_START, THEMES_USER_LEVEL_REQ_SUCCESS, THEMES_USER_LEVEL_REQ_FAILURE
}
from '../actions/portal';

import { COMMENTS_REQ_START, COMMENTS_REQ_SUCCESS, COMMENTS_REQ_FAILURE
}
from '../actions/portalComments';

function portal (state = {
  isFetching: false,
  errmsg: '',
  themesList: [],
  currentQB: '',
  theme: {},
  accordion: accordion(undefined, { type: null }),
  comments: {}
}, action) {
  switch (action.type) {
    case THEMES_LIST_REQ_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case THEMES_LIST_REQ_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          currentQB: action.qb, themesList: action.themesList
        });
    case THEMES_LIST_REQ_FAILURE:
      return Object.assign({}, portal(undefined, { type: null }), //state,
        { isFetching: false, errmsg: action.errmsg });
    case PL_THEME_REQ_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_THEME_REQ_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          theme: action.theme
        });
    case PL_THEME_REQ_FAILURE:
      return Object.assign({}, portal(undefined, { type: null }), //state,
        { isFetching: false, errmsg: action.errmsg });
    // case CLEAR_PORTAL:
    //   return portal(undefined, { type: null });
    case ACCORDION_ACCTIVE_KEY:
      return Object.assign({}, state, { accordion: accordion(state.accordion, action) });
    case THEMES_USER_LEVEL_REQ_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case THEMES_USER_LEVEL_REQ_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          themesList: action.themesList
        });
    case THEMES_USER_LEVEL_REQ_FAILURE:
      return Object.assign({}, portal(undefined, { type: null }), //state,
        { isFetching: false, errmsg: action.errmsg });
    case COMMENTS_REQ_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case COMMENTS_REQ_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          comments: action.comments
        });
    case COMMENTS_REQ_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg, comments: {} });
    default:
      return state;
  }
}

function accordion (state = { activeKey: 0 }, action) {
  switch (action.type) {
    case ACCORDION_ACCTIVE_KEY:
      return Object.assign({}, state, { activeKey: action.activeKey });
    default:
      return state;
  }
}

export default portal;
