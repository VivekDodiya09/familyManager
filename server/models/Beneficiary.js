const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  beneficiaryId: { type: String, required: true, unique: true, index: true },
  familyId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  relationToHead: { type: String },
  isHead: { type: Boolean, default: false },
  aadhaarToken: { type: String },
  mobileNumber: { type: String },
  email: { type: String },
  caste: { type: String, enum: ['General', 'OBC', 'SC', 'ST'] },
  religion: String,
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Widowed', 'Divorced'] },
  educationLevel: { type: String },
  occupation: { type: String },
  annualIncomeINR: { type: Number, default: 0 },
  isDisabled: { type: Boolean, default: false },
  disabilityType: String,
  disabilityPercentage: Number,
  bankAccountNumber: String,
  bankIFSC: String,
  bankName: String,
  dbtLinked: { type: Boolean, default: false },
  eKycVerified: { type: Boolean, default: false },
  documents: [{
    docType: String,
    docNumber: String,
    verified: Boolean,
    uploadedAt: Date,
  }],
  photo: String,
  registeredAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Beneficiary', beneficiarySchema);
