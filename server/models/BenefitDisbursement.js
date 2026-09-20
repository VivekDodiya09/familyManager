const mongoose = require('mongoose');

const benefitDisbursementSchema = new mongoose.Schema({
  disbursementId: { type: String, required: true, unique: true, index: true },
  applicationId: { type: String, required: true, index: true },
  beneficiaryId: { type: String, required: true, index: true },
  familyId: { type: String, required: true, index: true },
  schemeId: { type: String, required: true, index: true },
  department: { type: String, required: true },
  benefitType: { type: String, required: true },
  amountINR: { type: Number, default: 0 },
  benefitDescription: String,
  paymentChannel: { type: String, enum: ['Aadhaar Payment Bridge (APB)', 'PFMS Direct Credit', 'In-Kind Delivery', 'Card Sanction', 'Post Office Account'], default: 'PFMS Direct Credit' },
  transactionRef: String,
  initiatedDate: { type: Date, default: Date.now },
  completedDate: { type: Date },
  paymentStatus: { type: String, enum: ['Initiated', 'Processing', 'Completed', 'Failed', 'Reversed'], default: 'Initiated' },
  beneficiaryConfirmation: {
    status: { type: String, enum: ['Pending Confirmation', 'Confirmed Received', 'Reported Not Received'], default: 'Pending Confirmation' },
    confirmedDate: Date,
    feedbackRating: Number,
    remarks: String
  },
  isDeliveryException: { type: Boolean, default: false }, // Flagged when Payment is Completed but Beneficiary says NOT RECEIVED
  exceptionInvestigationStatus: { type: String, enum: ['None', 'Under Investigation', 'Resolved - Credited', 'Resolved - Fraud/Clerical Error'], default: 'None' }
}, { timestamps: true });

module.exports = mongoose.model('BenefitDisbursement', benefitDisbursementSchema);
