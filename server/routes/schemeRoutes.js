const express = require('express');
const router = express.Router();
const seedData = require('../services/seedData');
const { evaluateEligibility } = require('../services/schemeEngine');

// GET /api/schemes - List all schemes in Registry
router.get('/', (req, res) => {
  res.json(seedData.schemes);
});

// GET /api/schemes/:id
router.get('/:id', (req, res) => {
  const scheme = seedData.schemes.find(s => s.schemeId === req.params.id);
  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found' });
  }
  res.json(scheme);
});

// POST /api/schemes/evaluate - Dynamic eligibility evaluation
router.post('/evaluate', (req, res) => {
  const { beneficiaryId, familyId, schemeId } = req.body;

  const family = seedData.families.find(f => f.familyId === (familyId || 'GJ-102938'));
  const beneficiary = seedData.beneficiaries.find(b => b.beneficiaryId === (beneficiaryId || 'B-GJ-102-03'));
  const scheme = seedData.schemes.find(s => s.schemeId === (schemeId || 'SCH-EDU-POSTMATRIC'));

  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found' });
  }

  const result = evaluateEligibility(beneficiary, family, scheme);
  res.json(result);
});

module.exports = router;
