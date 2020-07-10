const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000
// Defined the path for our views
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Defined our view engine with handlebars and the path to the views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Defined our public folder for static assets
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index.hbs", {
    title: "Weather App",
    name: "Dave Enriquez"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Dave Enriquez",
    title: "About Me"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg:
      "You have reached the help page. Please email me for all your life advice. :)",
    title: "Help Page",
    name: "Dave A. Enriquez"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address. Please try again."
    });
  }

  geoCode(req.query.address, (error, data) => {
    if (error) {
      return res.send({error});
    }
    forecast(data.latitude, data.longitude, (error, response) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forecast: response.forecast,
        address: req.query.address,
        location: data.location,
        time_of_day: response.time_of_day
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query);

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article",
    name: "Dave Enriquez"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Dave Enriquez",
    title: "Page"
  });
});

app.listen(port, () => {
  console.log("Server started on " + port);
});
