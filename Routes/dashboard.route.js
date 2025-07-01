const express = require("express");
const {showAllApplicant} = require("../Controllers/dashboard.controller.js");

const router = express.Router();


router.post("/show",showAllApplicant);

module.exports = router;