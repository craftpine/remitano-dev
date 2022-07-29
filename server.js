const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
require("dotenv").config();
const port = process.env.PORT || 4000;
const cors = require("cors");

const user = require("./routes/User");
const sharedLink = require("./routes/SharedLink");

const app = express();

// body parser middleaware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect DB
mongoose
  .connect(process.env.MONGOURI, {})
  .then(() => console.log("Mongodb connected !!!"))
  .catch((err) => console.log(err));

// passport
app.use(passport.initialize());
app.use(passport.session());

// passport config
require("./config/passport")(passport);

// set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  next();
});

// routes
app.use("/api/user", user);
app.use("/api/link", sharedLink);

// server static asts if in production
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on ${port}`));
