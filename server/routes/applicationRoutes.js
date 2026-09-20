const express = require('express');
const router = express.Router();
const seedData = require('../services/seedData');

// GET /api/applications - List applications & bottleneck summary
router.get('/', (req, res) => {
  res.json({
    applications: seedData.applications,
    bottlenecks: seedData.applicationBottlenecks
  });
});

// GET /api/applications/:id - Detailed lifecycle timeline
router.get('/:id', (req, res) => {
  const app = seedData.applications.find(a => a.applicationId === req.params.id);
  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json(app);
});

// POST /api/applications/:id/advance - Transition lifecycle stage
router.post('/:id/advance', (req, res) => {
  const { newStage, remarks, officer } = req.body;
  const app = seedData.applications.find(a => a.applicationId === req.params.id);

  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }

  app.currentStage = newStage || 'APPROVED';
  if (app.currentStage === 'APPROVED') {
    app.bottleneckReason = 'None';
  }
  app.timeline.push({
    stage: app.currentStage,
    status: 'Updated by Officer',
    remarks: remarks || `Advanced to ${app.currentStage}`,
    timestamp: new Date(),
    officer: officer || 'Nodal Officer Desk'
  });

  res.json({ success: true, application: app });
});

module.exports = router;
