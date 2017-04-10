import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import { connect } from 'react-redux';
import { processPortalGroupAdd } from '../../actions/portalManage';

const ModalAddGroup = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    show: PropTypes.bool,
    onHide: PropTypes.func
  },
  getInitialState() {
    return { groupName: '',
      groupRestrictView: false,
      groupCanViewLvl: 4,
      groupCanAddLvl: 3
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { groupName, groupRestrictView, groupCanViewLvl, groupCanAddLvl } = this.state;

    const params = {
      qb: this.props.params.qb,
      groupName,
      groupCanViewLvl: groupRestrictView ? groupCanViewLvl : undefined,
      groupCanAddLvl
    };

    dispatch(processPortalGroupAdd(params));
    this.props.onHide();
    this.clearStates();
  },
  handleChangeGroupName(e) {
    this.setState({ groupName: e.target.value });
  },
  handleChangeGroupCanViewLvl(e) {
    this.setState({ groupCanViewLvl: e.target.value });
  },
  handleChangeGroupCanAddLvl(e) {
    this.setState({ groupCanAddLvl: e.target.value });
  },
  handleChangeGroupRestrictView(e) {
    this.setState({ groupRestrictView: e.target.checked });
  },
  clearStates() {
    this.setState({ groupName: ''
    });
  },
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="groupName">
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={8}>
                <FormControl type="text" placeholder="Group title" required
                  value={this.state.groupName} onChange={this.handleChangeGroupName}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="groupRestrictView">
              <Col sm={2} />
              <Col sm={5}>
                <Checkbox checked={this.state.groupRestrictView} onChange={this.handleChangeGroupRestrictView}>
                  Restrict view level
                </Checkbox>
              </Col>
            </FormGroup>
            {this.state.groupRestrictView && <FormGroup controlId="groupCanViewLvl">
              <Col componentClass={ControlLabel} sm={4}>
                Can view user level
              </Col>
              <Col sm={2}>
                <FormControl type="number" min={1} max={4}
                  disabled={!this.state.groupRestrictView}
                  value={this.state.groupCanViewLvl} onChange={this.handleChangeGroupCanViewLvl} required
                />
              </Col>
            </FormGroup>}
            <FormGroup controlId="groupCanAddLvl">
              <Col componentClass={ControlLabel} sm={4}>
                Can add user level
              </Col>
              <Col sm={2}>
                <FormControl type="number" min={1} max={4}
                  value={this.state.groupCanAddLvl} onChange={this.handleChangeGroupCanAddLvl} required
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={1}>
                <Button type="submit">
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default connect()(ModalAddGroup);
