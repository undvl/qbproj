import { processThemesListReq, processPortalThemeReq } from './portal';

export default function processSrvRender(srvRendParams) {
  return dispatch => {
    if (srvRendParams.plThemesList) {
      dispatch(processThemesListReq(srvRendParams.plThemesList));
    }
    if (srvRendParams.plThemeID) {
      dispatch(processPortalThemeReq(srvRendParams.plThemeID));
    }
  };
}
