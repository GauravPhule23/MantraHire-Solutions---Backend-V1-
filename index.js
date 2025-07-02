const express = require("express");
require('dotenv').config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const checkToken = require("./Middlewares/auth.middleware.js");
const { conectionDatabase } = require("./connection");


const applicantRouter = require("./Routes/applicant.route.js");


const app = express();
conectionDatabase();

// app.options('*', cors({
//   origin: process.env.FRONTEND,  
//   credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkToken("token"));

app.use("/api/v1/applicant", applicantRouter);

const port = process.env.PORT || 8000

app.listen(port,()=>{
  console.log(`server started at port ${port}`);
});



