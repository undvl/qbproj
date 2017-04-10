import React, { PropTypes } from 'react';
import SignupForm from '../components/SignupForm';

import { processSignup } from '../actions/auth';
import { connect } from 'react-redux';

const rdxSignupForm = ({ dispProcessSignup, isFetching, showAlert, alertText }) => (
  <SignupForm dispProcessSignup={dispProcessSignup}
    isFetching={isFetching}
    showAlert={showAlert}
    alertText={alertText}
  />
);

function mapStateToProps(state) {
  const { signup } = state.service;
  const { isFetching, showAlert, alertText/* , loggedUser*/ } = signup;
  // console.log(state)

  return { isFetching, showAlert, alertText/* , loggedUser*/ };
}
function mapDispatchToProps(dispatch) {
  return {
    dispProcessSignup: (username, password, email) => {
      dispatch(processSignup(username, password, email));
    }
  };
}

rdxSignupForm.propTypes = {
  dispProcessSignup: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  showAlert: PropTypes.bool.isRequired,
  alertText: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(rdxSignupForm);
