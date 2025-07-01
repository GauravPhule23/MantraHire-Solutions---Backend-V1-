const Applicant = require("../Models/applicant.model");
const apiError = require("../Services/apiError");
const apiResponse = require("../Services/apiResponse");
const supabaseUrl = require("../Services/supabase")

async function applicantRegister(req,res){
  try{
    const {fullName, email, phone, jobType, location, domain} = req.body;
    for (let [key, value] of Object.entries({fullName, email, phone, jobType, location, domain})) if (!value) return res.status(400).json(new apiError(400,`${key} not available`,`${key} not available`));
    const resumeLocalPath = req.file?.path;
    const resume = supabaseUrl(resumeLocalPath);

    const newApplicant = await Applicant.create({
      fullName,
      email,
      phone,
      jobType,
      location,
      domain,
      resume
    })
    res.status(201).json(new apiResponse(201,"Application submitted",await Applicant.findById(newApplicant._id).select("-password -salt")));
  }catch(e){
    res.status(500).json(new apiError(500,"Internal Server Error",e.message));
  }
};

module.exports = applicantRegister;