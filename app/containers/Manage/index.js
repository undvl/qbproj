import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import { connect } from 'react-redux';


const MembershipRequests = React.createClass({
  propTypes: {
    children: PropTypes.node,
    qbTitle: PropTypes.string
  },
  render() {
    return (
      <div>
        <h3>Manage: {this.props.qbTitle}</h3>
        {this.props.children}
      </div>
    );
  }

});

function mapStateToProps(state) {
  const { qbParams } = state;
  const { qbTitle } = qbParams;

  return { qbTitle };
}

export default connect(mapStateToProps)(MembershipRequests);
