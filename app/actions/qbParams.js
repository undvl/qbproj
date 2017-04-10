export const USER_PARAMS_REQ_START = 'USER_PARAMS_REQ_START';
export const USER_PARAMS_REQ_SUCCESS = 'USER_PARAMS_REQ_SUCCESS';
export const USER_PARAMS_REQ_FAILURE = 'USER_PARAMS_REQ_FAILURE';

/**
 * user params request
 */
function startUserParamsReq() {
  return { type: USER_PARAMS_REQ_START };
}

function successUserParamsReq(qb, qbTitle, userParams) {
  return { type: USER_PARAMS_REQ_SUCCESS, qb, qbTitle, userParams };
}

function failureUserParamsReq(errmsg) {
  return { type: USER_PARAMS_REQ_FAILURE, errmsg };
}

export function processUserParamsReq(qb) {
  return dispatch => {
    dispatch(startUserParamsReq());
    if (typeof window === 'undefined') {
      return dispatch(failureUserParamsReq('Server Render not support this request'));
    }

    fetch(`/api/user_params/${qb}`, {
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
        return dispatch(failureUserParamsReq(obj.message));
      }
      dispatch(successUserParamsReq(obj.qb, obj.qbTitle, obj.userParams));
    })
    .catch(err => {
    //   console.log(err);
      dispatch(failureUserParamsReq(err.message));
    });

    // axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
    // axios.get(`/api/user_params/${qb}`)
    // .then(response => {
    //   const d = response.data;

    //   if (!d.success) return dispatch(failureUserParamsReq(d.message));
    //   dispatch(successUserParamsReq(qb, d.userParams));
    // })
    // .catch(error => {
    //   dispatch(failureUserParamsReq(error.message));
    // });
  };
}
