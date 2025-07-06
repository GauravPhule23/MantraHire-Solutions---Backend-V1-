const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log(process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4, // for IPv4
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}


// async function conectionDatabase(){
//  await mongoose.connect(process.env.MONGODB_URI).then(()=>{
//   console.log("MongoDB connected..")
// }).catch((e)=>{
//   console.log("Error in connecting Mongodb ",e);
// })
// }

module.exports={
connectDB,

}