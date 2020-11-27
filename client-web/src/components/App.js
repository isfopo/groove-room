import React, {useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';

import { Home } from './Home.js'
import { RedirectPage } from './RedirectPage.js';
import { AddRoom } from './AddRoom.js';
import { JoinRoom } from './JoinRoom.js';
import { LogOut } from './LogOut.js';

function App() {

  return (
    <div className="main">
      <CookiesProvider>
        <BrowserRouter>
          <Route path="/redirect" component={ RedirectPage } />
          <Route path="/add-room" component={ AddRoom } />
          <Route path="/join-room" component={ JoinRoom } />
          <Route path="/log-out" component={ LogOut } />
          <Route exact path="/" component={ Home } />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
