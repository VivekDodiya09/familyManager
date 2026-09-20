const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  grievanceId: { type: String, required: true, unique: true, index: true },
  familyId: { type: String, required: true, index: true },
  beneficiaryId: { type: String, required: true, index: true },
  schemeId: { type: String, required: true, index: true },
  applicationId: { type: String, index: true },
  disbursementId: { type: String },
  department: { type: String, required: true },
  lifecycleStageAtIssue: { type: String, required: true }, // e.g., 'PAYMENT_COMPLETED', 'DOCUMENTS_VERIFIED'
  issueCategory: {
    type: String,
    enum: [
      'Payment Approved But Not Received',
      'Delayed Application Processing (SLA Breach)',
      'Wrongful Rejection / Eligibility Dispute',
      'Biometric / Aadhaar Linking Failure',
      'Incomplete Benefit Delivered',
      'Document Verification Stall',
      'Duplicate Identity Flag Dispute'
    ],
    required: true
  },
  description: { type: String, required: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'High' },
  status: { type: String, enum: ['Open', 'Under Department Review', 'Field Officer Assigned', 'Resolved', 'Escalated to Collector'], default: 'Open' },
  filedDate: { type: Date, default: Date.now },
  resolvedDate: { type: Date },
  slaDays: { type: Number, default: 7 },
  isSLABreached: { type: Boolean, default: false },
  resolutionNotes: String,
  timeline: [{
    status: String,
    action: String,
    officer: String,
    department: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Grievance', grievanceSchema);
