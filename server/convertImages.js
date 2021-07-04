const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const { createDir } = require('./utils');

ffmpeg.setFfmpegPath(ffmpegPath);

const 
  VID_DURATION = 15,
  VID_FPS = 30,
  VID_KEYFRAME_RATE = 500 / 1000;

module.exports = (req, res, next) => {
  const dir = `./public/video/${req.body.timestamp}`;
  createDir(dir);

  const conversionStart = Date.now();

  ffmpeg()
    .input(path.join(__dirname, `./public/images/${req.body.timestamp}/frame%1d.jpeg`))
    .loop(VID_DURATION)
    .fps(VID_FPS)
    .inputOptions([`-framerate 1/${VID_KEYFRAME_RATE}`])
    .on('error', (er) => {
      next(new Error(`Failed to input images ${er}`));

      fs.rmdirSync(dir);
    })
    .on('end', () => {
      console.log(`VIDEO-CONVERSION TIME: ${Date.now() - conversionStart}ms`);
      console.log(`TOTAL TIME: ${Date.now() - req.query.start}ms`);

      res.status(201).json({
        status: 'success',
        data: {
          timestamp: req.body.timestamp
        }
      });
    })
    .save(path.join(__dirname, `${dir}/video.mp4`));
};