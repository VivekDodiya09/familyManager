const express = require('express');
const crypto = require('crypto');
const { createToken } = require('../middleware/auth');

const router = express.Router();
const configuredEmail = () => process.env.GOVT_AUTHORITY_EMAIL || 'authority@beneficiary360.gov.in';
const configuredPassword = () => process.env.GOVT_AUTHORITY_PASSWORD || 'Govt@360123';

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  const expectedPassword = configuredPassword();
  const emailMatches = typeof email === 'string' && email.toLowerCase() === configuredEmail().toLowerCase();
  const passwordMatches = typeof password === 'string' && password.length === expectedPassword.length && crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expectedPassword));
  if (!emailMatches || !passwordMatches) return res.status(401).json({ error: 'Invalid government authority credentials' });

  const authority = {
    email: configuredEmail(),
    name: process.env.GOVT_AUTHORITY_NAME || 'Government Authority',
    role: process.env.GOVT_AUTHORITY_ROLE || 'District Programme Officer'
  };
  return res.json({ token: createToken(authority), authority });
});

module.exports = router;