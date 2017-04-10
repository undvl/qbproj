import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

import { connect } from 'react-redux';
import { processPortalThemeDel } from '../../actions/portalManage';

const ModalDelTheme = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    _id: PropTypes.string,
    name: PropTypes.string
  },
  handleOnYES() {
    const { dispatch } = this.props;
    const params = {
      qb: this.props.params.qb,
      _id: this.props._id
    };

    dispatch(processPortalThemeDel(params));
    this.props.onHide();
  },
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete theme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Confirm delete theme: {this.props.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleOnYES}>YES</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

export default connect()(ModalDelTheme);
