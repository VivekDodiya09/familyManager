// Comprehensive Seed Dataset for Beneficiary 360°
// Includes flagship Gujarat Family GJ-102938, national schemes, and multi-department analytics

const seedData = {
  families: [
    {
      familyId: 'GJ-102938',
      rationCardNumber: 'RC-GJ-2023-88190',
      rationCardCategory: 'PHH', // Priority Household
      householdType: 'Kutcha',
      landHoldingAcres: 1.5,
      annualIncomeINR: 72000,
      incomeCategory: 'BPL',
      hasElectricity: true,
      hasToilet: true,
      hasDrinkingWater: true,
      address: {
        house: 'House No. 42, Ward 3',
        village: 'Navagam',
        block: 'Sanand',
        district: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '382110',
        geoLat: 22.9868,
        geoLng: 72.3831
      }
    },
    {
      familyId: 'UP-492019',
      rationCardNumber: 'RC-UP-2022-31049',
      rationCardCategory: 'AAY', // Antyodaya Anna Yojana
      householdType: 'Kutcha',
      landHoldingAcres: 0.8,
      annualIncomeINR: 48000,
      incomeCategory: 'BPL',
      hasElectricity: false,
      hasToilet: false,
      hasDrinkingWater: true,
      address: {
        house: 'Plot 12, Gram Panchayat Majra',
        village: 'Kalyanpur',
        block: 'Sarojini Nagar',
        district: 'Lucknow',
        state: 'Uttar Pradesh',
        pincode: '226008',
        geoLat: 26.7456,
        geoLng: 80.8932
      }
    },
    {
      familyId: 'MH-338291',
      rationCardNumber: 'RC-MH-2024-99214',
      rationCardCategory: 'NPHH',
      householdType: 'Pucca',
      landHoldingAcres: 4.2,
      annualIncomeINR: 195000,
      incomeCategory: 'EWS',
      hasElectricity: true,
      hasToilet: true,
      hasDrinkingWater: true,
      address: {
        house: '14, Shanti Nagar',
        village: 'Baramati Rural',
        block: 'Baramati',
        district: 'Pune',
        state: 'Maharashtra',
        pincode: '413102',
        geoLat: 18.1517,
        geoLng: 74.5771
      }
    }
  ],

  beneficiaries: [
    // 5 Members of Family GJ-102938
    {
      beneficiaryId: 'B-GJ-102-01',
      familyId: 'GJ-102938',
      name: 'Ramesh Patel',
      dob: new Date('1978-04-12'),
      gender: 'Male',
      relationToHead: 'Self (Head of Family)',
      isHead: true,
      aadhaarToken: 'XXXX-XXXX-4819',
      mobileNumber: '+91 98251 44321',
      caste: 'OBC',
      maritalStatus: 'Married',
      educationLevel: 'Secondary (Class 10)',
      occupation: 'Small Farmer & Seasonal Worker',
      annualIncomeINR: 42000,
      isDisabled: false,
      bankAccountNumber: '918029384711',
      bankIFSC: 'SBIN0001824',
      bankName: 'State Bank of India',
      dbtLinked: true,
      eKycVerified: true,
      documents: [
        { docType: 'Aadhaar', docNumber: 'DOC-AADHAAR-4819', verified: true },
        { docType: 'Kisan Credit Card', docNumber: 'KCC-GJ-8821', verified: true },
        { docType: 'Land Records (7/12)', docNumber: '712-SANAND-102', verified: true },
        { docType: 'Income Certificate', docNumber: 'INC-2023-9912', verified: true }
      ]
    },
    {
      beneficiaryId: 'B-GJ-102-02',
      familyId: 'GJ-102938',
      name: 'Sunita Patel',
      dob: new Date('1982-08-25'),
      gender: 'Female',
      relationToHead: 'Spouse',
      isHead: false,
      aadhaarToken: 'XXXX-XXXX-9124',
      mobileNumber: '+91 98251 44321',
      caste: 'OBC',
      maritalStatus: 'Married',
      educationLevel: 'Primary (Class 5)',
      occupation: 'Homemaker & Dairy Cooperative Member',
      annualIncomeINR: 15000,
      isDisabled: false,
      bankAccountNumber: '918029384722',
      bankIFSC: 'SBIN0001824',
      bankName: 'State Bank of India',
      dbtLinked: true,
      eKycVerified: true,
      documents: [
        { docType: 'Aadhaar', docNumber: 'DOC-AADHAAR-9124', verified: true },
        { docType: 'Ration Card Member Entry', docNumber: 'RC-MEM-02', verified: true }
      ]
    },
    {
      beneficiaryId: 'B-GJ-102-03',
      familyId: 'GJ-102938',
      name: 'Pooja Patel',
      dob: new Date('2005-02-14'), // Age 19
      gender: 'Female',
      relationToHead: 'Daughter',
      isHead: false,
      aadhaarToken: 'XXXX-XXXX-6631',
      mobileNumber: '+91 97123 55890',
      caste: 'OBC',
      maritalStatus: 'Single',
      educationLevel: 'Undergraduate (B.Sc 1st Year)',
      occupation: 'Student',
      annualIncomeINR: 0,
      isDisabled: false,
      bankAccountNumber: '918029384733',
      bankIFSC: 'SBIN0001824',
      bankName: 'State Bank of India',
      dbtLinked: true,
      eKycVerified: true,
      documents: [
        { docType: 'Aadhaar', docNumber: 'DOC-AADHAAR-6631', verified: true },
        { docType: 'College Admission Bonafide', docNumber: 'GUJ-COL-2023-88', verified: true },
        { docType: 'Income Certificate', docNumber: 'INC-2023-9912', verified: true },
        { docType: 'Caste Certificate', docNumber: 'CST-OBC-2021-44', verified: true }
      ]
    },
    {
      beneficiaryId: 'B-GJ-102-04',
      familyId: 'GJ-102938',
      name: 'Rahul Patel',
      dob: new Date('2008-11-03'), // Age 16
      gender: 'Male',
      relationToHead: 'Son',
      isHead: false,
      aadhaarToken: 'XXXX-XXXX-7742',
      mobileNumber: '+91 98251 44321',
      caste: 'OBC',
      maritalStatus: 'Single',
      educationLevel: 'Secondary (Class 11)',
      occupation: 'Student',
      annualIncomeINR: 0,
      isDisabled: false,
      bankAccountNumber: '918029384744',
      bankIFSC: 'SBIN0001824',
      bankName: 'State Bank of India',
      dbtLinked: true,
      eKycVerified: true,
      documents: [
        { docType: 'Aadhaar', docNumber: 'DOC-AADHAAR-7742', verified: true },
        { docType: 'School Bonafide', docNumber: 'SCH-SANAND-11-09', verified: true }
      ]
    },
    {
      beneficiaryId: 'B-GJ-102-05',
      familyId: 'GJ-102938',
      name: 'Kamla Patel',
      dob: new Date('1952-06-18'), // Age 72
      gender: 'Female',
      relationToHead: 'Mother',
      isHead: false,
      aadhaarToken: 'XXXX-XXXX-1188',
      mobileNumber: '+91 98251 44321',
      caste: 'OBC',
      maritalStatus: 'Widowed',
      educationLevel: 'No Formal Education',
      occupation: 'Senior Dependent',
      annualIncomeINR: 0,
      isDisabled: false,
      bankAccountNumber: '918029384755',
      bankIFSC: 'SBIN0001824',
      bankName: 'State Bank of India',
      dbtLinked: true,
      eKycVerified: true,
      documents: [
        { docType: 'Aadhaar', docNumber: 'DOC-AADHAAR-1188', verified: true },
        { docType: 'Husband Death Certificate', docNumber: 'DTH-SAN-1998-04', verified: true }
      ]
    },

    // Beneficiaries of Family UP-492019
    {
      beneficiaryId: 'B-UP-492-01',
      familyId: 'UP-492019',
      name: 'Ram Charan Yadav',
      dob: new Date('1961-03-10'), // Age 63
      gender: 'Male',
      relationToHead: 'Self (Head of Family)',
      isHead: true,
      aadhaarToken: 'XXXX-XXXX-5521',
      mobileNumber: '+91 94150 99881',
      caste: 'OBC',
      maritalStatus: 'Married',
      educationLevel: 'Primary',
      occupation: 'Landless Agricultural Laborer',
      annualIncomeINR: 48000,
      isDisabled: false,
      dbtLinked: true,
      eKycVerified: true,
      documents: [{ docType: 'Aadhaar', docNumber: 'DOC-AADHAAR-5521', verified: true }]
    }
  ],

  schemes: [
    {
      schemeId: 'SCH-EDU-POSTMATRIC',
      schemeName: 'Post-Matric Scholarship for Higher Education',
      department: 'Department of Higher Education',
      category: 'Education',
      targetBeneficiaries: 'Meritorious students (Age 14-24) from low-income households enrolled in higher secondary or college',
      eligibilityRules: [
        { parameter: 'age', operator: '>=', value: 14, description: 'Candidate age must be at least 14 years', scope: 'individual', isHardCriterion: true },
        { parameter: 'age', operator: '<=', value: 24, description: 'Candidate age must be at most 24 years', scope: 'individual', isHardCriterion: true },
        { parameter: 'annualIncomeINR', operator: '<=', value: 250000, description: 'Household annual income must not exceed ₹2.5 Lakhs', scope: 'household', isHardCriterion: true },
        { parameter: 'occupation', operator: '==', value: 'Student', description: 'Beneficiary must be an active student', scope: 'individual', isHardCriterion: true }
      ],
      requiredDocuments: [
        { docType: 'Aadhaar', name: 'Aadhaar Card', isMandatory: true },
        { docType: 'Income Certificate', name: 'Valid Income Certificate (< ₹2.5L)', isMandatory: true },
        { docType: 'College Admission Bonafide', name: 'Institute Enrolment Certificate', isMandatory: true }
      ],
      benefitType: 'Direct Cash Transfer (DBT)',
      benefitAmount: '₹5,000 to ₹15,000 / year',
      disbursementFrequency: 'Annual',
      applicationMethod: 'Online Portal',
      slaDays: 30,
      status: 'Active',
      budgetAllocatedCr: 1200,
      budgetUtilizedCr: 940
    },
    {
      schemeId: 'SCH-HEALTH-PMJAY',
      schemeName: 'Ayushman Bharat - PM-JAY Health Protection',
      department: 'National Health Authority (Ministry of Health)',
      category: 'Health',
      targetBeneficiaries: 'Economically vulnerable families identified via SECC / Priority Ration Card for cashless secondary/tertiary hospitalisation',
      eligibilityRules: [
        { parameter: 'rationCardCategory', operator: 'in', value: ['AAY', 'PHH'], description: 'Must possess Antyodaya (AAY) or Priority Household (PHH) Ration Card', scope: 'household', isHardCriterion: true },
        { parameter: 'incomeCategory', operator: 'in', value: ['BPL', 'EWS'], description: 'Family categorized under BPL or EWS socio-economic band', scope: 'household', isHardCriterion: true }
      ],
      requiredDocuments: [
        { docType: 'Aadhaar', name: 'Aadhaar Card of all family members', isMandatory: true },
        { docType: 'Ration Card', name: 'Active Ration Card with family composition', isMandatory: true }
      ],
      benefitType: 'Insurance Coverage',
      benefitAmount: '₹5,00,000 cashless cover / family / year',
      disbursementFrequency: 'As Needed',
      applicationMethod: 'Proactive Auto-Sanction',
      slaDays: 7,
      status: 'Active',
      budgetAllocatedCr: 7200,
      budgetUtilizedCr: 6800
    },
    {
      schemeId: 'SCH-HOUSING-PMAYG',
      schemeName: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
      department: 'Department of Rural Development',
      category: 'Housing',
      targetBeneficiaries: 'Houseless households and those living in zero, one or two room houses with kutcha roof and wall',
      eligibilityRules: [
        { parameter: 'householdType', operator: 'in', value: ['Kutcha', 'Semi-Pucca'], description: 'Family currently lives in a Kutcha or dilapidated dwelling without Pucca construction', scope: 'household', isHardCriterion: true },
        { parameter: 'annualIncomeINR', operator: '<=', value: 120000, description: 'Household annual income strictly below ₹1.2 Lakh', scope: 'household', isHardCriterion: true }
      ],
      requiredDocuments: [
        { docType: 'Aadhaar', name: 'Aadhaar of Head of Household', isMandatory: true },
        { docType: 'Land Records (7/12)', name: 'Homestead Land Ownership / Gram Panchayat NoC', isMandatory: true },
        { docType: 'Bank Passbook', name: 'DBT-linked Bank Account details', isMandatory: true }
      ],
      benefitType: 'Housing Asset Subsidy',
      benefitAmount: '₹1,20,000 direct construction subsidy',
      disbursementFrequency: 'One-time',
      applicationMethod: 'Village Panchayat Camp',
      slaDays: 45,
      status: 'Active',
      budgetAllocatedCr: 54000,
      budgetUtilizedCr: 48900
    },
    {
      schemeId: 'SCH-AGRI-PMKISAN',
      schemeName: 'PM-KISAN Samman Nidhi',
      department: 'Ministry of Agriculture & Farmers Welfare',
      category: 'Agriculture',
      targetBeneficiaries: 'Small and marginal landholder farmer families with cultivable land up to 2 hectares',
      eligibilityRules: [
        { parameter: 'landHoldingAcres', operator: '>', value: 0, description: 'Family must own cultivable agricultural land', scope: 'household', isHardCriterion: true },
        { parameter: 'landHoldingAcres', operator: '<=', value: 5.0, description: 'Landholding must not exceed 2 hectares (~5 acres)', scope: 'household', isHardCriterion: true },
        { parameter: 'occupation', operator: 'includes', value: 'Farmer', description: 'Head of family engaged in farming', scope: 'individual', isHardCriterion: false }
      ],
      requiredDocuments: [
        { docType: 'Aadhaar', name: 'Aadhaar Card linked with Land Records', isMandatory: true },
        { docType: 'Land Records (7/12)', name: 'Updated RoR / Land 7/12 Document', isMandatory: true },
        { docType: 'Bank Passbook', name: 'Aadhaar Seeded Bank Account', isMandatory: true }
      ],
      benefitType: 'Direct Cash Transfer (DBT)',
      benefitAmount: '₹6,000 / year (₹2,000 per 4-month installment)',
      disbursementFrequency: 'Quarterly',
      applicationMethod: 'Online Portal',
      slaDays: 21,
      status: 'Active',
      budgetAllocatedCr: 60000,
      budgetUtilizedCr: 58200
    },
    {
      schemeId: 'SCH-PENSION-IGNOAPS',
      schemeName: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
      department: 'Department of Social Justice & Empowerment',
      category: 'Pension',
      targetBeneficiaries: 'Senior citizens aged 60 years and above belonging to BPL households',
      eligibilityRules: [
        { parameter: 'age', operator: '>=', value: 60, description: 'Applicant must have attained age of 60 years or above', scope: 'individual', isHardCriterion: true },
        { parameter: 'incomeCategory', operator: '==', value: 'BPL', description: 'Applicant household must be officially certified BPL', scope: 'household', isHardCriterion: true }
      ],
      requiredDocuments: [
        { docType: 'Aadhaar', name: 'Aadhaar Proof of Age & Identity', isMandatory: true },
        { docType: 'BPL Ration Card', name: 'Proof of BPL status', isMandatory: true },
        { docType: 'Bank Passbook', name: 'Single-holder DBT Bank Account', isMandatory: true }
      ],
      benefitType: 'Monthly Pension',
      benefitAmount: '₹1,000 / month direct pension',
      disbursementFrequency: 'Monthly',
      applicationMethod: 'CSC Center',
      slaDays: 30,
      status: 'Active',
      budgetAllocatedCr: 9000,
      budgetUtilizedCr: 8400
    },
    {
      schemeId: 'SCH-FOOD-NFSA',
      schemeName: 'National Food Security Act (NFSA) - Targeted PDS',
      department: 'Department of Food & Public Distribution',
      category: 'Food Security',
      targetBeneficiaries: 'Identified Priority Households (PHH) and Antyodaya Anna Yojana (AAY) families',
      eligibilityRules: [
        { parameter: 'incomeCategory', operator: 'in', value: ['BPL', 'EWS'], description: 'Household income classified as BPL or Economically Weaker Section', scope: 'household', isHardCriterion: true },
        { parameter: 'rationCardCategory', operator: 'in', value: ['AAY', 'PHH'], description: 'Valid NFSA card allotment category', scope: 'household', isHardCriterion: true }
      ],
      requiredDocuments: [
        { docType: 'Ration Card', name: 'Digital Ration Card', isMandatory: true },
        { docType: 'Aadhaar', name: 'Aadhaar of all household members', isMandatory: true }
      ],
      benefitType: 'In-Kind Provision',
      benefitAmount: '25kg subsidized foodgrains per month',
      disbursementFrequency: 'Monthly',
      applicationMethod: 'Proactive Auto-Sanction',
      slaDays: 14,
      status: 'Active',
      budgetAllocatedCr: 210000,
      budgetUtilizedCr: 205000
    },
    {
      schemeId: 'SCH-ENERGY-PMUY',
      schemeName: 'Pradhan Mantri Ujjwala Yojana (PMUY)',
      department: 'Ministry of Petroleum & Natural Gas',
      category: 'Clean Energy',
      targetBeneficiaries: 'Adult female member of an impoverished BPL rural household',
      eligibilityRules: [
        { parameter: 'gender', operator: '==', value: 'Female', description: 'Application must be filed in the name of an adult woman', scope: 'individual', isHardCriterion: true },
        { parameter: 'age', operator: '>=', value: 18, description: 'Woman must be at least 18 years of age', scope: 'individual', isHardCriterion: true },
        { parameter: 'incomeCategory', operator: '==', value: 'BPL', description: 'Family classified as BPL in SECC database', scope: 'household', isHardCriterion: true }
      ],
      requiredDocuments: [
        { docType: 'Aadhaar', name: 'Aadhaar Card of Female Applicant', isMandatory: true },
        { docType: 'Ration Card', name: 'Ration card displaying family structure', isMandatory: true },
        { docType: 'Bank Passbook', name: 'DBT Bank Account for subsidy credit', isMandatory: true }
      ],
      benefitType: 'In-Kind Provision',
      benefitAmount: 'Free LPG Connection + First Refill + Stove Subsidy',
      disbursementFrequency: 'One-time',
      applicationMethod: 'LPG Distributor Counter',
      slaDays: 15,
      status: 'Active',
      budgetAllocatedCr: 12000,
      budgetUtilizedCr: 11400
    }
  ],

  // Live Applications tracking for Family GJ-102938
  applications: [
    {
      applicationId: 'APP-EDU-88291',
      familyId: 'GJ-102938',
      beneficiaryId: 'B-GJ-102-03', // Pooja Patel
      schemeId: 'SCH-EDU-POSTMATRIC',
      department: 'Department of Higher Education',
      currentStage: 'PAYMENT_COMPLETED',
      bottleneckReason: 'None',
      submittedDate: new Date('2024-07-15'),
      targetSLADate: new Date('2024-08-14'),
      isSLABreached: false,
      assignedOfficer: {
        name: 'Dr. V. K. Trivedi',
        designation: 'District Education Officer',
        office: 'Ahmedabad District Collectorate'
      },
      documentsSubmitted: [
        { docType: 'Aadhaar', status: 'Verified', verifiedAt: new Date('2024-07-16') },
        { docType: 'College Admission Bonafide', status: 'Verified', verifiedAt: new Date('2024-07-18') },
        { docType: 'Income Certificate', status: 'Verified', verifiedAt: new Date('2024-07-20') }
      ],
      timeline: [
        { stage: 'IDENTIFIED', status: 'System Identified', remarks: 'Proactively flagged from 12th Board roll database', timestamp: new Date('2024-07-10') },
        { stage: 'APPLIED', status: 'Submitted', remarks: 'Citizen applied via National Scholarship Portal', timestamp: new Date('2024-07-15') },
        { stage: 'DOCUMENTS_VERIFIED', status: 'Approved', remarks: 'College registrar digitally signed enrolment', timestamp: new Date('2024-07-20') },
        { stage: 'APPROVED', status: 'Sanctioned', remarks: 'Sanction Order #SO-EDU-2024-912 issued', timestamp: new Date('2024-07-28') },
        { stage: 'PAYMENT_COMPLETED', status: 'Credited', remarks: 'PFMS DBT Reference #PFMS-9921401 credited ₹5,000 to SBI account', timestamp: new Date('2024-08-05') },
        { stage: 'RECEIPT_CONFIRMED', status: 'Confirmed', remarks: 'Citizen acknowledged SMS OTP receipt', timestamp: new Date('2024-08-06') }
      ]
    },
    {
      applicationId: 'APP-HEALTH-44102',
      familyId: 'GJ-102938',
      beneficiaryId: 'B-GJ-102-01', // Ramesh Patel (Household Card)
      schemeId: 'SCH-HEALTH-PMJAY',
      department: 'National Health Authority',
      currentStage: 'RECEIPT_CONFIRMED',
      bottleneckReason: 'None',
      submittedDate: new Date('2023-01-10'),
      targetSLADate: new Date('2023-01-17'),
      isSLABreached: false,
      assignedOfficer: {
        name: 'Smt. Anjali Joshi',
        designation: 'Ayushman Mitra Nodal',
        office: 'Sanand CHC'
      },
      documentsSubmitted: [
        { docType: 'Aadhaar', status: 'Verified', verifiedAt: new Date('2023-01-11') },
        { docType: 'Ration Card', status: 'Verified', verifiedAt: new Date('2023-01-11') }
      ],
      timeline: [
        { stage: 'IDENTIFIED', status: 'SECC Matched', remarks: 'Pre-seeded from NFSA BPL database', timestamp: new Date('2023-01-05') },
        { stage: 'APPLIED', status: 'eKYC Biometric Done', remarks: 'eKYC validated at Village Panchayat camp', timestamp: new Date('2023-01-10') },
        { stage: 'APPROVED', status: 'Ayushman Card Generated', remarks: 'Golden Card ID #PMJAY-GJ-001928 generated for 5 family members', timestamp: new Date('2023-01-12') },
        { stage: 'RECEIPT_CONFIRMED', status: 'Active Card', remarks: 'PVC Card physically delivered by ASHA worker', timestamp: new Date('2023-01-20') }
      ]
    },
    {
      applicationId: 'APP-AGRI-10928',
      familyId: 'GJ-102938',
      beneficiaryId: 'B-GJ-102-01', // Ramesh Patel
      schemeId: 'SCH-AGRI-PMKISAN',
      department: 'Ministry of Agriculture & Farmers Welfare',
      currentStage: 'FIELD_VERIFIED', // Stuck / Pending in pipeline!
      bottleneckReason: 'Field Verification',
      submittedDate: new Date('2024-06-01'),
      targetSLADate: new Date('2024-06-22'),
      isSLABreached: true, // Approaching or past SLA
      assignedOfficer: {
        name: 'Shri Manoj Solanki',
        designation: 'Talati / Revenue Inspector',
        office: 'Sanand Block Revenue Office'
      },
      documentsSubmitted: [
        { docType: 'Aadhaar', status: 'Verified', verifiedAt: new Date('2024-06-02') },
        { docType: 'Land Records (7/12)', status: 'Verified', verifiedAt: new Date('2024-06-05') },
        { docType: 'Bank Passbook', status: 'Verified', verifiedAt: new Date('2024-06-05') }
      ],
      timeline: [
        { stage: 'APPLIED', status: 'Submitted', remarks: 'Online portal registration with land survey #102/3', timestamp: new Date('2024-06-01') },
        { stage: 'DOCUMENTS_VERIFIED', status: 'Verified', remarks: 'Aadhaar authentication successful', timestamp: new Date('2024-06-05') },
        { stage: 'FIELD_VERIFIED', status: 'Pending Approval', remarks: 'Talati land-ownership physical inspection completed, awaiting batch sign-off', timestamp: new Date('2024-06-18') }
      ]
    }
  ],

  // Benefit Disbursements
  disbursements: [
    {
      disbursementId: 'DISB-2024-001',
      applicationId: 'APP-EDU-88291',
      beneficiaryId: 'B-GJ-102-03',
      familyId: 'GJ-102938',
      schemeId: 'SCH-EDU-POSTMATRIC',
      department: 'Department of Higher Education',
      benefitType: 'Direct Cash Transfer (DBT)',
      amountINR: 5000,
      benefitDescription: 'Academic Year 2024-25 Higher Secondary & College Maintenance Allowance',
      paymentChannel: 'PFMS Direct Credit',
      transactionRef: 'PFMS-992140109',
      initiatedDate: new Date('2024-08-01'),
      completedDate: new Date('2024-08-05'),
      paymentStatus: 'Completed',
      beneficiaryConfirmation: {
        status: 'Confirmed Received',
        confirmedDate: new Date('2024-08-06'),
        feedbackRating: 5,
        remarks: 'Received in SBI savings account without deduction'
      },
      isDeliveryException: false
    },
    {
      disbursementId: 'DISB-2024-002',
      applicationId: 'APP-HEALTH-44102',
      beneficiaryId: 'B-GJ-102-01',
      familyId: 'GJ-102938',
      schemeId: 'SCH-HEALTH-PMJAY',
      department: 'National Health Authority',
      benefitType: 'Insurance Coverage',
      amountINR: 0,
      benefitDescription: 'Ayushman Card Wallet Activated for ₹5,00,000 Cashless Secondary/Tertiary Care',
      paymentChannel: 'Card Sanction',
      transactionRef: 'PMJAY-WALLET-GJ-102938',
      initiatedDate: new Date('2023-01-12'),
      completedDate: new Date('2023-01-12'),
      paymentStatus: 'Completed',
      beneficiaryConfirmation: {
        status: 'Confirmed Received',
        confirmedDate: new Date('2023-01-20'),
        feedbackRating: 5,
        remarks: 'Received printed PVC card'
      },
      isDeliveryException: false
    },
    {
      disbursementId: 'DISB-2024-003',
      applicationId: 'APP-FOOD-AUTO',
      beneficiaryId: 'B-GJ-102-01',
      familyId: 'GJ-102938',
      schemeId: 'SCH-FOOD-NFSA',
      department: 'Department of Food & Public Distribution',
      benefitType: 'In-Kind Provision',
      amountINR: 1250,
      benefitDescription: 'Monthly Allocation: 25kg Subsidized Grains (15kg Wheat, 10kg Rice)',
      paymentChannel: 'In-Kind Delivery',
      transactionRef: 'EPOS-FPS-SANAND-04',
      initiatedDate: new Date('2024-08-01'),
      completedDate: new Date('2024-08-04'),
      paymentStatus: 'Completed',
      beneficiaryConfirmation: {
        status: 'Confirmed Received',
        confirmedDate: new Date('2024-08-04'),
        feedbackRating: 4,
        remarks: 'Biometric authenticated at Fair Price Shop #4'
      },
      isDeliveryException: false
    },
    {
      disbursementId: 'DISB-2024-004',
      applicationId: 'APP-UJY-AUTO',
      beneficiaryId: 'B-GJ-102-02',
      familyId: 'GJ-102938',
      schemeId: 'SCH-ENERGY-PMUY',
      department: 'Ministry of Petroleum & Natural Gas',
      benefitType: 'In-Kind Provision',
      amountINR: 2600,
      benefitDescription: '14.2kg Subsidized LPG Cylinder + Dual-burner Stove + Regulator',
      paymentChannel: 'In-Kind Delivery',
      transactionRef: 'IOCL-SANAND-88910',
      initiatedDate: new Date('2023-05-10'),
      completedDate: new Date('2023-05-15'),
      paymentStatus: 'Completed',
      beneficiaryConfirmation: {
        status: 'Confirmed Received',
        confirmedDate: new Date('2023-05-16'),
        feedbackRating: 5,
        remarks: 'Installed by Indane agency representative'
      },
      isDeliveryException: false
    },
    // Example of a Delivery Exception (Last-mile monitoring)
    {
      disbursementId: 'DISB-2024-099',
      applicationId: 'APP-AGRI-PREV-INSTALL',
      beneficiaryId: 'B-GJ-102-01',
      familyId: 'GJ-102938',
      schemeId: 'SCH-AGRI-PMKISAN',
      department: 'Ministry of Agriculture & Farmers Welfare',
      benefitType: 'Direct Cash Transfer (DBT)',
      amountINR: 2000,
      benefitDescription: 'PM-KISAN 16th Installment (Apr-Jul 2024)',
      paymentChannel: 'PFMS Direct Credit',
      transactionRef: 'PFMS-881900332',
      initiatedDate: new Date('2024-05-02'),
      completedDate: new Date('2024-05-05'),
      paymentStatus: 'Completed',
      beneficiaryConfirmation: {
        status: 'Reported Not Received',
        confirmedDate: new Date('2024-06-10'),
        feedbackRating: 1,
        remarks: 'Bank passbook updated: Amount credited to inactive Jan Dhan account in previous branch instead of primary SBI account'
      },
      isDeliveryException: true, // FLAG TRIGGERED!
      exceptionInvestigationStatus: 'Under Investigation'
    }
  ],

  // Grievance contextualized with Beneficiary, Scheme, and Application
  grievances: [
    {
      grievanceId: 'GRV-2024-1029',
      familyId: 'GJ-102938',
      beneficiaryId: 'B-GJ-102-01',
      schemeId: 'SCH-AGRI-PMKISAN',
      applicationId: 'APP-AGRI-10928',
      disbursementId: 'DISB-2024-099',
      department: 'Ministry of Agriculture & Farmers Welfare',
      lifecycleStageAtIssue: 'PAYMENT_COMPLETED',
      issueCategory: 'Payment Approved But Not Received',
      description: 'System marks PM-KISAN 16th Installment ₹2,000 as "Completed" on 05-May-2024, but beneficiary account passbook at SBI Sanand shows no credit. Suspected wrong Aadhaar Mapper bank mapping.',
      severity: 'High',
      status: 'Open',
      filedDate: new Date('2024-06-12'),
      slaDays: 7,
      isSLABreached: true,
      timeline: [
        { status: 'Filed', action: 'Citizen reported via CSC Sanand Helpdesk', officer: 'Vipin Shah (CSC VLE)', department: 'Common Services Center', timestamp: new Date('2024-06-12') },
        { status: 'Routed', action: 'Auto-routed to Block Agricultural Nodal Officer with 360° dossier', officer: 'System Dispatcher', department: 'Agriculture', timestamp: new Date('2024-06-12') },
        { status: 'Under Department Review', action: 'NPCI Aadhaar Mapper query initiated to verify active bank IIN', officer: 'Shri Manoj Solanki (Inspector)', department: 'Agriculture', timestamp: new Date('2024-06-15') }
      ]
    }
  ],

  // Exception Alerts (Feature 16)
  exceptionAlerts: [
    {
      alertId: 'ALT-01',
      alertType: 'SLA_BREACH_APPROACHING',
      severity: 'Warning',
      title: '12,400 Applications Approaching SLA',
      description: 'Applications pending within 48 hours of statutory citizen charter deadline across Education and Agriculture.',
      count: 12400,
      department: 'Multi-Department',
      actionRequired: 'Issue auto-escalation notice to Block Development Officers.'
    },
    {
      alertId: 'ALT-02',
      alertType: 'PAYMENT_PENDING_AFTER_APPROVAL',
      severity: 'Critical',
      title: '3,200 Approved but Payment Pending',
      description: 'Sanction orders issued by departmental heads over 30 days ago without PFMS disbursement trigger.',
      count: 3200,
      department: 'Rural Development & Social Welfare',
      actionRequired: 'Trigger treasury batch push to Public Financial Management System.'
    },
    {
      alertId: 'ALT-03',
      alertType: 'BENEFICIARY_NON_RECEIPT_EXCEPTION',
      severity: 'Critical',
      title: '1,840 Beneficiaries Reporting Non-Receipt',
      description: 'Banking network reports success, but citizens confirmed non-receipt during IVRS / ASHA audit.',
      count: 1840,
      department: 'Agriculture & Education',
      actionRequired: 'Audit NPCI Aadhaar bank mapper records for dormant account routing.'
    },
    {
      alertId: 'ALT-04',
      alertType: 'INCOMPLETE_APPLICATION_DOCS',
      severity: 'Warning',
      title: '5,200 Incomplete Applications',
      description: 'Applications held in Document Verification queue due to missing income/caste certificates.',
      count: 5200,
      department: 'Higher Education',
      actionRequired: 'Trigger automated WhatsApp/SMS upload reminder link to applicant.'
    },
    {
      alertId: 'ALT-05',
      alertType: 'POTENTIAL_DUPLICATE_OVERLAP',
      severity: 'Warning',
      title: '2,100 Potential Duplicate / Overlapping Records',
      description: 'Duplicate Aadhaar/bank account instances detected across inter-district housing & pension registries requiring field verification.',
      count: 2100,
      department: 'Social Welfare & Housing',
      actionRequired: 'Dispatch physical verification task to Village Administrative Officer.'
    },
    {
      alertId: 'ALT-06',
      alertType: 'ELIGIBLE_UNSERVED_OUTREACH',
      severity: 'Info',
      title: '8,400 Eligible Beneficiaries Not Yet Applied',
      description: 'SECC BPL families meeting 100% PMAY-G & Scholarship criteria with zero applications filed.',
      count: 8400,
      department: 'Rural Development',
      actionRequired: 'Generate camp roster for Gram Panchayat proactive registration drive.'
    }
  ],

  // Command Dashboard Department-wise Delivery Matrix (Feature 14)
  departmentMetrics: [
    {
      department: 'Education',
      category: 'Education',
      eligible: 120000,
      applied: 90000,
      approved: 75000,
      delivered: 70000,
      unserved: 50000,
      conversionRate: '58.3%'
    },
    {
      department: 'Healthcare',
      category: 'Health',
      eligible: 200000,
      applied: 180000,
      approved: 160000,
      delivered: 155000,
      unserved: 45000,
      conversionRate: '77.5%'
    },
    {
      department: 'Housing',
      category: 'Housing',
      eligible: 80000,
      applied: 52000,
      approved: 40000,
      delivered: 38000,
      unserved: 42000,
      conversionRate: '47.5%'
    },
    {
      department: 'Agriculture',
      category: 'Agriculture',
      eligible: 150000,
      applied: 120000,
      approved: 110000,
      delivered: 105000,
      unserved: 45000,
      conversionRate: '70.0%'
    },
    {
      department: 'Social Justice (Pension)',
      category: 'Pension',
      eligible: 95000,
      applied: 78000,
      approved: 71000,
      delivered: 69000,
      unserved: 26000,
      conversionRate: '72.6%'
    }
  ],

  // Conversion Funnel Data (Feature 15)
  conversionFunnel: [
    { stage: 'ELIGIBLE', count: 100000, percentage: 100, dropOff: null, notes: 'Total universe identified via Family ID Registry' },
    { stage: 'APPLIED', count: 72000, percentage: 72, dropOff: '28% Did not apply (Awareness & Access barrier)', notes: 'Proactive outreach required for 28,000' },
    { stage: 'VERIFIED', count: 65000, percentage: 65, dropOff: '9.7% Document & Field verification pending', notes: 'Bottleneck at Talati & Registrar level' },
    { stage: 'APPROVED', count: 60000, percentage: 60, dropOff: '7.7% Rejected (Income / Landholding ineligibility)', notes: 'Formal rejection orders dispatched' },
    { stage: 'BENEFIT DELIVERED', count: 55000, percentage: 55, dropOff: '8.3% Treasury sanction & PFMS delay', notes: 'Payment batch initiated' },
    { stage: 'BENEFIT CONFIRMED', count: 52000, percentage: 52, dropOff: '5.5% Delivery Exception / Bank mapping fault', notes: '1,840 reported non-receipt; under review' }
  ],

  // Application Bottleneck Data (Feature 7 & 10)
  applicationBottlenecks: {
    totalPending: 2431,
    stages: [
      { name: 'Department Review', count: 1200, percentage: 49.4, avgDays: 14, icon: '🏛️' },
      { name: 'Document Verification', count: 631, percentage: 26.0, avgDays: 9, icon: '📄' },
      { name: 'Field Verification', count: 400, percentage: 16.5, avgDays: 19, icon: '🌾' },
      { name: 'Payment Processing', count: 200, percentage: 8.2, avgDays: 6, icon: '💳' }
    ]
  },

  // Gap Analysis Data (Feature 4)
  gapAnalysis: {
    schemeName: 'Education Scholarship (Post-Matric)',
    schemeId: 'SCH-EDU-POSTMATRIC',
    potentiallyEligible: 100000,
    applicationsReceived: 72000,
    approved: 60000,
    benefitsDelivered: 55000,
    potentiallyUnserved: 45000,
    unservedBreakdown: [
      { reason: "Didn't Apply", count: 20000, percentage: 44.4, color: '#3b82f6', action: 'Launch School/College Outreach' },
      { reason: 'Application Pending', count: 10000, percentage: 22.2, color: '#f59e0b', action: 'Fast-track Desk Verification' },
      { reason: 'Missing Documents', count: 8000, percentage: 17.8, color: '#ec4899', action: 'WhatsApp/SMS Document Link' },
      { reason: 'Rejected', count: 5000, percentage: 11.1, color: '#ef4444', action: 'Review Grievance Appeals' },
      { reason: 'Payment Issue', count: 2000, percentage: 4.4, color: '#8b5cf6', action: 'Aadhaar NPCI Re-mapping' }
    ]
  },

  // Cross-Scheme Overlap Data (Feature 5)
  crossSchemeOverlap: {
    totalEvaluated: 180000,
    schemes: [
      { name: 'Scheme A (Education Scholarship)', count: 100000, color: '#3b82f6' },
      { name: 'Scheme B (Ayushman Health)', count: 80000, color: '#10b981' },
      { name: 'Scheme C (PM-KISAN Agriculture)', count: 60000, color: '#f59e0b' }
    ],
    intersections: [
      { label: 'A ∩ B (Education & Health)', count: 40000, percentage: 22.2, description: 'Beneficiaries receiving both Student Scholarship & Health Insurance cover.' },
      { label: 'A ∩ C (Education & Agri)', count: 20000, percentage: 11.1, description: 'Farmer families with children enrolled in Post-Matric scholarships.' },
      { label: 'B ∩ C (Health & Agri)', count: 15000, percentage: 8.3, description: 'Smallholders with active Ayushman Golden Cards.' },
      { label: 'A ∩ B ∩ C (Triple Overlap)', count: 8000, percentage: 4.4, description: 'Families receiving concurrent benefits across Education, Health, and Agriculture.' }
    ],
    underservedCount: 32000 // Eligible for at least 1 scheme but receiving 0
  },

  // Proactive Outreach by District (Feature 10 & 13)
  proactiveOutreach: {
    schemeName: 'Housing Assistance (PMAY-G)',
    schemeId: 'SCH-HOUSING-PMAYG',
    potentiallyEligible: 25000,
    applied: 14200,
    notApplied: 10800,
    districtPriorities: [
      { district: 'Ahmedabad (Rural)', state: 'Gujarat', unservedCount: 3200, priority: 'High', campsScheduled: 8, ashaWorkersAssigned: 45 },
      { district: 'Banaskantha', state: 'Gujarat', unservedCount: 2800, priority: 'High', campsScheduled: 12, ashaWorkersAssigned: 60 },
      { district: 'Dahod', state: 'Gujarat', unservedCount: 2100, priority: 'Medium', campsScheduled: 6, ashaWorkersAssigned: 32 },
      { district: 'Panchmahal', state: 'Gujarat', unservedCount: 1900, priority: 'Medium', campsScheduled: 5, ashaWorkersAssigned: 28 },
      { district: 'Sabarkantha & Others', state: 'Gujarat', unservedCount: 800, priority: 'Normal', campsScheduled: 3, ashaWorkersAssigned: 15 }
    ]
  }
};

module.exports = seedData;
