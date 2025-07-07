const mongoose = require("mongoose");


// name
// email
// phone
// job\internship
// wfh\in-office
// resume
// work profile interested in

const applicantScheema = new  mongoose.Schema({
  fullName : {type:String, required:true},
  email : {type:String, required:true, unique:true },
  phone : {type:String, required : true},
  jobType : {type:String, required:true, enum:["Job","Internship","Both"], default:"Both"},
  locationType : {type:String, required:true, enum:["WFH","In-office", "Both"], default:"Both"},
  resume : {type:String, required:true},
  workProfile : {type:String, required:true}
})

const Applicant = mongoose.model("Applicant",applicantScheema);

module.exports = Applicant;