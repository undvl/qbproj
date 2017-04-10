import React from 'react';
import DocumentTitle from 'react-document-title'
;
import Button from 'react-bootstrap/lib/Button';

const NotFound = React.createClass({
  handleBack() {
    history.go(-1);
  },
  render() {
    return (
      <DocumentTitle title='Not found'>
        <div>
          <h3>Page not found</h3>
          <hr />
          <Button onClick={this.handleBack} bsStyle="primary">Back</Button>
        </div>
      </DocumentTitle>
    );
  }
});

export default NotFound;
