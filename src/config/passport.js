/* eslint-disable consistent-return */
var bcrypt = require("bcrypt");
var jwtSecret = require("./jwtConfig");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var JWTstrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;
var User = require("../models").User;

const BCRYPT_SALT_ROUNDS = 12;

// passport local strategy to register
passport.use(
  "register",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
      session: false,
    },
    (req, username, password, done) => {
      try {
        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to login already exists
        User.findOne({
          where: { username: req.body.username },
        }).then((user) => {
          if (user != null) {
            // check to see if theres already a user with that username
            return done(null, false, {
              message: "Username already exists.",
            });
          }
          // if there is no user with that email
          // create the new user
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
            User.create({
              password: hashedPassword,
              username: req.body.username,
            }).then((user1) => {
              return done(null, user1); // saves the user
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport local strategy for login
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        // checks the username
        User.findOne({
          where: {
            username,
          },
        }).then((user) => {
          if (user === null) {
            return done(null, false, { message: "Invalid username." }); // user not found
          }
          bcrypt.compare(password, user.password).then((response) => {
            if (response !== true) {
              return done(null, false, { message: "Invalid credentials." }); //  Username and password are not valid
            }
            return done(null, user); // User logged in
          });
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
  secretOrKey: jwtSecret.secret,
  issuer: jwtSecret.issuer,
  audience: jwtSecret.audiance,
};

/**
 * middleware for checking authorization with jwt
 */
passport.use(
  "jwt",
  new JWTstrategy(opts, (jwtPayload, done) => {
    try {
      // this callback is invoked only when jwt token is correctly decoded
      User.findOne({
        where: {
          id: jwtPayload.id,
        },
      }).then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
