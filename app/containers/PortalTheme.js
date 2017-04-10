import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Markdown from 'react-markdown';

import Comments from './Comments';

import { connect } from 'react-redux';

import { processPortalThemeReq } from '../actions/portal';

// import { testAction } from '../actions/dummy';

const PortalTheme = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    _id: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string
  },
  componentWillMount() {
    if (!this.props.text) this.handleRefresh();
  },
  componentDidUpdate() {
    if (!(this.props.params.themeID === this.props._id)) this.handleRefresh();
  },
  handleRefresh() {
    if (typeof (Storage) !== 'undefined') {
      this.props.dispatch(processPortalThemeReq(this.props.params.themeID));
    }
  },
  render() {
    return (
      <DocumentTitle title={this.props.name || 'Loading theme'}>
        <div>
          <h2>{this.props.name}</h2>
          <Markdown source={this.props.text || ''} />
          <hr />
          <Comments themeID={this.props.params.themeID} />
        </div>
      </DocumentTitle>
    );
  }

});

function mapStateToProps(state, ownProps) {
  const { portal } = state;
  const { theme } = portal;
  const { _id, name, portalGroup, text } = theme;

  if (ownProps.params.themeID === _id) {
    return { _id, name, portalGroup, text };
  }
  return {};
}

export default connect(mapStateToProps)(PortalTheme);
