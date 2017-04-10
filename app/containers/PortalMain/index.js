import React, { PropTypes } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import ModalAddGroup from './ModalAddGroup';
import ModalDelGroup from './ModalDelGroup';
import ModalDelTheme from './ModalDelTheme';

import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { processThemesListReq, accordionActiveKey, /*clearPortal, */processThemesUserLevelReq } from '../../actions/portal';

import { Link } from 'react-router';

//import { dummyAction } from '../actions/dummy';

const PortalMain = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    loggedUser: React.PropTypes.string,
    qbParams: PropTypes.object,
    themesList: PropTypes.array,
    activeKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    errmsg: PropTypes.string
  },
  getInitialState() {
    return {
      showEditButtons: false,
      showAddGroup: false,
      showDelGroup: false,
      deletingGroupID: '',
      deletingGroupName: '',
      showDelTheme: false,
      deletingThemeID: '',
      deletingThemeTitle: ''
    };
  },
  componentWillMount() {
    this.handleRefresh();
    // if (!(this.props.themesList && this.props.themesList.length > 0)) {
    //   this.handleRefresh();
    // }
  },
  componentDidUpdate(prevProps) {
    if (!(prevProps.params.qb === this.props.params.qb
        && prevProps.loggedUser === this.props.loggedUser
    )) {
      this.handleRefresh();
      this.props.dispatch(accordionActiveKey(0));
    }
  },
  handleRefresh() {
    if (this.state.showEditButtons) this.props.dispatch(processThemesUserLevelReq(this.props.params.qb));
    else this.props.dispatch(processThemesListReq(this.props.params.qb));
  },
  handleEdit() {
    if (!this.state.showEditButtons) this.props.dispatch(processThemesUserLevelReq(this.props.params.qb));
    this.setState({ showEditButtons: !this.state.showEditButtons });
  },
  handleSelect(activeKey) {
    this.props.dispatch(accordionActiveKey(activeKey));
  },
  handleAddTheme(groupID, groupName) {
    browserHistory.push(`/q/${this.props.params.qb}/add_theme/${groupID}?groupName=${groupName}`);
  },
  handleCloseAddGroup() {
    this.setState({ showAddGroup: false });
  },
  handleOpenAddGroup() {
    this.setState({ showAddGroup: true });
  },
  handleCloseDelGroup() {
    this.setState({ showDelGroup: false });
  },
  handleOpenDelGroup(groupID, groupName) {
    this.setState({
      showDelGroup: true,
      deletingGroupID: groupID,
      deletingGroupName: groupName
    });
  },
  handleCloseDelTheme() {
    this.setState({ showDelTheme: false });
  },
  handleOpenDelTheme(themeID, themeTitle) {
    this.setState({
      showDelTheme: true,
      deletingThemeID: themeID,
      deletingThemeTitle: themeTitle
    });
  },
  render() {
    const { themesList, activeKey, qbParams, errmsg } = this.props;
    const { showEditButtons } = this.state;

    if (errmsg === 'User is not a member of current portal.') {
      return <h3>Please join portal to access content.</h3>;
    }
    return (
      <div>
        <Button onClick={this.handleRefresh}>Refresh</Button>
        {qbParams.level <= 2 && <Button onClick={this.handleEdit}>Edit</Button>}
        {showEditButtons && qbParams.level <= 1 && <Button onClick={this.handleOpenAddGroup}>Add Group</Button>}
        <Accordion activeKey={activeKey} onSelect={this.handleSelect}>
          {themesList && themesList.map((item, i) => (
            // (!item.minLevelView || qbParams.level <= item.minLevelView) &&
            <Panel header={<div>{item.name}
              {qbParams.level <= item.minLevelAdd &&
                <Button onClick={() => this.handleAddTheme(item._id, item.name)}>Add Theme</Button>}
              {showEditButtons && qbParams.level <= 1 &&
                <Button onClick={() => this.handleOpenDelGroup(item._id, item.name)}>Del Group</Button>}</div>}
              eventKey={i} key={i}
            >
              <ul>{item.themes.map((theme, k) => {
                const themeLink = `/q/${this.props.params.qb}/pl/${theme._id}`;

                return (<li key={k}>{showEditButtons && qbParams.level <= theme.level
                    && <Button onClick={() => this.handleOpenDelTheme(theme._id, theme.name)}>Del Theme</Button>}
                  <Link to={themeLink}>{theme.name}</Link></li>);
              })}
              </ul>
            </Panel>
          ))}
        </Accordion>

        <ModalAddGroup params={this.props.params} show={this.state.showAddGroup}
          onHide={this.handleCloseAddGroup}
        />
        <ModalDelGroup params={this.props.params} show={this.state.showDelGroup}
          onHide={this.handleCloseDelGroup} _id={this.state.deletingGroupID} name={this.state.deletingGroupName}
        />
        <ModalDelTheme params={this.props.params} show={this.state.showDelTheme}
          onHide={this.handleCloseDelTheme} _id={this.state.deletingThemeID} name={this.state.deletingThemeTitle}
        />
      </div>
    );
  }
});

function mapStateToProps(state, ownProps) {
  const { service, qbParams, portal } = state;
  const { loggedUser } = service.login;

  const { themesList, accordion, errmsg } = portal;
  const { activeKey } = accordion;

  return { loggedUser: (typeof loggedUser === 'undefined' ? '' : loggedUser.username),
    qbParams,
    themesList, activeKey, errmsg };
}

export default connect(mapStateToProps)(PortalMain);
