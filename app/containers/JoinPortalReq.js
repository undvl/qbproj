import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import { connect } from 'react-redux';

import { processPortalThemeReq } from '../actions/portal';
import { processPortalJoinRequest } from '../actions/portalUsers';

// import { testAction } from '../actions/dummy';

const JoinPortalReq = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    qbTitle: PropTypes.string,
    isFetching: PropTypes.bool,
    alertText: PropTypes.string
  },
  getInitialState() {
    return {
      comment: '', useAlias: false, alias: ''
    };
  },
  handleSubmit(e) {
    e.preventDefault();

    const { comment, useAlias, alias } = this.state;
    const params = {
      qb: this.props.params.qb,
      comment
    };

    if (useAlias) params.alias = alias;

    this.props.dispatch(processPortalJoinRequest(params));
  },
  handleChangeComment(e) {
    this.setState({ comment: e.target.value });
  },
  handleChangeUseAlias(e) {
    this.setState({ useAlias: e.target.checked });
  },
  handleChangeAlias(e) {
    this.setState({ alias: e.target.value });
  },
  render() {
    return (
      <DocumentTitle title='Join portal'>
        <div>
          <h3>Join portal: {this.props.qbTitle}</h3>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="comment">
              <Col componentClass={ControlLabel} sm={2}>
                Comment
              </Col>
              <Col sm={4}>
                <FormControl type="text" required
                  value={this.state.comment} onChange={this.handleChangeComment}
                />
              </Col>
            </FormGroup>
            {/*<FormGroup controlId="useAlias">
              <Col sm={2} />
              <Col sm={5}>
                <Checkbox checked={this.state.useAlias} onChange={this.handleChangeUseAlias}>
                  Use alias
                </Checkbox>
              </Col>
            </FormGroup>
            {this.state.useAlias && <FormGroup controlId="alias">
              <Col componentClass={ControlLabel} sm={2}>
                Alias
              </Col>
              <Col sm={4}>
                <FormControl type="text" required
                  value={this.state.alias} onChange={this.handleChangeAlias}
                />
              </Col>
            </FormGroup>}*/}
            <FormGroup>
              <Col smOffset={2} sm={1}>
                <Button type="submit" disabled={this.props.isFetching}>
                  Submit
                </Button>
              </Col>
            </FormGroup>
            {this.props.alertText && this.props.alertText !== '' && <Alert bsStyle="danger">
              <strong>{this.props.alertText}</strong>
            </Alert>}
          </Form>
        </div>
      </DocumentTitle>
    );
  }

});

function mapStateToProps(state, ownProps) {
  const { service, qbParams } = state;
  const { joinRequest } = service.portalUsers;
  const { isFetching, errmsg } = joinRequest;
  const { qbTitle } = qbParams;

  return { qbTitle, isFetching, alertText: errmsg };
}

export default connect(mapStateToProps)(JoinPortalReq);
