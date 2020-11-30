import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import { Home } from './Home.js'
import { RedirectPage } from './RedirectPage.js';
import { AddRoom } from './AddRoom.js';
import { JoinRoom } from './JoinRoom.js';

import { LogOut } from './LogOut.js';

import { Invite } from './Invite.js';
import { Rename } from './Rename.js';
import { Leave } from './Leave.js';
import { Remove } from './Remove.js';

export const App = () => {
  return (
    <div className="main">
      <CookiesProvider>
        <BrowserRouter>
          <Route path="/redirect" component={ RedirectPage } />
          <Route path="/add-room" component={ AddRoom } />
          <Route path="/join-room" component={ JoinRoom } />
          <Route path="/log-out" component={ LogOut } />
          <Route path="/invite/:room" component={ Invite } />
          <Route path="/rename/:room" component={ Rename } />
          <Route path="/leave/:room" component={ Leave } />
          <Route path="/remove/:room" component={ Remove } />
          <Route exact path="/" component={ Home } />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}
