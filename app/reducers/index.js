import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import service from './service';
// import { signup, login } from './auth';
import portal from './portal';
import portalManage from './portalManage';
import dummy from './dummy';
// import createQB from './createQB';
import qbParams from './qbParams';


const rootReducer = combineReducers({
  service,
  portal,
  portalManage,
  dummy,
  qbParams,
  routing
});

export default rootReducer;
