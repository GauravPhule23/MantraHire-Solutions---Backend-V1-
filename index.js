const express = require("express");
require('dotenv').config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const checkToken = require("./Middlewares/auth.middleware.js");
const { connectDB } = require("./connection");


const applicantRouter = require("./Routes/applicant.route.js");
const authRouter = require("./Routes/auth.route.js");
const dashboardRouter = require("./Routes/dashboard.route.js");



const app = express();
const port = process.env.PORT || 8000
connectDB().then(() => {
  // start server only after DB is connected
  app.listen(port, () => {
    console.log(`🚀 Server running on ${port}`);
  });
});

// app.options('*', cors({
//   origin: process.env.FRONTEND,  
//   credentials: true,
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//   allowedHeaders: "Content-Type, Authorization"
// }));
app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkToken("token"));

app.get("/", (req, res) => {
  res.send("CORS is working!");
});

app.use("/api/v1/applicant", applicantRouter);
app.use("/api/v1/auth/admin", authRouter);
app.use("/api/v1/admin/dashboard", dashboardRouter);


// app.listen(port,()=>{
//   console.log(`server started at port ${port}`);
// });



