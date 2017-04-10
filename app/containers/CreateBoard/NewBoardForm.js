import React, { PropTypes } from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import Fade from 'react-bootstrap/lib/Fade';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { connect } from 'react-redux';
import { processCreateQB } from '../../actions/qb';

// class SignupForm extends React.Component {
const NewBoardForm = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    showAlert: PropTypes.bool,
    alertText: PropTypes.string,
    urlIsFree: PropTypes.bool,
    queryUrl: PropTypes.string
  },
  getInitialState() {
    return {
      isValid: true,
      title: '',
      url: '', urlHelp: '',
      visibility: 'public', visibilityHelp: '',
      category: '', categoriesList: [], catDescr: '',
      tags: ''
    };
  },
  componentDidMount() {
    // const nodeFetch = (typeof window === 'undefined') ? require('node-fetch') : undefined;

    // if (typeof window === 'undefined') {
    //   nodeFetch('http://localhost:3000/api/create_qb/get_categories')
    //   .then(res => res.json())
    //   .then(obj => this.setState({ categoriesList: obj.categoriesList }))
    //   .catch(err => console.log(err.message));
    // } else {
    if (typeof window !== 'undefined') {
      fetch('/api/create_qb/get_categories')
      .then(res => res.json())
      .then(obj => this.setState({ categoriesList: obj.categoriesList }))
      .catch(err => console.log(err.message));
    }
  },
  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateTitle() || this.validateTitle() === 'error') this.setState({ isValid: false });
    else if (!this.validateUrl() || this.validateUrl() === 'error') this.setState({ isValid: false });
    else if (!this.validateCategory() || this.validateCategory() === 'error') this.setState({ isValid: false });
    else {
      this.setState({ isValid: true });
      const { url, title, visibility, category, catDescr, tags } = this.state;
      const isPrivate = !(visibility === 'public');

      this.props.dispatch(processCreateQB({ name: url, title, isPrivate, category, catDescr, tags }));
    }
  },
  handleChangeTitle(e) {
    this.setState({ title: e.target.value });
  },
  handleChangeUrl(e) {
    this.setState({ url: e.target.value }, this.handleUrlHelp);
  },
  handleUrlHelp() {
    if (this.validateUrl() === 'success') {
      this.setState({ urlHelp: `Board url: qboard.com/q/${this.state.url}` });
    } else if (!(this.validateUrl() === 'error')) {
      this.setState({ urlHelp: '' });
    } else if (!this.props.urlIsFree) {
      this.setState({ urlHelp: 'URL already in use' });
    } else if (this.state.visibility === 'public') {
      this.setState({ urlHelp: 'It should be at least 6 characters' });
    } else {
      this.setState({ urlHelp: 'It should be at least 8 characters' });
    }
  },
  handleChangeVisibility(e) {
    this.setState({
      visibility: e.target.value,
      visibilityHelp: (e.target.value === 'public') ? '' : 'Other users can\'t see content'
        + ' before their join request has been accepted.'
    }, this.handleUrlHelp);
  },
  handleChangeCategory(e) {
    this.setState({ category: e.target.value });
  },
  handleChangeCatDescr(e) {
    this.setState({ catDescr: e.target.value });
  },
  handleChangeTags(e) {
    this.setState({ tags: e.target.value });
  },
  validateTitle() {
    if (this.state.title.length > 0) return 'success';
  },
  validateUrl() {
    if (!this.props.urlIsFree && this.props.queryUrl === this.state.url) return 'error';

    if (this.state.visibility === 'public') {
      if (this.state.url.length > 5) {
        return 'success';
      }
    }
    if (this.state.url.length > 7) {
      return 'success';
    }
    if (this.state.url.length > 0) {
      return 'error';
    }
  },
  validateCategory() {
    if (this.state.category !== '') return 'success';
    if (this.state.isValid === false) return 'error';
  },
  render() {
    const { isFetching, showAlert, alertText } = this.props;
    const { categoriesList, category } = this.state;

    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup controlId="boardTitle" validationState={this.validateTitle()}>
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={3}>
            <FormControl type="text" placeholder="Board Title" required
              value={this.state.title} onChange={this.handleChangeTitle}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="boardUrl" validationState={this.validateUrl()}>
          <Col componentClass={ControlLabel} sm={2}>
            Url
          </Col>
          <Col sm={3}>
            <FormControl type="text" placeholder="my_board_url" required
              value={this.state.url} onChange={this.handleChangeUrl}
            />
            <HelpBlock>{this.state.urlHelp}</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup controlId="boardVisibility">
          <Col componentClass={ControlLabel} sm={2}>
            Visibility
          </Col>
          <Col sm={3}>
            <FormControl componentClass="select"
              value={this.state.visibility} onChange={this.handleChangeVisibility}
            >
              <option value="public">public</option>
              <option value="private">private</option>
            </FormControl>
            <HelpBlock>{this.state.visibilityHelp}</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup controlId="boardCategory" validationState={this.validateCategory()}>
          <Col componentClass={ControlLabel} sm={2}>
            Category
          </Col>
          <Col sm={3}>
            <FormControl componentClass="select" placeholder="my_board_url"
              value={this.state.category} onChange={this.handleChangeCategory}
            >
              <option value="" disabled>Please select</option>
              {categoriesList.map((item, i) => (
                <option value={item.name} key={i}>{item.name}</option>
              ))}
            </FormControl>
          </Col>
        </FormGroup>
        {(category === 'other') &&
          <FormGroup controlId="boardCategoryDescription">
            <Col componentClass={ControlLabel} sm={2}>
              Category description
            </Col>
            <Col sm={3}>
              <FormControl type="text" placeholder="description" required
                value={this.state.catDescr} onChange={this.handleChangeCatDescr}
              />
            </Col>
          </FormGroup>
        }
        <FormGroup controlId="boardTags">
          <Col componentClass={ControlLabel} sm={2}>
            Tags
          </Col>
          <Col sm={3}>
            <FormControl type="text" placeholder="semicolon;separated;tags"
              value={this.state.tags} onChange={this.handleChangeTags}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={isFetching}>
              Create
            </Button>
          </Col>
        </FormGroup>
        <Fade in={showAlert}>
          <Alert bsStyle="danger">
            <strong>{alertText}</strong>
          </Alert>
        </Fade>
      </Form>
    );
  }
});

function mapStateToProps(state, ownProps) {
  const { createQB } = state.service;
  const { ifFetching, showAlert, alertText, name: queryUrl } = createQB;

  const urlIsFree = !(alertText === 'URL already in use. Please choose another');

  return { ifFetching, showAlert, alertText, urlIsFree, queryUrl };
}

export default connect(mapStateToProps)(NewBoardForm);
