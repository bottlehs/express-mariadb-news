const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

// dotenv
dotenv.config();

// passport
const passport = require("passport");
require("./app/config/passport").config(passport);

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

// logger
app.use(logger("dev"));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// public
app.use(express.static(path.join(__dirname, "../frontend/build")));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => console.log("User table created successfully"))
  .catch((err) =>
    console.log("oooh, did you enter wrong database credentials?")
  );
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.render("index");
});

require("./app/routes/users.routes")(app);
require("./app/routes/inquires.routes")(app);
require("./app/routes/oauth.routes")(app);
require("./app/routes/faqs.routes")(app);
require("./app/routes/posts.routes")(app);
require("./app/routes/comments.routes")(app);

// swagger
const swaggerUi = require("swagger-ui-express");
const specs = require("./app/config/swagger");
console.log(specs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs.default));

// initialize passport with express
app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
