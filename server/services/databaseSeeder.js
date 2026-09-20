const seedData = require('./seedData');
const Family = require('../models/Family');
const Beneficiary = require('../models/Beneficiary');
const Scheme = require('../models/Scheme');
const Application = require('../models/Application');
const BenefitDisbursement = require('../models/BenefitDisbursement');
const Grievance = require('../models/Grievance');
const AuditLog = require('../models/AuditLog');

const seedCollection = async (Model, documents, key) => {
  await Promise.all(documents.map(document => (
    Model.updateOne(
      { [key]: document[key] },
      { $set: document },
      { upsert: true }
    )
  )));
};

const seedDatabase = async () => {
  await seedCollection(Family, seedData.families, 'familyId');
  await seedCollection(Beneficiary, seedData.beneficiaries, 'beneficiaryId');
  await seedCollection(Scheme, seedData.schemes, 'schemeId');
  await seedCollection(Application, seedData.applications, 'applicationId');
  await seedCollection(BenefitDisbursement, seedData.disbursements, 'disbursementId');
  await seedCollection(Grievance, seedData.grievances, 'grievanceId');
  await seedCollection(AuditLog, seedData.exceptionAlerts, 'alertId');

  console.log('✅ Seed data inserted into MongoDB');
};

module.exports = { seedDatabase };