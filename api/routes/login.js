const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const request = require('request');
const querystring = require('querystring');
const encodeFormData = require('../helperFunctions/encodeFormData.js');

const { client_id, client_secret } = require('../api-keys.js');


const redirect_uri = process.env.REDIRECT_URI || 
                    'http://localhost:3001/callback';

var app = express();

router.get('/authorize', async (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID || client_id,
      response_type: 'code',
      redirect_uri: process.env.REDIRECT_URI || 'http://localhost:3001/login/callback',
      scope: 'streaming user-read-playback-position user-read-email',
      show_dialog: 'true'
    }))
})

router.get('/callback', async (req, res) => {
  let body = {
    grant_type: "authorization_code",
    code: req.query.code,
    redirect_uri: process.env.REDIRECT_URI || 'http://localhost:3001/login/callback',
    client_id: process.env.SPOTIFY_CLIENT_ID || client_id,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET || client_secret,
  }
  
  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body: encodeFormData(body)
  })
    .then(resp => resp.json())
    .then( data => {
      res.json(data);
    })
})

router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

module.exports = router;