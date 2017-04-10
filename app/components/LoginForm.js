import React, { PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import Fade from 'react-bootstrap/lib/Fade';

const LoginForm = React.createClass({
  /* contextTypes: {
    router: React.PropTypes.object.isRequired
  },*/
  propTypes: {
    dispProcessLogin: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      username: '', password: '', verifyPass: '', email: ''
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    // const { dispatch } = this.props;
    const { username, password } = this.state;

    this.props.dispProcessLogin(username, password);
    // this.context.router.push('/');
  },
  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  },
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  },
  render(dispProcessLogin, isFetching, showAlert, alertText) {
    const p = this.props;

    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="loginUsername">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={2}>
            <FormControl type="text" placeholder="Username" required
              value={this.state.username} onChange={this.handleChangeUsername}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="loginPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={2}>
            <FormControl type="password" placeholder="Password" required
              value={this.state.password} onChange={this.handleChangePassword}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={1}>
            <Button type="submit" disabled={p.isFetching}>
              Log in
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

/* LoginForm.propTypes = {
  // dispatch: PropTypes.func.isRequired
  dispProcessLogin: PropTypes.func.isRequired
}*/

export default LoginForm;
