const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.REACT_APP_ADMIN_PASSWORD;

function adminAuth(req, res, next) {
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin authentication is not configured' });
  }

  const xAdminPassword = req.get('x-admin-password');
  const authHeader = req.get('authorization');

  let providedPassword = '';

  if (xAdminPassword) {
    providedPassword = xAdminPassword;
  } else if (authHeader?.startsWith('Bearer ')) {
    providedPassword = authHeader.slice(7).trim();
  }

  if (providedPassword === ADMIN_PASSWORD) {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = adminAuth;
