import React from 'react';
import { Link } from 'react-router';

const LinksPanel = ({ params }) => (
  <div>
    <hr />
    <Link to={`/q/${params.qb}`}>Main</Link>{' '}
    <Link to={'/login'}>Login</Link>{' '}
    <Link to={`/q/${params.qb}/pl`}>Portal</Link>{' '}
    <Link to={'/'}>QB</Link>{' '}
    <Link to={'/q/qb1/pl'}>qb1/pl</Link>{' '}
    <Link to={'/q/qb2/pl'}>qb2/pl</Link>{' '}
    <Link to={'/q/qb2/pl/58101916334f9b64e3e81d9a'}>qb2/Th1</Link>{' '}
    <Link to={'/q/qb2/pl/581016bd334f9b64e3e81d98'}>qb2/Th2</Link>
  </div>
);

LinksPanel.propTypes = {
  params: React.PropTypes.object
};

export default LinksPanel;
