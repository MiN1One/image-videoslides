const fs = require('fs');
const path = require('path');

exports.createDir = (dir) => {
  if (!fs.existsSync(path.join(__dirname, dir))) {
    fs.mkdirSync(path.join(__dirname, dir));
  }
};