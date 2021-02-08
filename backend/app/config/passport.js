const passportJWT = require("passport-jwt");
const db = require("../models");
const User = db.users;

exports.config = (passport) => {
  let ExtractJwt = passportJWT.ExtractJwt;
  let JwtStrategy = passportJWT.Strategy;

  let jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = "wowwow";

  // lets create our strategy for web token
  let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
    //If the token has expiration, raise unauthorized
    var expirationDate = new Date(jwt_payload.exp * 10000);
    if (expirationDate < new Date()) {
      return done(null, false);
    } else {
      User.findByPk(jwt_payload.id)
        .then((data) => {
          console.log(data);
          return done(null, data);
        })
        .catch((err) => {
          return done(null, false);
        });
    }
  });
  // use the strategy
  passport.use(strategy);
};
