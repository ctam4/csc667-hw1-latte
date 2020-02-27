const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => res.send('Hello World from jason1819!'));
//create a endpoint team_name
router.get('/team_name', async (req, res) => {
    const params = req.query;
    console.log(params);   //just for test

    let status, response;
  // check the  params
if (Object.keys(params).length == 1 && params.hasOwnProperty('city')) {
      // call API using axios
  let team = await axios.get('https://www.balldontlie.io/api/v1/teams')
        .then((res) => {
            // find the team by the key city, return undefined if fail to find
            return res.data.data.find((element) => element.city === params.city);
          })
        .catch((e) => {
              status = 'ERROR';
              response = 'API error: ' + e;
        });
      
      if (team !== undefined) {
          await axios.get('https://www.balldontlie.io/api/v1/teams/' + team.id ) 
              .then((res) => {
                   status = 'OK';
                   response = 'team name: ' +  res.data.full_name       // respond the value full name                    
              })
              .catch((e) => {
                  status = 'ERROR';
                  response = 'API error: ' + e;
              });
      }
      else {
        status = 'ERROR';
        response = 'Invalid city.';
      }
  }
  else {
    status = 'ERROR';
    response = 'Invalid params.';
  }
  const responseObject = {
    status: status,
    date: new Date(),
    params: params,
    response: response,
  };
  res.send(responseObject);
});

module.exports = router;







