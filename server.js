const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
require("dotenv").config();
const port = process.env.PORT || 4000;
const cors = require("cors");

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  next();
});

// set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// body parser middleaware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport
// app.use(passport.initialize());
// app.use(passport.session());

// connect DB
mongoose
  .connect(process.env.MONGOURI, {})
  .then(() => console.log("Mongodb connected !!!"))
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  res.send("hello word");
});

// server static asts if in production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server running on ${port}`));
