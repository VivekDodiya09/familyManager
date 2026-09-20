const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  schemeId: { type: String, required: true, unique: true, index: true },
  schemeName: { type: String, required: true },
  department: { type: String, required: true }, // e.g. "Department of Higher Education", "Ministry of Agriculture"
  category: { type: String, enum: ['Education', 'Health', 'Housing', 'Agriculture', 'Pension', 'Food Security', 'Clean Energy', 'Social Welfare'], required: true },
  targetBeneficiaries: { type: String, required: true }, // e.g. "Students 14-24 years from low income households"
  eligibilityRules: [{
    parameter: { type: String, required: true }, // e.g. "annualIncomeINR", "age", "householdType", "landHoldingAcres"
    operator: { type: String, enum: ['<=', '>=', '==', '!=', 'in', 'includes'], required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    description: { type: String, required: true }, // Human readable rule explanation
    scope: { type: String, enum: ['individual', 'household'], default: 'individual' },
    isHardCriterion: { type: Boolean, default: true }
  }],
  requiredDocuments: [{
    docType: { type: String, required: true },
    name: { type: String, required: true },
    isMandatory: { type: Boolean, default: true }
  }],
  benefitType: { type: String, enum: ['Direct Cash Transfer (DBT)', 'Insurance Coverage', 'Housing Asset Subsidy', 'In-Kind Provision', 'Monthly Pension', 'Service Access'], required: true },
  benefitAmount: { type: String, required: true }, // e.g. "₹5,000 / year", "₹5,00,000 coverage", "₹1,20,000 construction subsidy"
  disbursementFrequency: { type: String, enum: ['One-time', 'Quarterly', 'Monthly', 'Annual', 'As Needed'], default: 'Annual' },
  applicationMethod: { type: String, enum: ['Online Portal', 'Village Panchayat Camp', 'CSC Center', 'Proactive Auto-Sanction', 'Department Counter'], default: 'Online Portal' },
  slaDays: { type: Number, default: 21 },
  status: { type: String, enum: ['Active', 'Paused', 'Draft'], default: 'Active' },
  budgetAllocatedCr: { type: Number, default: 500 },
  budgetUtilizedCr: { type: Number, default: 350 }
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
