import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Label from 'react-bootstrap/lib/Label';

import { connect } from 'react-redux';
import {
  processPortalGetMembReqs, processPortalAcceptJoinRequest, processPortalRejectJoinRequest
} from '../../actions/portalUsers';


const MembershipRequests = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    qbTitle: PropTypes.string,
    isFetching: PropTypes.bool,
    membReqs: PropTypes.array,
    joinReqIDAccept: PropTypes.string,
    joinReqIDReject: PropTypes.string
  },
  getInitialState() {
    return {
      reqType: 'reqTypeNew',
      membReqs: []
    };
  },
  componentWillMount() {
    this.handleRefresh();
  },
  componentDidMount() {
    if (this.state.membReqs.length === 0) this.setState({ membReqs: this.props.membReqs });
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.membReqs.length !== this.props.membReqs.length
      || nextProps.membReqs[0] && this.props.membReqs[0]
         && nextProps.membReqs[0]._id !== this.props.membReqs[0]._id
    ) {
      this.setState({ membReqs: nextProps.membReqs });
    } else if (nextProps.joinReqIDAccept !== '' && nextProps.joinReqIDAccept !== this.props.joinReqIDAccept) {
      this.setState({
        membReqs: this.state.membReqs.filter(item => item._id !== nextProps.joinReqIDAccept)
      });
    } else if (nextProps.joinReqIDReject !== '' && nextProps.joinReqIDReject !== this.props.joinReqIDReject) {
      this.setState({
        membReqs: this.state.membReqs.filter(item => item._id !== nextProps.joinReqIDReject)
      });
    }
  },
  handleRefresh() {
    const params = {
      qb: this.props.params.qb,
      type: this.state.reqType
    };

    this.props.dispatch(processPortalGetMembReqs(params));
  },
  handleChangeReqType(e) {
    this.setState({ reqType: e.target.id }, () => this.handleRefresh());
  },
  handleAccept(joinReqID) {
    this.props.dispatch(processPortalAcceptJoinRequest({ joinReqID }));
  },
  handleReject(joinReqID) {
    this.props.dispatch(processPortalRejectJoinRequest({ joinReqID }));
  },
  render() {
    const { isFetching } = this.props;
    const { membReqs, reqType } = this.state;

    return (
      <DocumentTitle title='Membership requests'>
        <div>
          <h4>Membership requests</h4>
          <ButtonGroup>
            <Button id="reqTypeNew" onClick={this.handleChangeReqType} disabled={isFetching}>
              New
            </Button>
            <Button id="reqTypeOld" onClick={this.handleChangeReqType} disabled={isFetching}>
              Old
            </Button>
          </ButtonGroup>
          <ListGroup>
            <ListGroupItem>
              <Row>
                <Col sm={2}>
                  User
                </Col>
                <Col sm={2}>
                  Alias
                </Col>
              </Row>
            </ListGroupItem>
            {membReqs && membReqs.map((mReq, k) => (
              <ListGroupItem key={k}>
                <Row className="paddedRow">
                  <Col sm={2}>
                    {mReq.user}
                  </Col>
                  <Col sm={2}>
                    {mReq.alias}
                  </Col>
                  {reqType === 'reqTypeNew' ?
                    <div>
                      <Col sm={1}>
                        <Button bsStyle="success" onClick={() => this.handleAccept(mReq._id)}
                          disabled={isFetching}
                        >Accept</Button>
                      </Col>
                      <Col sm={1}>
                        <Button bsStyle="danger" onClick={() => this.handleReject(mReq._id)}
                          disabled={isFetching}
                        >Reject</Button>
                      </Col>
                    </div>
                  :
                    <Col sm={2}>
                      {mReq.isAccepted === true ? <Label bsStyle="success">Accepted by {mReq.acceptedBy}</Label>
                      : <Label bsStyle="danger">Rejected by {mReq.rejectedBy}</Label>}
                    </Col>
                  }
                </Row>
                <Panel>
                  <Row>
                    <Col sm={12}>
                      {mReq.comment}
                    </Col>
                  </Row>
                </Panel>
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
  const { qbTitle } = qbParams;
  const { isFetching: isFetchingGet, membReqs } = service.portalUsers.getMembReqs;
  const { isFetching: isFetchingAccept, joinReqID: joinReqIDAccept } = service.portalUsers.acceptJoinRequest;
  const { isFetching: isFetchingReject, joinReqID: joinReqIDReject } = service.portalUsers.rejectJoinRequest;

  const isFetching = isFetchingGet || isFetchingAccept || isFetchingReject;

  return { qbTitle, isFetching, membReqs, joinReqIDAccept, joinReqIDReject };
}

export default connect(mapStateToProps)(MembershipRequests);
