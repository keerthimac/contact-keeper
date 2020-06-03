const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, Access Denied' });
  console.log(req.token); //testing
  try {
    const verified = jwt.verify(token, config.get('jwtSecret'));
    // console.log(verified); //testing
    req.user = verified.user;
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

module.exports = auth;
