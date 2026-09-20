require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { seedDatabase } = require('./services/databaseSeeder');
const { requireAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Public health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Beneficiary 360° Unified Management Platform',
    timestamp: new Date()
  });
});

// Protected API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', requireAuth);
app.use('/api/beneficiaries', require('./routes/beneficiaryRoutes'));
app.use('/api/schemes', require('./routes/schemeRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/grievances', require('./routes/grievanceRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

const startServer = async () => {
  const isDatabaseConnected = await connectDB();

  if (isDatabaseConnected) {
    await seedDatabase();
  }

  app.listen(PORT, () => {
    console.log(`🚀 Beneficiary 360 API Server running on port ${PORT}`);
    console.log(`🔗 Healthcheck: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
