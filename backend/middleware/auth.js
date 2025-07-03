const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const tok = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
  if (!tok) return res.status(401).json('توکن نیست');

  try {
    req.user = jwt.verify(tok, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json('توکن نامعتبر');
  }
};
