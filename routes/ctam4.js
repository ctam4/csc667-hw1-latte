const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => res.send('Hello World from ctam4!'));
router.get('/crypto-price', async (req, res) => {
  const params = req.query;
  let status, response;
  // validate params
  if (Object.keys(params).length == 1 && params.hasOwnProperty('symbol')) {
      // continue to call API
      let coin = await axios.get('https://api.coinpaprika.com/v1/coins')
                            .then((res) => {
                              // find coin by symbol, return undefined when not found
                              return res.data.find((element) => element.symbol === params.symbol.toUpperCase());
                            })
                            .catch((e) => {
                              status = 'ERROR';
                              response = 'API error: ' + e;
                            });
      // do if coin is found
      if (coin !== undefined) {
        await axios.get('https://api.coinpaprika.com/v1/coins/' + coin.id + '/ohlcv/latest')
                   .then((res) => {
                     status = 'OK';
                     response = 'USD ' + res.data[0].close;
                   })
                   .catch((e) => {
                     status = 'ERROR';
                     response = 'API error: ' + e;
                   });
      }
      else {
        status = 'ERROR';
        response = 'Invalid symbol.';
      }
  }
  else {
    status = 'ERROR';
    response = 'Invalid params.';
  }
  const returnObject = {
    status: status,
    date: new Date(),
    params: params,
    response: response,
  };
  res.send(returnObject);
});

module.exports = router;
