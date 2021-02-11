const express = require("express");
const app = express();
const fetch = require("node-fetch");
const port = 9000;
const NodeGeocoder = require("node-geocoder");
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

var geocoder = NodeGeocoder({
  provider: "opencage",
  apiKey: "7a7d1412f93145519bf811edd9b309e4",
});

app.get("/location", (req, res) => {
  const API_KEY = "7a7d1412f93145519bf811edd9b309e4";
  geocoder
    .geocode("550 goldstream ave, victoria, bc")
    .then((res) => {
      //   let latitude = res.;
      //   let longitude = res.longitude;

      console.log(latitutde);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/search", (req, res) => {
  const APIkey = "15d0721c55aae0f6cc951f85b5eb72fc";
  const lat = "48.428421";
  const lon = "-123.365646";
  const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;

  fetch(
    url
    // "http://api.openweathermap.org/data/2.5/onecall?lat=48.428421&lon=-123.365646&units=metric&appid=15d0721c55aae0f6cc951f85b5eb72fc"
  )
    .then((res) => res.json())
    .then((data) => {
      let current = data.current;
      let currentTemp = JSON.parse(current.temp);
      //   res.send({ data});
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
