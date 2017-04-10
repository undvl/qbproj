import React, { PropTypes } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import { IndexLink, Link } from 'react-router';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import IndexLinkContainer from 'react-router-bootstrap/lib/IndexLinkContainer';

import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Nbar = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    loggedUser: PropTypes.string.isRequired,
    level: PropTypes.number
  },
  handleLogout() {
    this.props.dispatch(logout());
  },
  render() {
    const { params, loggedUser, level } = this.props;

    return (
      <Navbar>
        {params.qb ?
          <div>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to={`/q/${params.qb}`}>QBproj
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav navbar>
                <IndexLinkContainer to={`/q/${params.qb}`}>
                  <NavItem eventKey={1}>Board</NavItem>
                </IndexLinkContainer>
                <LinkContainer to={`/q/${params.qb}/rm`}>
                  <NavItem eventKey={2}>Rooms</NavItem>
                </LinkContainer>
                {loggedUser !== '' &&
                  <LinkContainer to={`/q/${params.qb}/pl`}>
                    <NavItem eventKey={3}>Portal</NavItem>
                  </LinkContainer>
                }
                {level <= 1 &&
                  <NavDropdown eventKey={4} title="Manage" id="nav-managedropdown">
                    <LinkContainer to={`/q/${params.qb}/manage/members`}>
                      <MenuItem eventKey={4.1}>Members</MenuItem>
                    </LinkContainer>
                    <LinkContainer to={`/q/${params.qb}/manage/memb_requests`}>
                      <MenuItem eventKey={4.2}>Membership requests</MenuItem>
                    </LinkContainer>
                  </NavDropdown>}
                {!(loggedUser !== '') &&
                  <NavDropdown eventKey={5} title="Login" id="nav-logindropdown">
                    <LinkContainer to='/login'>
                      <MenuItem eventKey={5.1}>Login</MenuItem>
                    </LinkContainer>
                    <LinkContainer to='/signup'>
                      <MenuItem eventKey={5.2}>Signup</MenuItem>
                    </LinkContainer>
                  </NavDropdown>
                }{loggedUser !== '' && (typeof level !== 'undefined') &&
                  <NavDropdown eventKey={6} title={loggedUser} id="nav-logindropdown">
                    <MenuItem eventKey={6.1} onClick={this.handleLogout}>Logout</MenuItem>
                    <LinkContainer to='/user_options'>
                      <MenuItem eventKey={6.2}>Options</MenuItem>
                    </LinkContainer>
                  </NavDropdown>
                }{loggedUser !== '' && (typeof level === 'undefined') &&
                  <NavDropdown eventKey={7} title='Join Portal' id="nav-logindropdown">
                    <LinkContainer to={`/q/${params.qb}/join_portal`}>
                      <MenuItem eventKey={7.1}>Join Portal</MenuItem>
                    </LinkContainer>
                    <MenuItem eventKey={7.2} onClick={this.handleLogout}>Logout</MenuItem>
                    <LinkContainer to='/user_options'>
                      <MenuItem eventKey={7.3}>Options</MenuItem>
                    </LinkContainer>
                  </NavDropdown>
                }
              </Nav>
            </Navbar.Collapse>
          </div>
        :
          <div>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to={'/'}>QBproj
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav navbar>
                <IndexLinkContainer to={'/'}>
                  <NavItem eventKey={1}>Home</NavItem>
                </IndexLinkContainer>
                {loggedUser !== '' &&
                  <LinkContainer to={'/create_board'}>
                    <NavItem eventKey={2}>Create Board</NavItem>
                  </LinkContainer>
                }
                {!(loggedUser !== '') &&
                  <NavDropdown eventKey={4} title="Login" id="nav-logindropdown">
                    <LinkContainer to='/login'>
                      <MenuItem eventKey={4.1}>Login</MenuItem>
                    </LinkContainer>
                    <LinkContainer to='/signup'>
                      <MenuItem eventKey={4.2}>Signup</MenuItem>
                    </LinkContainer>
                  </NavDropdown>
                }{loggedUser !== '' &&
                  <NavDropdown eventKey={5} title={loggedUser} id="nav-logindropdown">
                    <MenuItem eventKey={5.1} onClick={this.handleLogout}>Logout</MenuItem>
                    <LinkContainer to='/user_options'>
                      <MenuItem eventKey={5.2}>Options</MenuItem>
                    </LinkContainer>
                  </NavDropdown>
                }
              </Nav>
            </Navbar.Collapse>
          </div>
        }
      </Navbar>
    );
  }
});

export default connect(null, null, null, {
  pure: false
})(Nbar);
//export default Nbar;
