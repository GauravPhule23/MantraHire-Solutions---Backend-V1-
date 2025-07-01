const express = require("express");
const {applicantRegister} = require("../Controllers/applicant.controller.js");
const upload = require("../Midelware/multerUpload");

const router = express.Router();


router.post("/applicantRegister",upload.single("resume"),applicantRegister);

module.exports = router;