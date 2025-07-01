const { validateToken } = require("../Services/auth")

function checkToken(cookieName){
  return async function (req,res,next){
    let tokenValue = await req.cookies[cookieName]
    if (!tokenValue) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        tokenValue = authHeader.split(" ")[1];
      }
    }
    if(!tokenValue){
      return next()
    }
    try {
      
      const payload = validateToken(tokenValue)
      
      req.user = payload
      
      
    } catch (error) {
      
    }
    next()
  }
}

module.exports = checkToken
//module.exports =checkToken;