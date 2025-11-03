const Errormiddleware = (err, req, res, next) => {
  return res.status(err.status || 400).json({ error: err.message });
};
module.exports = Errormiddleware;
