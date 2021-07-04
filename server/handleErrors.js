module.exports = (er, req, res, next) => {
  console.log(er);
  res.status(er.statusCode || 500).json({
    status: 'error',
    message: er.message || 'Oops, something went wrong!'
  });
};