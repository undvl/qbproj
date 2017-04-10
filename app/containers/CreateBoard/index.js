import React from 'react';
import DocumentTitle from 'react-document-title';

import NewBoardForm from './NewBoardForm';

const CreateBoard = () => (
  <DocumentTitle title='Create Board'>
    <div>
      <NewBoardForm />
    </div>
  </DocumentTitle>
);

export default CreateBoard;
