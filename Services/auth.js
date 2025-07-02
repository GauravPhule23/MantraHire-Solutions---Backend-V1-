const JWT = require("jsonwebtoken")

const secreteKey = process.env.JWT_SECRETE_KEY

async function createToken(user){

 if(user.role == "Admin"){
  const payload ={
    _id : user._id,
    fullName:user.fullName,
    role:user.role,
    email:user.email,
  }

  const token = await JWT.sign(payload,secreteKey,{
    expiresIn:'1d'
  })
  return token
 }else{
    res.json(new apiError(404,"Not Authorized","Not Authorized"));
 }
}

function validateToken(token){
  const payload = JWT.verify(token,secreteKey)
  return payload
}

module.exports={
  createToken,
  validateToken
}