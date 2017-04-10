import React, { PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import Fade from 'react-bootstrap/lib/Fade';

// class SignupForm extends React.Component {
const SignupForm = React.createClass({
  propTypes: {
    dispProcessSignup: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      username: '', password: '', verifyPass: '', email: ''
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    let isValid = true;

    if (!this.validateUsername() || this.validateUsername() === 'error') isValid = false;
    else if (!this.validatePassword() || this.validatePassword() === 'error') isValid = false;
    else if (!this.validateVerifyPass() || this.validateVerifyPass() === 'error') isValid = false;
    if (isValid) {
      const { username, password, email } = this.state;

      this.props.dispProcessSignup(username, password, email);
    }
  },
  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  },
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  },
  handleChangeVerifyPass(e) {
    this.setState({ verifyPass: e.target.value });
  },
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  },
  validateUsername() {
    const length = this.state.username.length;

    if (length > 3) return 'success';
    else if (length > 0) return 'error';
  },
  validatePassword() {
    const length = this.state.password.length;

    if (length > 7) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },
  validateVerifyPass() {
    if (this.state.password.length > 0) {
      if (this.state.password === this.state.verifyPass) return 'success';
      return 'error';
    }
  },
  render(dispProcessSignup, isFetching, showAlert, alertText) {
    // const { showAlert, alertText } = this.props;
    const p = this.props;

    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="signupUsername" validationState={this.validateUsername()}>
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={3}>
            <FormControl type="text" placeholder="Username" required
              value={this.state.username} onChange={this.handleChangeUsername}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupPassword" validationState={this.validatePassword()}>
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={3}>
            <FormControl type="password" placeholder="Password" required
              value={this.state.password} onChange={this.handleChangePassword}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupVerifyPass" validationState={this.validateVerifyPass()}>
          <Col componentClass={ControlLabel} sm={2}>
            Verify password
          </Col>
          <Col sm={3}>
            <FormControl type="password" placeholder="Repeat password" required
              value={this.state.verifyPass} onChange={this.handleChangeVerifyPass}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="signupEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={3}>
            <FormControl type="email" placeholder="Email" required
              value={this.state.email} onChange={this.handleChangeEmail}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={p.isFetching}>
              Sign up
            </Button>
          </Col>
        </FormGroup>
        <Fade in={p.showAlert}>
          <Alert bsStyle="danger">
            <strong>{p.alertText}</strong>
          </Alert>
        </Fade>
      </Form>
    );
  }
});

export default SignupForm;
