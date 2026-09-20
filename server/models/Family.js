const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  familyId: { type: String, required: true, unique: true, index: true },
  rationCardNumber: String,
  rationCardCategory: { type: String, enum: ['AAY', 'PHH', 'NPHH', 'NONE'], default: 'NONE' },
  address: {
    house: String,
    village: String,
    block: String,
    district: String,
    state: String,
    pincode: String,
    geoLat: Number,
    geoLng: Number,
  },
  householdType: { type: String, enum: ['Kutcha', 'Pucca', 'Semi-Pucca'], default: 'Kutcha' },
  landHoldingAcres: { type: Number, default: 0 },
  annualIncomeINR: { type: Number, default: 0 },
  incomeCategory: { type: String, enum: ['BPL', 'APL', 'EWS', 'LIG', 'MIG'], default: 'BPL' },
  hasElectricity: { type: Boolean, default: false },
  hasToilet: { type: Boolean, default: false },
  hasDrinkingWater: { type: Boolean, default: false },
  registeredAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Family', familySchema);
