import React from 'react';
import DocumentTitle from 'react-document-title';

// class Main extends React.Component {
//   render() {
//     return (
//       <div>
//         <p>Main content</p>
//         <p>text content</p>
//       </div>
//     );
//   }
// }

const Main = () => (
  <DocumentTitle title='Main'>
    <div>
      <p>Main content</p>
      <p>text content</p>
    </div>
  </DocumentTitle>
);

export default Main;
