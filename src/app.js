const hbs = require("hbs");
const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "An@nD",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "get help quick",
    title: "Help page",
    creator: "An@nD",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "search text missing",
    });
  }

  forecast(req.query.address, (error, data) => {
    if (error) {
      res.send({
        error,
      });
    }
    res.send({
      location: data.location,
      temperature: data.temperature,
      condition: data.condition,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "search term was missing",
    });
  }
  res.send({
    products: [],
  });
  console.log(req.query);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error page",
    errorMessage: "404, Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error page",
    errorMessage: "404 Not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
