import React from 'react';
import DocumentTitle from 'react-document-title';

import SignupForm from '../containers/rdxSignupForm';

const Signup = () => (
  <DocumentTitle title='Signup'>
    <div>
      <SignupForm />;
    </div>
  </DocumentTitle>
);

export default Signup;
