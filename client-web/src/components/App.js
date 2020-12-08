import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './Home.js'
import { RedirectPage } from './RedirectPage.js';
import { AddRoom } from './AddRoom.js';
import { JoinRoom } from './JoinRoom.js';
import { AddTrack } from './AddTrack.js';

import { LogOut } from './LogOut.js';

import { Invite } from './Invite.js';
import { Rename } from './Rename.js';
import { Leave } from './Leave.js';
import { Remove } from './Remove.js';

const SpotifyWebApi = require('spotify-web-api-js');

export const App = () => {

  const spotifyApi = new SpotifyWebApi();

  const [spotifyAuth, setSpotifyAuth] = useState({})
  const [user, setUser] = useState({})

  const handleSetSpotifyAuth = (auth) => {
    setSpotifyAuth(auth);

    spotifyApi.setAccessToken(auth.access_token);
    spotifyApi.getMe()
        .then( async (data) => {
            fetch('http://localhost:3001/users', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => setUser(res[0]))
        })
  }

  return (
    <div className="main">
      <BrowserRouter>
        <Route path="/redirect"        render={ (props) => <RedirectPage {...props} setSpotifyAuth={handleSetSpotifyAuth} /> } />

        <Route path="/add-room"        render={ (props) => <AddRoom      {...props} user={user} auth={spotifyAuth} /> } />

        <Route path="/join-room"       render={ (props) => <JoinRoom     {...props} user={user} auth={spotifyAuth} /> } />

        <Route path="/add-track"       render={ (props) => <AddTrack     {...props} user={user} auth={spotifyAuth} /> } />

        <Route path="/log-out"         render={ (props) => <LogOut       {...props} user={user} auth={spotifyAuth} /> } />

        <Route path="/invite"          render={ (props) => <Invite       {...props} user={user} auth={spotifyAuth} /> } />

        <Route path="/rename"          render={ (props) => <Rename       {...props} user={user} auth={spotifyAuth} /> } />

        <Route path="/leave"           render={ (props) => <Leave        {...props} user={user} auth={spotifyAuth} /> } />

        <Route path="/remove"          render={ (props) => <Remove       {...props} user={user} auth={spotifyAuth} /> } />

        <Route exact path="/"          render={ (props) => <Home         {...props} user={user} auth={spotifyAuth} /> } />

      </BrowserRouter>
    </div>
  );
}
