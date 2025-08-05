const multer = require("multer");

const maxSize = 3 * 1024 * 1024; // 3MB

const storage = multer.memoryStorage(); // ✅ store in memory as buffer

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

module.exports = upload;
