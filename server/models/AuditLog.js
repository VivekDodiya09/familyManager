const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  alertId: { type: String, required: true, unique: true },
  alertType: {
    type: String,
    enum: [
      'SLA_BREACH_APPROACHING',
      'PAYMENT_PENDING_AFTER_APPROVAL',
      'BENEFICIARY_NON_RECEIPT_EXCEPTION',
      'INCOMPLETE_APPLICATION_DOCS',
      'POTENTIAL_DUPLICATE_OVERLAP',
      'ELIGIBLE_UNSERVED_OUTREACH'
    ],
    required: true
  },
  severity: { type: String, enum: ['Info', 'Warning', 'Critical'], default: 'Warning' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  relatedIds: {
    familyId: String,
    beneficiaryId: String,
    schemeId: String,
    applicationId: String
  },
  count: { type: Number, default: 1 }, // For aggregate alert summaries
  department: String,
  district: String,
  status: { type: String, enum: ['Active', 'Under Review', 'Resolved', 'Dismissed'], default: 'Active' },
  actionRequired: String
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
