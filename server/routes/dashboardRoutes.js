const express = require('express');
const router = express.Router();
const seedData = require('../services/seedData');
const { getExceptionsAndRisks } = require('../services/exceptionService');

// GET /api/dashboard/command - Hero Government Command Overview
router.get('/command', (req, res) => {
  const commandMetrics = {
    registeredBeneficiaries: 1245321,
    activeSchemeEnrollments: 891231,
    pendingApplications: 42183,
    potentiallyUnserved: 87421,
    openGrievances: 12421,
    slaBreaches: 1238,
    totalBudgetDistributedCr: 14850,
    dbtSuccessRate: '98.4%',
    departmentMatrix: seedData.departmentMetrics,
    conversionFunnel: seedData.conversionFunnel
  };

  res.json(commandMetrics);
});

// GET /api/dashboard/exceptions - Exception & Risk Dashboard
router.get('/exceptions', (req, res) => {
  const exceptions = getExceptionsAndRisks();
  res.json(exceptions);
});

module.exports = router;
