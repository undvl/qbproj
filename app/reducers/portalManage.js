import {
  PL_GROUP_ADD_START, PL_GROUP_ADD_SUCCESS, PL_GROUP_ADD_FAILURE,
  PL_GROUP_DEL_START, PL_GROUP_DEL_SUCCESS, PL_GROUP_DEL_FAILURE,
  PL_THEME_ADD_START, PL_THEME_ADD_SUCCESS, PL_THEME_ADD_FAILURE,
  PL_THEME_DEL_START, PL_THEME_DEL_SUCCESS, PL_THEME_DEL_FAILURE
} from '../actions/portalManage';

import {
  COMMENTS_ADD_START, COMMENTS_ADD_SUCCESS, COMMENTS_ADD_FAILURE
} from '../actions/portalComments';


function portalManage (state = {
  addGroup: addGroup(undefined, { type: null }),
  delGroup: delGroup(undefined, { type: null }),
  addTheme: addTheme(undefined, { type: null }),
  delTheme: delTheme(undefined, { type: null }),
  addComment: addComment(undefined, { type: null })
}, action) {
  switch (action.type) {
    case PL_GROUP_ADD_START:
    case PL_GROUP_ADD_SUCCESS:
    case PL_GROUP_ADD_FAILURE:
      return Object.assign({}, state, { addGroup: addGroup(state.addGroup, action) });
    case PL_GROUP_DEL_START:
    case PL_GROUP_DEL_SUCCESS:
    case PL_GROUP_DEL_FAILURE:
      return Object.assign({}, state, { delGroup: delGroup(state.delGroup, action) });
    case PL_THEME_ADD_START:
    case PL_THEME_ADD_SUCCESS:
    case PL_THEME_ADD_FAILURE:
      return Object.assign({}, state, { addTheme: addTheme(state.addTheme, action) });
    case PL_THEME_DEL_START:
    case PL_THEME_DEL_SUCCESS:
    case PL_THEME_DEL_FAILURE:
      return Object.assign({}, state, { delTheme: delTheme(state.delTheme, action) });
    case COMMENTS_ADD_START:
    case COMMENTS_ADD_SUCCESS:
    case COMMENTS_ADD_FAILURE:
      return Object.assign({}, state, { addComment: addComment(state.addComment, action) });
    default:
      return state;
  }
}

function addGroup (state = {
  isFetching: false,
  errmsg: '',
  groupName: ''
}, action) {
  switch (action.type) {
    case PL_GROUP_ADD_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_GROUP_ADD_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          groupName: action.groupName
        });
    case PL_GROUP_ADD_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

function delGroup (state = {
  isFetching: false,
  errmsg: '',
  nModified: 0
}, action) {
  switch (action.type) {
    case PL_GROUP_DEL_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_GROUP_DEL_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          nModified: action.nModified
        });
    case PL_GROUP_DEL_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

function addTheme (state = {
  isFetching: false,
  errmsg: '',
  themeTitle: ''
}, action) {
  switch (action.type) {
    case PL_THEME_ADD_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_THEME_ADD_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          themeTitle: action.themeTitle
        });
    case PL_THEME_ADD_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

function delTheme (state = {
  isFetching: false,
  errmsg: '',
  nModified: 0
}, action) {
  switch (action.type) {
    case PL_THEME_DEL_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case PL_THEME_DEL_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '',
          nModified: action.nModified
        });
    case PL_THEME_DEL_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

function addComment (state = {
  isFetching: false,
  errmsg: ''
}, action) {
  switch (action.type) {
    case COMMENTS_ADD_START:
      return Object.assign({}, state,
        { isFetching: true, errmsg: '' });
    case COMMENTS_ADD_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, errmsg: '' });
    case COMMENTS_ADD_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, errmsg: action.errmsg });
    default:
      return state;
  }
}

export default portalManage;
