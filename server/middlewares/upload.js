const multer = require("multer");

function register(app, folder, multipartId) {
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, folder);
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  var staticUpload = multer({ storage });

  app.post(folder, staticUpload.single(multipartId));
}

module.exports = {
  register
};
