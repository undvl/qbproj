import NotFound from '../components/NotFound';

import Layout from '../components/Layout';
import Main from './Main';

import PortalContainer from './PortalContainer';

import Board from './Board';
import Rooms from './Rooms';

import JoinPortalReq from './JoinPortalReq';
import Portal from './Portal';
import PortalTheme from './PortalTheme';
import AddTheme from './PortalMain/AddTheme';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

import CreateBoard from './CreateBoard';

import Manage from './Manage';
import MembershipRequests from './Manage/MembershipRequests';
import ManageMembers from './Manage/Members';

// import React from 'react';
// import { Route, IndexRoute } from 'react-router';

// const routes = (
//   <Route path="/" component="Layout">
//     <IndexRoute component="Main" />
//     <Route path="q" component="Board" />
//     <Route path="rm" component="Rooms" />
//     <Route path="q/:qb/pl/" component="Portal" />
//     <Route path="login" component="Login" />
//     <Route path="signup" component="Signup" />
//   </Route>
// );

const routes = {
  path: '/', component: Layout,
  indexRoute: { component: Main },
  childRoutes: [
    { path: 'q/:qb', component: PortalContainer,
      indexRoute: { component: Board },
      childRoutes: [
        { path: 'rm', component: Rooms },
        { path: 'pl', component: Portal },
        { path: 'pl/:themeID', component: PortalTheme },
        { path: 'add_theme/:groupID', component: AddTheme },
        { path: 'join_portal', component: JoinPortalReq },
        { path: 'manage', component: Manage,
          childRoutes: [
            { path: 'memb_requests', component: MembershipRequests },
            { path: 'members', component: ManageMembers }
          ]
        },
        { path: '*', component: NotFound, status: 404 }
      ]
    },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'create_board', component: CreateBoard },
    { path: '*', component: NotFound, status: 404 }
  ]
};

export default routes;
