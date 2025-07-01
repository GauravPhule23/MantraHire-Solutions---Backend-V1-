const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createToken } = require("../Services/auth");
const apiError = require("../Services/apiError");


const adminSchema = new mongoose.Schema({
  fullName : {type :  String, required : true},
  email : {type : String, required : true},
  password : {type:String, required:true},
  salt : {type:String,},
  role : {type:String, enum:["Admin"], default:"Admin"}
})

adminSchema.pre("save", async function (next) {
  const admin = this
  if (!admin.isModified("password")) return
  const salt = randomBytes(16).toString()
  const hashedPassword = createHmac("sha256", salt).update(admin.password).digest("hex")

  this.salt = salt
  this.password = hashedPassword
})

adminSchema.static("checkTokenForAdmin", async function (email, password) {
  const admin = await this.findOne({ email })
  if (!admin) throw new apiError(404,"No admin Found")
  const salt = admin.salt
  const hashedPassword = admin.password
  const userPassword = createHmac("sha256", salt).update(password).digest("hex")
  if (userPassword !== hashedPassword) throw new apiError(404,"Incorrect password","Incorrect password")
  const token = await createToken(admin)
  console.log(token)
  return token
})

const Admin = mongoose.model("Admin", adminModel);

module.exports = Admin