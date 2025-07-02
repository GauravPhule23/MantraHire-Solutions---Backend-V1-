const Applicant = require("../Models/applicant.model");
const apiError = require("../Services/apiError");
const apiResponse = require("../Services/apiResponse");
const supabaseUrl = require("../Services/supabase")

async function applicantRegister(req, res) {
  try {
    const { fullName, email, phone, jobType, location, domain } = req.body;
    for (let [key, value] of Object.entries({ fullName, email, phone, jobType, location, domain })) if (!value) return res.status(400).json(new apiError(400, `${key} not available`, `${key} not available`));
    const user = await Applicant.findOne({ email });
    if (user) {
      res.status(400).json(new apiError(400, "Applicant email already exists", "Applicant email already exists"))
      return
    }
    if (!req.file) {
      res.status(400).json(new apiError(400, "please submit resume", "please submit resume"));
      return
    }
    // const resumeLocalPath = req.file?.path;
    const resume = await supabaseUrl(req.file, fullName);
    console.log(fullName +
      email +
      phone +
      jobType +
      location +
      domain +
      resume)

    const newApplicant = await Applicant.create({
      fullName,
      email,
      phone,
      jobType,
      location,
      domain,
      resume
    })
    console.log("after create")
     res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Application submitted",
      data: newApplicant
    });
    return
  } catch (e) {
    console.log(e)
    res.status(500).json(new apiError(e.statusCode, "error", e.errors));
    return
  }
};

module.exports = { applicantRegister };