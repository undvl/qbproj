import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

// import ProseMirr from 'react-prosemirror';
// let ProseMirror = () => <div />;

// if (typeof window !== 'undefined') {
//   ProseMirror = ProseMirr;
// }
const ProseMirror = typeof window !== 'undefined' ? require('react-prosemirror').default : () => <div />;

if (typeof window !== 'undefined') {
  require('prosemirror/dist/inputrules/autoinput');
  require('prosemirror/dist/menu/menubar');
  require('prosemirror/dist/menu/menu');
  require('prosemirror/dist/markdown');
}

import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { processPortalThemeAdd } from '../../actions/portalManage';

const AddTheme = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object,
    isFetching: PropTypes.bool
  },
  getInitialState() {
    return {
      themeTitle: '', themeBody: ''
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { themeTitle, themeBody } = this.state;

    const params = {
      qb: this.props.params.qb,
      groupID: this.props.params.groupID,
      themeTitle,
      themeBody
    };

    dispatch(processPortalThemeAdd(params));
  },
  handleChangeThemeTitle(e) {
    this.setState({ themeTitle: e.target.value });
  },
  handleChangeThemeBody(value) {
    this.setState({ themeBody: value });
  },
  render() {
    return (
      <div>
        <Button onClick={() => browserHistory.goBack()}>Back</Button>
        <hr />
        <h3>
          Add theme to group: {this.props.location.query.groupName}
        </h3>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="themeTitle">
            <Col componentClass={ControlLabel} sm={1}>
              Title
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="Theme title"
                value={this.state.themeTitle} onChange={this.handleChangeThemeTitle}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="themeBody">
            <ControlLabel>
              Theme body
            </ControlLabel>
            <ProseMirror value={this.state.themeBody} onChange={this.handleChangeThemeBody}
              options={{ menuBar: true, autoInput: true, docFormat: 'html' }}
            />
          </FormGroup>
          <FormGroup>
            <Col sm={1}>
              <Button type="submit" disabled={this.props.isFetching}>
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { addTheme } = state.portalManage;
  const { isFetching } = addTheme;

  return { isFetching };
}

export default connect(mapStateToProps)(AddTheme);
// export default typeof window !== 'undefined' ? connect(mapStateToProps)(AddTheme) : () => <div />;
