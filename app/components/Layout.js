import React, { PropTypes } from 'react';
import LinksPanel from '../components/LinksPanel';
import Navbar from '../components/Navbar';
import Grid  from 'react-bootstrap/lib/Grid';

import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

const Layout = (props) => (
  <div>
    <Navbar params={props.params} loggedUser={props.loggedUser} level={props.level} />
    <Grid>
      {props.children}
      <hr />
      <LinksPanel params={props.params} />
    </Grid>
  </div>
);

// class Layout extends React.Component {
//   render() {
//     return (
//       <div>dfee
//         <Navbar isAuthenticated={this.props.isAuthenticated}/>
//         <Grid>
//           {this.props.children}
//           <hr />
//           <LinksPanel />
//         </Grid>
//       </div>
//     );
//   }
// }

Layout.propTypes = {
  children: PropTypes.node,
  params: React.PropTypes.object,
  loggedUser: PropTypes.string.isRequired,
  level: PropTypes.number
};

function mapStateToProps(state) {
  const { login } = state.service;
  const { loggedUser } = login;
  const { level } = state.qbParams;

  return {
    loggedUser: (typeof loggedUser === 'undefined' ? '' : loggedUser.username),
    level
  };
  // return { isAuthenticated: loggedUser !== undefined };
}

export default connect(mapStateToProps)(Layout);
