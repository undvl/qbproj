import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm';

import { processLogin } from '../actions/auth';
import { connect } from 'react-redux';

// const rdxLoginForm = ({ dispProcessLogin, isFetching, showAlert, alertText }) => {

//   return <LoginForm dispProcessLogin={dispProcessLogin}
//     isFetching={isFetching}
//     showAlert={showAlert}
//     alertText={alertText}
//   />
// }
const rdxLoginForm = React.createClass({
  propTypes: {
    dispProcessLogin: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    showAlert: PropTypes.bool.isRequired,
    alertText: PropTypes.string,
    loggedUser: PropTypes.object
  },
  render() {
    const p = this.props;

    if (p.loggedUser) {
      return <strong>User already logged in.</strong>;
    }
    return (
      <LoginForm dispProcessLogin={p.dispProcessLogin}
        isFetching={p.isFetching}
        showAlert={p.showAlert}
        alertText={p.alertText}
      />
    );
  }
});

function mapStateToProps(state) {
  const { login } = state.service;
  const { isFetching, showAlert, alertText, loggedUser } = login;
  // console.log(state)

  return { isFetching, showAlert, alertText, loggedUser };
}
function mapDispatchToProps(dispatch) {
  return {
    dispProcessLogin: (username, password) => {
      dispatch(processLogin(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(rdxLoginForm);
