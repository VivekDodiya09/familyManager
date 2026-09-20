// Scheme Engine: Deterministic Decision Engine
// Beneficiary Data + Family Context + Scheme Rules -> Verdict + Transparent Reasons

function evaluateEligibility(beneficiary, family, scheme) {
  if (!scheme || !scheme.eligibilityRules) {
    return {
      verdict: 'MISSING_INFORMATION',
      status: 'Missing Information',
      score: 0,
      reasons: ['Scheme rules definition is missing or invalid.'],
      criteriaBreakdown: [],
      missingDocuments: []
    };
  }

  // Calculate age if dob exists
  let age = null;
  if (beneficiary && beneficiary.dob) {
    const diffMs = Date.now() - new Date(beneficiary.dob).getTime();
    age = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  }

  // Merged context for rule evaluation
  const context = {
    // Individual attributes
    age: age,
    gender: beneficiary ? beneficiary.gender : null,
    occupation: beneficiary ? beneficiary.occupation : null,
    caste: beneficiary ? beneficiary.caste : null,
    maritalStatus: beneficiary ? beneficiary.maritalStatus : null,
    isDisabled: beneficiary ? beneficiary.isDisabled : false,
    individualIncomeINR: beneficiary ? beneficiary.annualIncomeINR : 0,

    // Household attributes (from Family ID)
    annualIncomeINR: family ? family.annualIncomeINR : 0,
    incomeCategory: family ? family.incomeCategory : 'APL',
    householdType: family ? family.householdType : 'Pucca',
    landHoldingAcres: family ? family.landHoldingAcres : 0,
    rationCardCategory: family ? family.rationCardCategory : 'NONE',
    state: family && family.address ? family.address.state : 'Gujarat',
    district: family && family.address ? family.address.district : 'Ahmedabad'
  };

  const criteriaBreakdown = [];
  let allHardRulesPassed = true;
  let missingInfoCount = 0;

  scheme.eligibilityRules.forEach((rule) => {
    const paramVal = context[rule.parameter];
    let passed = false;
    let reason = '';

    if (paramVal === undefined || paramVal === null) {
      missingInfoCount++;
      criteriaBreakdown.push({
        parameter: rule.parameter,
        description: rule.description,
        passed: false,
        status: 'Missing Data',
        reason: `Value for '${rule.parameter}' is not recorded in the Beneficiary Registry.`,
        scope: rule.scope,
        isHardCriterion: rule.isHardCriterion
      });
      if (rule.isHardCriterion) {
        allHardRulesPassed = false;
      }
      return;
    }

    switch (rule.operator) {
      case '<=':
        passed = Number(paramVal) <= Number(rule.value);
        reason = passed
          ? `Recorded value (${paramVal}) satisfies ceiling of <= ${rule.value}`
          : `Recorded value (${paramVal}) exceeds allowed limit of ${rule.value}`;
        break;
      case '>=':
        passed = Number(paramVal) >= Number(rule.value);
        reason = passed
          ? `Recorded value (${paramVal}) meets minimum threshold of >= ${rule.value}`
          : `Recorded value (${paramVal}) is below threshold of ${rule.value}`;
        break;
      case '==':
        passed = String(paramVal).toLowerCase() === String(rule.value).toLowerCase();
        reason = passed
          ? `Value matches criteria '${rule.value}'`
          : `Expected '${rule.value}', but found '${paramVal}'`;
        break;
      case '!=':
        passed = String(paramVal).toLowerCase() !== String(rule.value).toLowerCase();
        reason = passed
          ? `Value does not match excluded '${rule.value}'`
          : `Value violates exclusion of '${rule.value}'`;
        break;
      case 'in':
        passed = Array.isArray(rule.value) && rule.value.map(v => String(v).toLowerCase()).includes(String(paramVal).toLowerCase());
        reason = passed
          ? `Value '${paramVal}' is present in approved categories [${rule.value.join(', ')}]`
          : `Value '${paramVal}' not in approved categories [${rule.value.join(', ')}]`;
        break;
      case 'includes':
        passed = String(paramVal).toLowerCase().includes(String(rule.value).toLowerCase());
        reason = passed
          ? `Profile mentions '${rule.value}'`
          : `Profile does not match '${rule.value}'`;
        break;
      default:
        passed = false;
        reason = `Unknown rule operator ${rule.operator}`;
    }

    if (rule.isHardCriterion && !passed) {
      allHardRulesPassed = false;
    }

    criteriaBreakdown.push({
      parameter: rule.parameter,
      description: rule.description,
      passed,
      status: passed ? 'Passed' : 'Failed',
      reason,
      scope: rule.scope,
      isHardCriterion: rule.isHardCriterion
    });
  });

  // Check required documents
  const beneficiaryDocs = (beneficiary && beneficiary.documents) ? beneficiary.documents : [];
  const missingDocuments = [];

  if (scheme.requiredDocuments && scheme.requiredDocuments.length > 0) {
    scheme.requiredDocuments.forEach(reqDoc => {
      const found = beneficiaryDocs.find(d =>
        d.docType.toLowerCase() === reqDoc.docType.toLowerCase() && d.verified
      );
      if (!found) {
        missingDocuments.push({
          docType: reqDoc.docType,
          name: reqDoc.name,
          isMandatory: reqDoc.isMandatory
        });
      }
    });
  }

  // Determine Verdict
  let verdict = 'NOT_ELIGIBLE';
  let status = 'Not Eligible';

  if (missingInfoCount > 0 && allHardRulesPassed) {
    verdict = 'MISSING_INFORMATION';
    status = 'Missing Information';
  } else if (allHardRulesPassed) {
    if (missingDocuments.length > 0) {
      verdict = 'POTENTIALLY_ELIGIBLE';
      status = 'Potentially Eligible';
    } else {
      verdict = 'ELIGIBLE';
      status = 'Eligible';
    }
  } else {
    verdict = 'NOT_ELIGIBLE';
    status = 'Not Eligible';
  }

  return {
    schemeId: scheme.schemeId,
    schemeName: scheme.schemeName,
    department: scheme.department,
    category: scheme.category,
    benefitAmount: scheme.benefitAmount,
    benefitType: scheme.benefitType,
    verdict,
    status,
    allHardRulesPassed,
    criteriaBreakdown,
    missingDocuments,
    evaluatedAt: new Date()
  };
}

module.exports = { evaluateEligibility };
