import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import { connect } from 'react-redux';

import { testAction } from '../actions/dummy';

const Rooms = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired
  },
  handleOnClick() {
    this.props.dispatch(testAction());
  },
  render() {
    return (
      <DocumentTitle title='Rooms'>
        <div>
          <p>Rooms content</p>
          <button onClick={this.handleOnClick}>test button</button>
        </div>
      </DocumentTitle>
    );
  }

});

export default connect()(Rooms);
