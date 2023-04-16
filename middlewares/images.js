import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });

export default function imagehandler (req, res, next) {
  upload.single("image")(req, res, (err) => {
    try {
      if (err) {
        return res.status(400).json(err.message);
      }
      req.imagePath = req.file.path;
      next();
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  });
}

//multiple & none