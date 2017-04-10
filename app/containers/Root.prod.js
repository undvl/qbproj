import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes';

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Routes history={this.props.history} />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default Root;
