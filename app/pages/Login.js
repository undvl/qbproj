import React from 'react';
import DocumentTitle from 'react-document-title';

import LoginForm from '../containers/rdxLoginForm';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Link } from 'react-router';

const Login = () => (
  <DocumentTitle title='Login'>
    <div>
      <Row>
        <Col smOffset={2} sm={10}>
          <strong>Not registered yet? <Link to={'/signup'}>Sign Up</Link></strong>
        </Col>
      </Row>
      <hr />
      <LoginForm />
    </div>
  </DocumentTitle>
);

export default Login;
