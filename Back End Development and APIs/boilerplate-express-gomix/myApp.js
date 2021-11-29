require("dotenv").config();
const bodyParser = require("body-parser");
var express = require("express");
var app = express();

// Challenge 1 - log into the console
console.log("Hello World");

// Challenge 2 - start a working express server
// Sending Hello Express
// app.get("/", (req, res) => res.send("Hello Express"));

// Challenge 11 - Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ enxtended: "false" }));

// Challenge 7 - implement root level request middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Challenge 3 - serve an HTML file
// Open index page on "/" route
const indexPath = __dirname + "/views/index.html";
app.get("/", (req, res) => res.sendFile(indexPath));

// Challenge 4 - Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

// Challenge 5 - serve json
/* app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
}); */

// Challenge 6 - create and edit .env variable
app.get("/json", (req, res) =>
  res.json(
    process.env.MESSAGE_STYLE === "uppercase"
      ? { message: "HELLO JSON" }
      : { message: "Hello json" }
  )
);

// Challenge 8 - Chain Middleware to Create a Time Server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// Challenge 9 - Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

// Challenge 10 - Get Query Parameter Input from the Client
// Challenge 12 - Get Data from POST Requests
app
  .route("/name")
  .get((req, res) => {
    let { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
  })
  .post((req, res) => {
    let { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });

module.exports = app;
