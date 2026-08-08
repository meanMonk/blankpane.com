/**
 * get-token.js
 * ============================================================
 * ONE-TIME SETUP SCRIPT.
 *
 * WHAT THIS DOES
 * ---------------
 * YouTube's upload API needs OAuth2 (not a plain API key) because
 * uploading is done "on behalf of" your channel. This script:
 *   1. Opens your browser to Google's consent screen.
 *   2. You log in with the Google account that owns your YouTube channel
 *      and click "Allow".
 *   3. Google redirects back to a tiny local server this script starts.
 *   4. We exchange the returned code for an access token + refresh token.
 *   5. We save both to token.json.
 *
 * upload.js then reuses token.json forever (the refresh token doesn't
 * expire unless you revoke access), so you only run this once.
 *
 * HOW TO USE
 * ---------------
 *   1. Copy .env.example -> .env and fill CLIENT_ID / CLIENT_SECRET
 *      (see README.md for where to get these).
 *   2. npm install
 *   3. npm run auth
 *   4. Approve access in the browser window that opens.
 *   5. Confirm token.json was created in this folder. Done.
 *
 * You only need to re-run this if you delete token.json or revoke
 * access at https://myaccount.google.com/permissions
 * ============================================================
 */

import 'dotenv/config';
import { google } from 'googleapis';
import http from 'node:http';
import { URL } from 'node:url';
import fs from 'node:fs';
import open from 'open';

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  console.error(
    '✖ Missing CLIENT_ID / CLIENT_SECRET / REDIRECT_URI.\n' +
    '  Copy .env.example to .env and fill them in first.'
  );
  process.exit(1);
}

// Scope needed to upload videos and manage metadata/playlists.
const SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
];

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // required to get a refresh_token
  prompt: 'consent',      // forces Google to always return a refresh_token
  scope: SCOPES,
});

// Parse the port out of REDIRECT_URI (e.g. http://localhost:3000/oauth2callback)
const redirect = new URL(REDIRECT_URI);
const port = Number(redirect.port || 80);
const callbackPath = redirect.pathname;

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    if (reqUrl.pathname !== callbackPath) {
      res.writeHead(404);
      res.end();
      return;
    }

    const code = reqUrl.searchParams.get('code');
    const error = reqUrl.searchParams.get('error');

    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`<h2>Authorization failed: ${error}</h2>You can close this tab.`);
      server.close();
      console.error('✖ Authorization denied:', error);
      process.exit(1);
    }

    const { tokens } = await oauth2Client.getToken(code);
    fs.writeFileSync('token.json', JSON.stringify(tokens, null, 2));

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h2>✅ Authorized. You can close this tab and return to the terminal.</h2>');
    server.close();

    console.log('✔ Saved token.json — you can now run "npm run upload".');
    process.exit(0);
  } catch (err) {
    console.error('✖ Error exchanging code for token:', err.message);
    res.writeHead(500);
    res.end('Something went wrong. Check the terminal.');
    server.close();
    process.exit(1);
  }
});

server.listen(port, () => {
  console.log(`Listening for the OAuth redirect on ${REDIRECT_URI} ...`);
  console.log('Opening browser for Google sign-in...\n');
  open(authUrl);
});
