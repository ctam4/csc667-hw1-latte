const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();
const httpPort = 80;
const httpsPort = 443;
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};
const compression = require('compression');
const rootRoute = require('./routes/root.js');

app.use(compression());

app.use('/', rootRoute);

http.createServer(app).listen(httpPort);
https.createServer(httpsOptions, app).listen(httpsPort);
