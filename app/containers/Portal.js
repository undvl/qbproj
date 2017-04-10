import React from 'react';
import PortalMain from './PortalMain';
import DocumentTitle from 'react-document-title';

const Portal = ({ params }) => (
  <DocumentTitle title='Portal'>
    <div>
      <PortalMain params={params} />
    </div>
  </DocumentTitle>
);

Portal.propTypes = {
  params: React.PropTypes.object
};

export default Portal;
