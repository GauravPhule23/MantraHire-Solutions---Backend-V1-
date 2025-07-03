const apiError = require("../Services/apiError");

function allowAdmin(){
  return function(req,res,next){
  if(!req.user){
    res.status(400).json(new apiError(400,"please login to access","please login to access"));
  }
  if(req.user.role != "Admin"){
    res.status(401).json(new apiError(401,"User not authorized","User not Authorized"));
  }
  next()
}
}

module.exports = allowAdmin