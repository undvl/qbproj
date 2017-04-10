/* eslint-disable */

// import Layout from '../components/Layout';
// import Main from './Main';
// import Board from './Board';
// import Rooms from './Rooms';
// import Portal from './Portal';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';

import React, { PropTypes } from 'react';
// import { Router, Route, IndexRoute } from 'react-router';
import { Router, Route, IndexRoute } from 'react-router';

import { connect } from 'react-redux';
import { initLogin } from '../actions/auth';

import routes from './routes_prm';

// const Routes = ({ history }) => (
//   <Router history={history} routes={routes} />
// );

// Routes.propTypes = {
//   history: PropTypes.any.isRequired
// }


// const routes = (
//   <Route path="/" component="Layout">
//     <IndexRoute component="Main" />
//     <Route path="q" component="Board" />
//     <Route path="rm" component="Rooms" />
//     <Route path="q/:qb/pl/" component="Portal" />
//     <Route path="login" component="Login" />
//     <Route path="signup" component="Signup" />
//   </Route>
// );

class Routes extends React.Component {
  componentWillMount() {
    this.props.dispatch(initLogin());
  }
  render() {
    return (
      <Router history={this.props.history} routes={routes} />
      // <Router history={this.props.history}>
      //   {routes}
      // </Router>
    );
  }
}

Routes.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(Routes);


  // handleMustNotBeLogged(nextState, replace, callback) {
  //   const loggedUser = this.props.store.getState().login.loggedUser;
  //   if (loggedUser) {
  //     replace('/');
  //   }
  //   callback();
  // },
  // handleMustBeLogged(nextState, replace, callback) {
  //   const loggedUser = this.props.store.getState().login.loggedUser;
  //   if (!loggedUser) {
  //     replace('/');
  //   }
  //   callback();
  // },

  //         <Route path="/pl" component={Portal} onEnter={this.handleMustBeLogged} />
  //         <Route path="/login" component={Login} onEnter={this.handleMustNotBeLogged} />
