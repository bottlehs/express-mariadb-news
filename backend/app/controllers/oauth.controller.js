const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const Crypto = require("../utils/crypto");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const oauth = {
    email: Crypto.cryptoAesDecrypt(req.body.email),
    password: Crypto.cryptoAesDecrypt(req.body.password),
  };

  User.findOne({ where: { email: oauth.email } })
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(401).json({ message: "No such user found" });
      }
      if (data.password === oauth.password) {
        // from now on we'll identify the user by the id and the id is the
        // only personalized value that goes into our token
        let token = jwt.sign(
          {
            id: data.id,
            email: data.email,
            role: data.role,
          },
          "wowwow" /*jwtOptions.secretOrKey*/,
          { expiresIn: 10000 }
        );
        let refreshToken = randtoken.uid(256);
        let refreshTokens = {};
        refreshTokens[refreshToken] = data.email;
        res.json({ token: token, refreshToken: refreshToken });
      } else {
        res.status(401).json({ msg: "Password is incorrect" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
