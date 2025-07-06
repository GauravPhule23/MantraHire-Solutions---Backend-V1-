const multer = require("multer")
const path = require("path");

const maxSize = 3 * 1024 * 1024; // 3MB (7,340,032 bytes)
const uploadDir = path.join(__dirname, "/tmp");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ 
  storage,
  limits: { fileSize: maxSize /* bytes */ }
 })
module.exports = upload