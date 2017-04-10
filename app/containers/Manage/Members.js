import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Button from 'react-bootstrap/lib/Button';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';

import { connect } from 'react-redux';
import {
  processPortalGetMembers,
  processPortalChangeMemberLevel
} from '../../actions/portalUsers';


const Members = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    qbTitle: PropTypes.string,
    membs: PropTypes.array,
    level: PropTypes.number
  },
  getInitialState() {
    return {
      neadRefresh: false
    };
  },
  componentWillMount() {
    this.handleRefresh();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetching === false && this.state.neadRefresh) {
      this.handleRefresh();
      this.setState({ neadRefresh: false });
    }
  },
  handleRefresh() {
    this.props.dispatch(processPortalGetMembers({ qb: this.props.params.qb }));
  },
  handleChangeLevel(membID, e) {
    this.props.dispatch(processPortalChangeMemberLevel({ membID, newLevel: e.target.value }));
    this.setState({ neadRefresh: true });
  },
  render() {
    const { membs, level } = this.props;
    const objThis = this;

    function rLevel(memb) {
      if (level < (memb.level === '' ? 999 : memb.level)) {
        return (
          <select value={memb.level}
            onChange={(e) => objThis.handleChangeLevel(memb._id, e)}
          >
            {level === 0 ? <option value="1">1 - superuser</option> : ''}
            <option value="2">2 - manage</option>
            <option value="3">3 - common</option>
            <option value="4">4 - view</option>
            <option value="" />
          </select>
        );
      }
      switch (memb.level) {
        case 0: return 'owner';
        case 1: return 'superuser';
        default: return '';
      }
    }

    return (
      <DocumentTitle title='Manage portal members'>
        <div>
          <h4>Portal members</h4>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col sm={2}>
                  User
                </Col>
                <Col sm={2}>
                  Alias
                </Col>
                <Col sm={2}>
                  Level
                </Col>
              </Row>
            </ListGroupItem>
            {membs && membs.map((memb, k) => (
              <ListGroupItem key={k}>
                <Row>
                  <Col sm={2}>
                    {memb.user}
                  </Col>
                  <Col sm={2}>
                    {memb.alias}
                  </Col>
                  <Col sm={2}>
                    {rLevel(memb)}
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </DocumentTitle>
    );
  }

});

function mapStateToProps(state, ownProps) {
  const { service, qbParams } = state;
  const { qbTitle, level } = qbParams;
  const { isFetching: isFetchingReq, members: membs } = service.portalUsers.getMembers;
  const { isFetching: isFetchingChange } = service.portalUsers.changeMemberLevel;

  const isFetching = isFetchingReq || isFetchingChange;

  return { qbTitle, level, isFetching, membs };
}

export default connect(mapStateToProps)(Members);
