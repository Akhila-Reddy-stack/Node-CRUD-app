var express = require("express");
var router = express.Router();

var authRoutes = require("./auth");
var facilityRoutes = require("./facilities");
var commonHelpers  = require("../helpers/helpers");

router.get("/", async (req, res) => {
  return commonHelpers.generateApiResponse(
      res,
      req,
      "App is working.",
      200
  );
});

router.use("/auth", authRoutes);
router.use("/users", facilityRoutes);

module.exports = router;
