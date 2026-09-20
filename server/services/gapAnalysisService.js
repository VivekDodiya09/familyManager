const seedData = require('./seedData');

function getGapAnalysis(schemeId) {
  // If specific scheme provided, or default to Education Scholarship
  if (schemeId && schemeId === 'SCH-HOUSING-PMAYG') {
    return {
      schemeName: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
      schemeId: 'SCH-HOUSING-PMAYG',
      department: 'Department of Rural Development',
      potentiallyEligible: 80000,
      applicationsReceived: 52000,
      approved: 40000,
      benefitsDelivered: 38000,
      potentiallyUnserved: 42000,
      unservedBreakdown: [
        { reason: "Didn't Apply", count: 28000, percentage: 66.7, color: '#3b82f6', action: 'Mobile Camp Enrolment' },
        { reason: 'Application Pending', count: 6000, percentage: 14.3, color: '#f59e0b', action: 'Desk Sanction Clearance' },
        { reason: 'Missing Documents (Land 7/12)', count: 4000, percentage: 9.5, color: '#ec4899', action: 'Revenue Record Linkage' },
        { reason: 'Rejected (Already owns Pucca)', count: 3000, percentage: 7.1, color: '#ef4444', action: 'Final Verification Notice' },
        { reason: 'Payment Issue (Direct Bank)', count: 1000, percentage: 2.4, color: '#8b5cf6', action: 'Aadhaar NPCI Fix' }
      ]
    };
  }

  if (schemeId && schemeId === 'SCH-AGRI-PMKISAN') {
    return {
      schemeName: 'PM-KISAN Samman Nidhi',
      schemeId: 'SCH-AGRI-PMKISAN',
      department: 'Ministry of Agriculture',
      potentiallyEligible: 150000,
      applicationsReceived: 120000,
      approved: 110000,
      benefitsDelivered: 105000,
      potentiallyUnserved: 45000,
      unservedBreakdown: [
        { reason: "Didn't Apply", count: 20000, percentage: 44.4, color: '#3b82f6', action: 'Kisan Call Center Drive' },
        { reason: 'Application Pending', count: 10000, percentage: 22.2, color: '#f59e0b', action: 'Talati Land Sign-off' },
        { reason: 'Missing Documents (eKYC / Land)', count: 8000, percentage: 17.8, color: '#ec4899', action: 'CSC Biometric Camps' },
        { reason: 'Rejected (Land > 5 acres)', count: 4000, percentage: 8.9, color: '#ef4444', action: 'Audit Notification' },
        { reason: 'Payment Issue (Aadhaar Seed Failure)', count: 3000, percentage: 6.7, color: '#8b5cf6', action: 'Bank Mapping Correction' }
      ]
    };
  }

  // Default to Education Scholarship matching user request example
  return seedData.gapAnalysis;
}

module.exports = { getGapAnalysis };
