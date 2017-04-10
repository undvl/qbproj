import { DUMMY_ACTION }
  from '../actions/dummy';

function dummy(state = {}, action) {
  switch (action.type) {
    case DUMMY_ACTION:
      return Object.assign({}, state,
        { text: action.text });
    default:
      return state;
  }
}

export default dummy;
