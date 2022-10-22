var express = require("express");
var router = express.Router();
var { check, validationResult } = require("express-validator");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var moment = require("moment");
var jwtOptions = require("../config/jwtConfig");
var helpers = require("../helpers/helpers");
var Models = require("../models");

router.post(
  "/login",
  [
    check("username", "Username is invalid.").not().isEmpty(),
    check("password", "Password should be minimum of 5 characters.")
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
  ],
  (req, res, next) => {
    // eslint-disable-next-line consistent-return
    passport.authenticate("login", (err, users, info) => {
      if (err) {
        return helpers.generateApiResponse(res, req, err, 401, []);
      }
      if (info !== undefined) {
        if (info.message === "bad username") {
          return helpers.generateApiResponse(res, req, info.message, 401, []);
        }
        return helpers.generateApiResponse(res, req, info.message, 403, []);
      }
      req.logIn(users, () => {
        Models.User.findOne({
          where: {
            username: req.body.username,
          },
        }).then((user) => {
          if (user.status != 1) {
            return helpers.generateApiResponse(
              res,
              req,
              "User is inactive.",
              401,
              []
            );
          }

          const jwtData = {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
          };
          const token = jwt.sign(jwtData, jwtOptions.secret, {
            expiresIn: jwtOptions.expiresIn,
          });
          const jwtToken = Models.JwtToken.create(
            {
              token: token,
              created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              updated_at: null,
              deleted_at: null,
              status: "1",
            },
            {
              returning: true,
              plain: true,
            }
          );

          if (jwtToken === null) {
            return helpers.generateApiResponse(
              res,
              req,
              "Login failed while generating token.",
              400,
              []
            );
          }
          return helpers.generateApiResponse(
            res,
            req,
            "Login successful.",
            200,
            {
              auth: true,
              uid: user.id,
              utype: user.role,
              token,
            }
          );
        });
      });
    })(req, res, next);
  }
);

module.exports = router;
