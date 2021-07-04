
const path = require('path');
const sharp = require('sharp');
const { createDir } = require('./utils');

const 
  IMAGE_WIDTH = 640,
  IMAGE_HEIGHT = 480,
  IMAGE_QUALITY = 80;

exports.compressImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();
  console.log(`-----------------------\nIMAGE-SAVING TIME: ${Date.now() - req.query.start}ms`)

  req.body.timestamp = Date.now();

  const dir = `./public/images/${req.body.timestamp}`;
  createDir(dir);

  const pms = req.files.map(async (e, i) => {
    const filename = `frame${i}.jpeg`;

    await sharp(path.join(__dirname, `./public/images_raw/${e.filename}`))
      .resize(IMAGE_WIDTH, IMAGE_HEIGHT, { fit: 'cover' })
      .toFormat('jpeg')
      .jpeg({ quality: IMAGE_QUALITY })
      .toFile(path.join(__dirname, `${dir}/${filename}`));
  });

  await Promise.all(pms);

  console.log(`COMPRESSION TIME: ${Date.now() - req.body.timestamp}ms`)

  next();
};

