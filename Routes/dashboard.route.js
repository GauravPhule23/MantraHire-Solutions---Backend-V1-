const express = require("express");
const {showAllApplicant} = require("../Controllers/Auth");

const router = express.Router();


router.post("/show",showAllApplicant);

module.exports = router;