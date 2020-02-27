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
const axios = require('axios');

app.use(compression());

app.use('/', rootRoute);
app.use('/bdiaz666',require('./routes/bdiaz666'))
app.use('/jason1819', require('./routes/jason1819'));
app.use('/ctam4', require('./routes/ctam4'));

http.createServer(app).listen(httpPort);
https.createServer(httpsOptions, app).listen(httpsPort);
