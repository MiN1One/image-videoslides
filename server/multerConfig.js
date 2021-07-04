const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, './public/images_raw'),
  filename: (req, file, cb) => cb(null, `raw-${nanoid()}`)
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    const accept = file.mimetype.split('/')[0] === 'image';
    cb(null, accept);
  },
  storage: diskStorage
});

module.exports = upload.array('frame');