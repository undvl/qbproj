import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes';
import DevTools from './DevTools';

// const Root = ({ store, history }) => (
//   <Provider store={store}>
//     <div>
//       <Routes history={history} />
//       <DevTools />
//     </div>
//   </Provider>
// );

class Root extends React.Component {
  // propTypes: {
  //   store: PropTypes.any,
  //   history: PropTypes.any
  // }
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Routes history={this.props.history} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

// const Root = React.createClass({
//   propTypes: {
//     store: PropTypes.any,
//     history: PropTypes.any
//   },
//   render() {
//     return (
//       <Provider store={this.props.store}>
//         <div>
//           <Routes history={this.props.history} />
//           <DevTools />
//         </div>
//       </Provider>
//     );
//   }
// });

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};

export default Root;
