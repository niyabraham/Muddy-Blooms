const jwt = require('jsonwebtoken');

function adminAuth(req, res, next) {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'Admin authentication is not configured' });
  }

  const authHeader = req.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.slice(7).trim();

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = adminAuth;