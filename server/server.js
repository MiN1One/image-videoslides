const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: './config.env' });

const handleFrames = require('./convertImages');
const { compressImages } = require('./imageProcess');
const getImages = require('./multerConfig');
const errorHandler = require('./handleErrors');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.post(
  '/api/images', 
  (req, res, n) => {req.query.start = Date.now(); n()},
  getImages, 
  compressImages, 
  handleFrames
);

app.get('*', (req, res, next) => 
  res.sendFile(
    path.join(__dirname, './public/index.html')
  )
);

app.use(errorHandler);

const port = process.env.PORT || 8800;

app.listen(port, () => console.log(`ACTIVE ON PORT ${port}`));