const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  applicationId: { type: String, required: true, unique: true, index: true },
  familyId: { type: String, required: true, index: true },
  beneficiaryId: { type: String, required: true, index: true },
  schemeId: { type: String, required: true, index: true },
  department: { type: String, required: true },
  currentStage: {
    type: String,
    enum: [
      'IDENTIFIED',
      'ELIGIBILITY_ASSESSED',
      'APPLIED',
      'DOCUMENTS_VERIFIED',
      'FIELD_VERIFIED',
      'APPROVED',
      'REJECTED',
      'PAYMENT_INITIATED',
      'PAYMENT_COMPLETED',
      'RECEIPT_CONFIRMED',
      'DELIVERY_EXCEPTION',
      'RENEWAL_DUE',
      'EXITED'
    ],
    default: 'APPLIED'
  },
  bottleneckReason: {
    type: String,
    enum: [
      'None',
      'Department Review',
      'Document Verification',
      'Field Verification',
      'Payment Processing',
      'Bank Account Discrepancy',
      'Biometric Failure',
      'Citizen Clarification Required'
    ],
    default: 'None'
  },
  submittedDate: { type: Date, default: Date.now },
  targetSLADate: { type: Date },
  isSLABreached: { type: Boolean, default: false },
  assignedOfficer: {
    name: String,
    designation: String,
    office: String
  },
  documentsSubmitted: [{
    docType: String,
    status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
    verifiedAt: Date,
    remarks: String
  }],
  timeline: [{
    stage: String,
    status: String,
    remarks: String,
    timestamp: { type: Date, default: Date.now },
    officer: String
  }],
  rejectionReason: String
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
