const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

require("@babel/polyfill");

// dotenv
dotenv.config();

// passport
const passport = require("passport");
require("./app/config/passport").config(passport);

const app = express();

// logger
app.use(logger("dev"));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// initialize passport with express
app.use(passport.initialize());

module.exports = app;
