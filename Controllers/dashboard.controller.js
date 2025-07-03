const Applicant = require("../Models/applicant.model.js");
const apiError = require("../Services/apiError");
const apiResponse = require("../Services/apiResponse.js")

async function showAllApplicant(req,res){
  try {
    const data = await Applicant.find({});
    res.status(200).json(new apiResponse(200,data))
  } catch (e) {
    res.status(e.statusCode||500).json(new apiError(500,"Internal error",e.errors));
  }

  
}

module.exports = showAllApplicant