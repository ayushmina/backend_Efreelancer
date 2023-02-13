const multer            = require('multer');
const { normalize }     = require('path')

const storage = multer.diskStorage({
      
  destination: function (req, file, callback) {
    callback(null, normalize(process.env.PWD || process.cwd()+ "/public/images"));
  },
  filename: function (req, file, cb) {
    console.log(file,"hello")
    cb(null, Date.now() + file.originalname); 
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {

    cb(null, true)
  } else {
    //reject file
    cb({
      message: 'Unsupported file format'
    }, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: "500mb"
  },
  // fileFilter: fileFilter
})

module.exports = upload;