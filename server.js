const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const { urlencoded } = require("body-parser");

app.use(urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "f4b52c0dc3b031d7a293c3f421a40bbf";
  const cityName = req.body.cityName;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const temperature = JSON.parse(data).main.temp;
      const description = JSON.parse(data).weather[0].description;
      const icon = JSON.parse(data).weather[0].icon;

      res.write("<body style='text-align: center'>");
      res.write(
        "<h1 style='padding-top: 3rem'> Temperature in " +
          cityName +
          " is " +
          temperature +
          " Degree Celcius</h1>"
      );
      res.write("<h1> Weather is " + description + "</h1>");
      res.write(
        "<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'> "
      );
      res.write("<form action='/' method='post'>");
      res.write("<h3 style='padding-top: 10rem'>Enter City Name</h3>");
      res.write(
        "<input type='text' name='cityName' placeholder='City Name' />"
      );
      res.write("<button type='submit'>Go</button>");
      res.write("</form>");

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
