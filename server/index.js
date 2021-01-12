const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const history = require('connect-history-api-fallback');

require('dotenv').config();

const PORT = process.env.PORT || 8000;
const clientID = process.env.CLIENT_ID;
const clientSecretID = process.env.CLIENT_SECRET_ID;
let frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
let redirectURL = process.env.REDIRECT_URL || 'http://localhost:8000/callback';

if (process.env.node_ENV !== 'production') {
  frontendURL = 'http://localhost:3000';
  redirectURL = 'http://localhost:8000/callback';
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.warn(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`,
    );
  });
} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app
    .use(express.static(path.resolve(__dirname, '../client/build')))
    .use(cors())
    .use(cookieParser())
    .use(
      history({
        verbose: true,
        rewrites: [
          { from: /\/login/, to: '/login' },
          { from: /\/callback/, to: '/callback' },
          { from: /\/refresh_token/, to: '/refresh_token' },
        ],
      }),
    )
    .use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('/', function (req, res) {
    res.render(path.resolve(__dirname, '../client/build/index.html'));
  });

  app.get('/login', function (req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope =
      'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

    res.redirect(
      `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: clientID,
        scope: scope,
        redirect_uri: redirectURL,
        state: state,
      })}`,
    );
  });

  app.get('/callback', function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirectURL,
          grant_type: 'authorization_code',
        },
        headers: {
          Authorization: `Basic ${new Buffer.from(`${clientID}:${clientSecretID}`).toString(
            'base64',
          )}`,
        },
        json: true,
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          const refresh_token = body.refresh_token;

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            `${frontendURL}/#${querystring.stringify({
              access_token,
              refresh_token,
            })}`,
          );
        } else {
          res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
        }
      });
    }
  });

  app.get('/refresh_token', function (req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${new Buffer.from(`${clientID}:${clientSecretID}`).toString(
          'base64',
        )}`,
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({ access_token });
      }
    });
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
  });

  app.listen(PORT, function () {
    console.warn(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}