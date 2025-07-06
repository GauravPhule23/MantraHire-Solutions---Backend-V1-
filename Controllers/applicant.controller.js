const Applicant = require("../Models/applicant.model");
const apiError = require("../Services/apiError");
const apiResponse = require("../Services/apiResponse");
const supabaseUrl = require("../Services/supabase")

async function applicantRegister(req, res) {
  try {
    const { name, email, phone, jobType, locationType, workProfile } = req.body;
    for (let [key, value] of Object.entries({ name, email, phone, jobType, locationType, workProfile })) if (!value) return res.status(400).json(new apiError(400, `${key} not available`, `${key} not available`));
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


    const newApplicant = await Applicant.create({
      fullName:name,
      email,
      phone,
      jobType,
      locationType,
      workProfile,
      resume
    })
    
     res.status(201).json(new apiResponse(201,newApplicant));
    
    return
  } catch (e) {
    
    res.status(500).json(new apiError(e.statusCode, "error", e.errors));
    return
  }
};

module.exports = { applicantRegister };