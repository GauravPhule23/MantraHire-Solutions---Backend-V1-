const Admin = require("../Models/admin.model.js");
const apiError = require("../Services/apiError.js");
const apiResponse = require("../Services/apiResponse.js");

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function SignUp(req, res) {
  try {
    console.log("entered signup")
    const { email, password, role } = req.body;
    console.log("bfr role check")
    if (role != "Admin") {
      res.status(400).json(new apiError(400, "No signup for applicants presently", "No signup for applicants presently"))
      return
    }
    console.log("bfr email valid")
    if (!isValidEmail(email)) {
      res.status(400).json(400, "email not valid", "email not valid");
      return
    }
    console.log("bfr count")
    if(!(process.env.MAX_ADMIN_COUNT > await Admin.countDocuments())){
      res.status(400).json(new apiError(400,"Admin count overflow","Admin count overflow"));
      return
    }
    console.log("bfr creation")
    const newAdmin = await Admin.create({
      email,
      password,
      role
    })
    const data = await Admin.findById(newAdmin._id).select("-password -salt");
    res.status(201).json(new apiResponse(201,data));
    return
  } catch (e) {
    res.status(500).json(new apiError(500,"Internal Server Error",e))
  }
}


async function Login(req,res){
  try{
    const {email,password} = req.body;
    if(!isValidEmail(email)){
      res.status(400).json(400, "email not valid", "email not valid");
      return
    }
    const token = await Admin.checkTokenForAdmin(email,password);
    
      res.status(200).json(new apiResponse(200,token))
    

  }catch(e){
    res.status(e.statusCode||500).json(new apiError(e.statusCode,e.message,e.errors));
    return
  }
}

async function Logout(req,res){
  res.status(200).clearCookie("token").json(new apiResponse(200,"Logged out"));
}

module.exports = {
  SignUp,
  Login,
  Logout
}