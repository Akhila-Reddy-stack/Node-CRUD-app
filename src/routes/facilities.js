/* eslint-disable eqeqeq */
var express = require("express");
var router = express.Router();
var passport = require("passport");
var moment = require("moment");

var Models = require("../models");
var helpers = require("../helpers/helpers");

router.get("/list", async (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    if (err) {
      return helpers.generateApiResponse(res, req, err, 401, []);
    }
    if (info !== undefined) {
      return helpers.generateApiResponse(res, req, info.message, 401, []);
    }
    const userId = parseInt(req.body.user_id, 10);

    if (user.id === userId) {
      const allFacilities = await Models.Facility.findAndCountAll();
      if (allFacilities != null) {
        const data = {
          count: allFacilities.count,
          rows: allFacilities.rows,
        };
        return helpers.generateApiResponse(res, req, "Users found.", 200, data);
      }
      return helpers.generateApiResponse(res, req, "No data found.", 404, []);
    }
    helpers.logError("user_id & jwt token do not match.");
    return helpers.generateApiResponse(
      res,
      req,
      "Invalid access token.",
      401,
      []
    );
  })(req, res, next);
});

router.post("/add", async (req, res, next) => {
  const { name, age, city, email, phone, qualification } = req.body;
  if (
    name === "" ||
    age === "" ||
    city === "" ||
    email === "" ||
    phone === "" ||
    qualification === ""
  ) {
    return helpers.generateApiResponse(
      res,
      req,
      "Please fill all required fields.",
      400,
      []
    );
  }
  const userCreate = await Models.Facility.create({
    name: name,
    age: age,
    city: city,
    email: email,
    phone: phone,
    qualification: qualification,
    created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  });
  if (userCreate != null) {
    return helpers.generateApiResponse(
      res,
      req,
      "User created successfully.",
      200,
      [{ id: userCreate.id }]
    );
  }
  return helpers.generateApiResponse(
    res,
    req,
    "Something went wrong while creating new user.",
    400,
    []
  );
});

module.exports = router;
