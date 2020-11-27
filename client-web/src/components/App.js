import React, {useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';
import { Home } from './Home.js'
import {RedirectPage} from './RedirectPage.js';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['authorization-cookie']);

  return (
    <div className="main">
      <CookiesProvider>
        <BrowserRouter>
          <Route path="/redirect" component={ RedirectPage } />
          <Route exact path="/"><Home /></Route>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
