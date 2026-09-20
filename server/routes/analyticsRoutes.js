const express = require('express');
const router = express.Router();
const { getGapAnalysis } = require('../services/gapAnalysisService');
const { getCrossSchemeOverlap } = require('../services/overlapAnalysisService');
const { getProactiveOutreach } = require('../services/outreachService');
const seedData = require('../services/seedData');

// GET /api/analytics/gap-analysis?schemeId=SCH-EDU-POSTMATRIC
router.get('/gap-analysis', (req, res) => {
  const result = getGapAnalysis(req.query.schemeId);
  res.json(result);
});

// GET /api/analytics/cross-scheme-overlap
router.get('/cross-scheme-overlap', (req, res) => {
  const result = getCrossSchemeOverlap();
  res.json(result);
});

// GET /api/analytics/conversion-funnel
router.get('/conversion-funnel', (req, res) => {
  res.json(seedData.conversionFunnel);
});

// GET /api/analytics/outreach
router.get('/outreach', (req, res) => {
  const result = getProactiveOutreach(req.query.schemeId);
  res.json(result);
});

// GET /api/analytics/department-overview
router.get('/department-overview', (req, res) => {
  res.json(seedData.departmentMetrics);
});

module.exports = router;
