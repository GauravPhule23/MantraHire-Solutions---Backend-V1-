const express = require("express");
const {applicantRegister} = require("../Controllers/Auth");
const upload = require("../Midelware/multerUpload");

const router = express.Router();


router.post("/applicantRegister",upload.single("resume"),applicantRegister);

module.exports = router;