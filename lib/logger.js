module.exports = (req, res, next) => {
  console.log('Current Time:', req.requestTime);
  console.log('Path:', req.path);
  console.log('Method:', req.method);
  next();
};