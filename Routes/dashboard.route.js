const express = require("express");
const showAllApplicant = require("../Controllers/dashboard.controller.js");
const allowAdmin = require("../Middlewares/authorizedAdmin.middleware.js");

const router = express.Router();


router.get("/show",showAllApplicant);

module.exports = router;
