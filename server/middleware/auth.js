const crypto = require('crypto');

const getSecret = () => process.env.AUTH_SECRET || 'beneficiary-360-local-auth-secret';

const createToken = (authority) => {
  const payload = Buffer.from(JSON.stringify({
    email: authority.email,
    name: authority.name,
    role: authority.role,
    exp: Date.now() + (8 * 60 * 60 * 1000)
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
};

const verifyToken = (token) => {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expectedSignature = crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
  if (signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return null;
  const authority = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  return authority.exp > Date.now() ? authority : null;
};

const requireAuth = (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  try {
    const authority = verifyToken(token);
    if (!authority) return res.status(401).json({ error: 'Authentication required' });
    req.authority = authority;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
};

module.exports = { createToken, requireAuth };