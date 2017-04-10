import { CREATE_QB_START, CREATE_QB_SUCCESS, CREATE_QB_FAILURE }
  from '../../actions/qb';

function createQB (state = {
  isFetching: false,
  showAlert: false,
  alertText: '',
  name: ''
}, action) {
  switch (action.type) {
    case CREATE_QB_START:
      return Object.assign({}, state,
        { isFetching: true, showAlert: false, alertText: '',
          name: action.name
        });
    case CREATE_QB_SUCCESS:
      return Object.assign({}, state,
        { isFetching: false, showAlert: false, alertText: '',
          name: action.name
        });
    case CREATE_QB_FAILURE:
      return Object.assign({}, state,
        { isFetching: false, showAlert: true, alertText: action.alertText });
    default:
      return state;
  }
}

export default createQB;
