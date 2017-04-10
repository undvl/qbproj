import React, { PropTypes } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import Markdown from 'react-markdown';

const ProseMirror = typeof window !== 'undefined' ? require('react-prosemirror').default : () => <div />;

if (typeof window !== 'undefined') {
  require('prosemirror/dist/inputrules/autoinput');
  require('prosemirror/dist/menu/menubar');
  require('prosemirror/dist/menu/menu');
  require('prosemirror/dist/markdown');
}

import { connect } from 'react-redux';

import { processCommentsReq, processCommentsAdd } from '../actions/portalComments';

const Comments = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    themeID: PropTypes.string,
    comments: PropTypes.object
  },
  getInitialState() {
    return {
      activeAddComment: '',
      newComment: ''
    };
  },
  componentWillMount() {
    if (!this.props.comments) this.handleRefresh();
  },
  componentDidUpdate() {
    if (!(this.props.themeID === this.props.comments.themeID)) this.handleRefresh();
  },
  handleRefresh() {
    if (typeof (Storage) !== 'undefined') {
      this.props.dispatch(processCommentsReq(this.props.themeID));
    }
  },
  handleAddComment(elemAddr) {
    const { themeID } = this.props;

    this.props.dispatch(processCommentsAdd({ themeID, elemAddr, text: this.state.newComment }));
  },
  handleOpenAddComment(elemAddr) {
    this.setState({ activeAddComment: (typeof elemAddr !== 'undefined' ? elemAddr : 'root'), newComment: '' });
  },
  handleChangeNewComment(value) {
    this.setState({ newComment: value });
  },
  render() {
    const { comments } = this.props;
    const { activeAddComment } = this.state;
    const tooltip = <Tooltip id="tooltip">Reply</Tooltip>;
    const rthis = this;

    function parseComments(c) {
      const jsx = [];

      if (c.length > 0) {
        c.forEach((comment, i) => {
          jsx.push((
            <div className={`${comment.isAuthor ? 'authorComment' : ''} margin-left-30px`} key={comment.elemAddr}>
              <p>{comment.user} {new Date(comment.date).toLocaleString()}{' '}
                {activeAddComment !== comment.elemAddr &&
                  <OverlayTrigger overlay={tooltip} placement="right"
                    delayShow={300} delayHide={150}
                  >
                    <Button bsSize="xsmall" onClick={() => rthis.handleOpenAddComment(comment.elemAddr)}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </OverlayTrigger>
                }
              </p>
              <Markdown source={comment.text} />
              {comment.comments && parseComments(comment.comments)}
              {activeAddComment === comment.elemAddr &&
                <div>
                  <ProseMirror value={rthis.state.newComment} onChange={rthis.handleChangeNewComment}
                    options={{ menuBar: true, autoInput: true, docFormat: 'html' }}
                  />
                  <Button bsSize="small" onClick={() => rthis.handleAddComment(comment.elemAddr)}>Submit</Button>
                  <Button bsSize="small" onClick={() => rthis.handleOpenAddComment('')}>Back</Button>
                </div>
              }
            </div>
          ));
        });
      }
      return jsx;
    }

    return (
      <div>
        <h2>Comments</h2>
        {comments && parseComments(comments.comments)}
        {activeAddComment !== 'root' ?
          <Button bsSize="small" onClick={() => this.handleOpenAddComment()}>
            <Glyphicon glyph="plus" /> Add comment
          </Button>
        :
          <div>
            <ProseMirror value={rthis.state.newComment} onChange={rthis.handleChangeNewComment}
              options={{ menuBar: true, autoInput: true, docFormat: 'html' }}
            />
            <Button bsSize="small" onClick={() => rthis.handleAddComment()}>Submit</Button>
            <Button bsSize="small" onClick={() => rthis.handleOpenAddComment('')}>Back</Button>
          </div>
        }
      </div>
    );
  }

});

function mapStateToProps(state, ownProps) {
  const { portal } = state;
  const { comments } = portal;

  if (ownProps.themeID === comments.themeID) {
    return { comments };
  }
  return {};
}

export default connect(mapStateToProps)(Comments);
