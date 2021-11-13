const jwt = require('jsonwebtoken');
const User = require('../../db/models/User');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bear ${Token}
  if (token === null) {
    const noTokenError = new Error('No token was sent');
    noTokenError.status = 401;
    next(noTokenError);
    return;
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      const invalidTokenError = new Error('Invalid Token sent!');
      invalidTokenError.status = 403;
      next(invalidTokenError);
      return;
    }
    const foundUser = await User.findByPk(user.userId);
    if (!foundUser) {
      const userNotFoundError = new Error('User not found');
      userNotFoundError.status = 404;
      next(userNotFoundError);
      return;
    }
    req.user = foundUser;
    next();
  })
}

module.exports = authenticateToken;