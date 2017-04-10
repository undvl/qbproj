export const DUMMY_ACTION = 'DUMMY_ACTION';

export function testAction() {
  return (dispatch, getState, tokenVerify) => {
    dispatch(dummyAction('dummy text'));
    tokenVerify();
  };
}

export function dummyAction(text) {
  return { type: DUMMY_ACTION, text };
}
