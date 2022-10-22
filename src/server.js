/* eslint-disable vars-on-top */
require("dotenv").config();
var app = require("./app");
var https = require("https");
var fs = require("fs");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

let APP_PORT = process.env.APP_PORT || 5000;

// Set SSL Certificates
let SSL_CRT_FILE = process.env.SSL_CRT_FILE || "./src/ssl/server-cert.pem";
let SSL_KEY_FILE = process.env.SSL_KEY_FILE || "./src/ssl/server-key.pem";
let httpsOptions = {
  cert: fs.readFileSync(SSL_CRT_FILE),
  key: fs.readFileSync(SSL_KEY_FILE),
};
let server = https.createServer(httpsOptions, app);

// starting the server
server.listen(APP_PORT, () => {
  console.log(
    "App started successfully " +
    APP_PORT
  );
});
