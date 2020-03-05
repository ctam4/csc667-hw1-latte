const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => res.send("Hello from bdiaz666!"));
router.get("/weather", async (req, res) => {
  const params = req.query;
  let status, response;
  let data;

  if (
    Object.keys(params).length == 1 &&
    params.hasOwnProperty("city") &&
    params.city != ""
  ) {
    let weather = await axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          params.city +
          ",USA&appid=32a932ca5d7b679be8de6648fa3d50c4&units=imperial"
      )
      .then(res => {
        status = "OK";
        data = res.data.main.temp;
      })
      .catch(e => {
        status = "Error";
        data = "API error " + e;
      });
    const returnObject = {
      status: status,
      date: new Date(),
      params: params,
      response: data
    };
    res.send(returnObject);
  } else {
    const returnObject = {
      status: "Error",
      date: new Date(),
      params: "NULL",
      response: "No city value entered"
    };
    res.send(returnObject);
  }
});

module.exports = router;
