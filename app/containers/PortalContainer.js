import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import { processUserParamsReq } from '../actions/qbParams';

const PortalContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
    params: React.PropTypes.object,
    currentQB: React.PropTypes.string,
    username: React.PropTypes.string,
    loggedUser: React.PropTypes.string
  },
  componentWillMount() {
    if (!(this.props.username === this.props.loggedUser && this.props.currentQB === this.props.params.qb)) this.handleRefresh();
  },
  componentDidUpdate() {
    if (!(this.props.username === this.props.loggedUser && this.props.currentQB === this.props.params.qb)) this.handleRefresh();
  },
  handleRefresh() {
    if (typeof (Storage) !== 'undefined') {
      this.props.dispatch(processUserParamsReq(this.props.params.qb));
    }
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { qbParams, service } = state;
  const { loggedUser } = service.login;

  const { currentQB, username } = qbParams;

  return { currentQB, username, loggedUser: (typeof loggedUser === 'undefined' ? '' : loggedUser.username) };
}

export default connect(mapStateToProps)(PortalContainer);
