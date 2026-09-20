const express = require('express');
const router = express.Router();
const seedData = require('../services/seedData');

// GET /api/grievances - Get all grievances with full 360° context
router.get('/', (req, res) => {
  const grievancesWithContext = seedData.grievances.map(g => {
    const family = seedData.families.find(f => f.familyId === g.familyId);
    const beneficiary = seedData.beneficiaries.find(b => b.beneficiaryId === g.beneficiaryId);
    const scheme = seedData.schemes.find(s => s.schemeId === g.schemeId);
    const application = seedData.applications.find(a => a.applicationId === g.applicationId);
    const disbursement = seedData.disbursements.find(d => d.disbursementId === g.disbursementId);

    return {
      ...g,
      familyContext: family ? {
        familyId: family.familyId,
        village: family.address.village,
        district: family.address.district,
        rationCardCategory: family.rationCardCategory
      } : null,
      beneficiaryName: beneficiary ? beneficiary.name : 'Citizen',
      schemeName: scheme ? scheme.schemeName : g.schemeId,
      applicationStage: application ? application.currentStage : null,
      disbursementRef: disbursement ? disbursement.transactionRef : null,
      isDeliveryException: disbursement ? disbursement.isDeliveryException : false
    };
  });

  res.json(grievancesWithContext);
});

// POST /api/grievances - File a contextual grievance
router.post('/', (req, res) => {
  const { familyId, beneficiaryId, schemeId, applicationId, disbursementId, issueCategory, description, department } = req.body;

  const newGrievance = {
    grievanceId: `GRV-${Date.now().toString().slice(-6)}`,
    familyId: familyId || 'GJ-102938',
    beneficiaryId: beneficiaryId || 'B-GJ-102-01',
    schemeId: schemeId || 'SCH-AGRI-PMKISAN',
    applicationId: applicationId || null,
    disbursementId: disbursementId || null,
    department: department || 'Ministry of Agriculture',
    lifecycleStageAtIssue: 'PAYMENT_COMPLETED',
    issueCategory: issueCategory || 'Payment Approved But Not Received',
    description: description || 'Beneficiary reported non-receipt of sanctioned welfare installment.',
    severity: 'High',
    status: 'Open',
    filedDate: new Date(),
    slaDays: 7,
    isSLABreached: false,
    timeline: [
      {
        status: 'Filed',
        action: 'Directly logged into Beneficiary 360 Grievance Desk',
        officer: 'Citizen Portal / CSC Operator',
        department: department || 'Nodal Desk',
        timestamp: new Date()
      }
    ]
  };

  seedData.grievances.unshift(newGrievance);
  res.status(201).json(newGrievance);
});

// PATCH /api/grievances/:id/resolve
router.patch('/:id/resolve', (req, res) => {
  const grv = seedData.grievances.find(g => g.grievanceId === req.params.id);
  if (!grv) {
    return res.status(404).json({ error: 'Grievance not found' });
  }

  grv.status = 'Resolved';
  grv.resolvedDate = new Date();
  grv.resolutionNotes = req.body.resolutionNotes || 'Aadhaar mapper re-linked and DBT re-disbursed successfully.';
  grv.timeline.push({
    status: 'Resolved',
    action: grv.resolutionNotes,
    officer: req.body.officer || 'District Redressal Officer',
    department: grv.department,
    timestamp: new Date()
  });

  res.json(grv);
});

module.exports = router;
