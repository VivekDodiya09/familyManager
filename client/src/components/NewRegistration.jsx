import React, { useState, useEffect } from 'react';
import { registerBeneficiary, addBeneficiaryMember, fetchBeneficiarySearch } from '../services/api';

export default function NewRegistration({
  initialMode = 'new-family',
  prefilledFamilyId = '',
  onRegistrationSuccess,
  onNavigateTo360
}) {
  const [mode, setMode] = useState(initialMode); // 'new-family' or 'add-member'
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);

  // Mode A: New Family State
  const [familyData, setFamilyData] = useState({
    familyId: '',
    rationCardNumber: '',
    rationCardCategory: 'PHH',
    householdType: 'Kutcha',
    landHoldingAcres: 1.5,
    annualIncomeINR: 48000,
    incomeCategory: 'BPL',
    hasElectricity: true,
    hasToilet: true,
    hasDrinkingWater: false,
    address: {
      house: 'Plot No. 42, Vrundavan Society',
      village: 'Sanand Gram',
      block: 'Sanand',
      district: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382110'
    }
  });

  const [headBeneficiary, setHeadBeneficiary] = useState({
    name: '',
    dob: '1984-05-12',
    gender: 'Male',
    aadhaarToken: '',
    mobileNumber: '',
    email: '',
    caste: 'OBC',
    religion: 'Hindu',
    maritalStatus: 'Married',
    educationLevel: 'Secondary (10th)',
    occupation: 'Small Farmer / Agricultural Laborer',
    annualIncomeINR: 48000,
    isDisabled: false,
    disabilityType: 'None',
    disabilityPercentage: 0,
    bankAccountNumber: '',
    bankIFSC: 'SBIN0001245',
    bankName: 'State Bank of India',
    dbtLinked: true,
    eKycVerified: true
  });

  const [members, setMembers] = useState([
    {
      id: 1,
      name: '',
      dob: '1988-08-20',
      gender: 'Female',
      relationToHead: 'Spouse',
      aadhaarToken: '',
      mobileNumber: '',
      caste: 'OBC',
      occupation: 'Homemaker / Farm Helper',
      educationLevel: 'Primary (5th)',
      isDisabled: false,
      disabilityType: 'None',
      bankAccountNumber: '',
      bankIFSC: 'SBIN0001245',
      bankName: 'State Bank of India',
      dbtLinked: true,
      eKycVerified: true
    }
  ]);

  // Mode B: Add Member to Existing Family State
  const [targetFamilyId, setTargetFamilyId] = useState(prefilledFamilyId || 'GJ-102938');
  const [existingFamilyInfo, setExistingFamilyInfo] = useState(null);
  const [loadingFamilyInfo, setLoadingFamilyInfo] = useState(false);

  const [newMemberData, setNewMemberData] = useState({
    name: '',
    dob: '2004-03-15',
    gender: 'Female',
    relationToHead: 'Daughter',
    aadhaarToken: '',
    mobileNumber: '',
    email: '',
    caste: 'OBC',
    religion: 'Hindu',
    maritalStatus: 'Single',
    educationLevel: 'Higher Secondary (12th)',
    occupation: 'Student',
    annualIncomeINR: 0,
    isDisabled: false,
    disabilityType: 'None',
    disabilityPercentage: 0,
    bankAccountNumber: '',
    bankIFSC: 'SBIN0001234',
    bankName: 'State Bank of India',
    dbtLinked: true,
    eKycVerified: true
  });

  useEffect(() => {
    if (initialMode) setMode(initialMode);
    if (prefilledFamilyId) {
      setTargetFamilyId(prefilledFamilyId);
      loadTargetFamily(prefilledFamilyId);
    }
  }, [initialMode, prefilledFamilyId]);

  useEffect(() => {
    if (mode === 'add-member' && targetFamilyId) {
      loadTargetFamily(targetFamilyId);
    }
  }, [mode, targetFamilyId]);

  const loadTargetFamily = async (fId) => {
    setLoadingFamilyInfo(true);
    try {
      const data = await fetchBeneficiarySearch(fId);
      if (data && data.family) {
        setExistingFamilyInfo(data);
      }
    } catch (err) {
      console.warn('Could not load target family:', err);
    } finally {
      setLoadingFamilyInfo(false);
    }
  };

  // Demo Quick-Fill Presets
  const applyDemoPreset = (type) => {
    setErrorMsg('');
    if (type === 'rural-farmer') {
      const rand = Math.floor(100000 + Math.random() * 900000);
      setFamilyData({
        familyId: `GJ-${rand}`,
        rationCardNumber: `RC-GJ-${rand}`,
        rationCardCategory: 'AAY',
        householdType: 'Kutcha',
        landHoldingAcres: 1.2,
        annualIncomeINR: 36000,
        incomeCategory: 'BPL',
        hasElectricity: true,
        hasToilet: false,
        hasDrinkingWater: false,
        address: {
          house: 'Ward 3, Near Primary School',
          village: 'Bavla Khurd',
          block: 'Bavla',
          district: 'Ahmedabad',
          state: 'Gujarat',
          pincode: '382220'
        }
      });
      setHeadBeneficiary({
        name: 'Govindbhai Rathod',
        dob: '1982-03-10',
        gender: 'Male',
        aadhaarToken: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
        mobileNumber: '9825102938',
        email: '',
        caste: 'SC',
        religion: 'Hindu',
        maritalStatus: 'Married',
        educationLevel: 'Middle (8th)',
        occupation: 'Marginal Farmer',
        annualIncomeINR: 36000,
        isDisabled: false,
        disabilityType: 'None',
        disabilityPercentage: 0,
        bankAccountNumber: '918230192831',
        bankIFSC: 'BARB0BAVLAA',
        bankName: 'Bank of Baroda',
        dbtLinked: true,
        eKycVerified: true
      });
      setMembers([
        {
          id: 1,
          name: 'Shantaben Rathod',
          dob: '1986-07-14',
          gender: 'Female',
          relationToHead: 'Spouse',
          aadhaarToken: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
          mobileNumber: '9825102939',
          caste: 'SC',
          occupation: 'Farm Laborer',
          educationLevel: 'Illiterate',
          isDisabled: false,
          disabilityType: 'None',
          bankAccountNumber: '918230192832',
          bankIFSC: 'BARB0BAVLAA',
          bankName: 'Bank of Baroda',
          dbtLinked: true,
          eKycVerified: true
        },
        {
          id: 2,
          name: 'Kiran Rathod',
          dob: '2008-09-15',
          gender: 'Female',
          relationToHead: 'Daughter',
          aadhaarToken: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
          mobileNumber: '9825102938',
          caste: 'SC',
          occupation: 'Student (Class 10)',
          educationLevel: 'Secondary (10th)',
          isDisabled: false,
          disabilityType: 'None',
          bankAccountNumber: '',
          bankIFSC: '',
          bankName: '',
          dbtLinked: false,
          eKycVerified: true
        }
      ]);
    } else if (type === 'urban-ews') {
      const rand = Math.floor(100000 + Math.random() * 900000);
      setFamilyData({
        familyId: `MH-${rand}`,
        rationCardNumber: `RC-MH-${rand}`,
        rationCardCategory: 'PHH',
        householdType: 'Semi-Pucca',
        landHoldingAcres: 0,
        annualIncomeINR: 75000,
        incomeCategory: 'EWS',
        hasElectricity: true,
        hasToilet: true,
        hasDrinkingWater: true,
        address: {
          house: 'Room 14, Chawl No. 3',
          village: 'Dharavi Sector 5',
          block: 'Mumbai City',
          district: 'Mumbai Suburban',
          state: 'Maharashtra',
          pincode: '400017'
        }
      });
      setHeadBeneficiary({
        name: 'Sunil Shinde',
        dob: '1979-11-25',
        gender: 'Male',
        aadhaarToken: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
        mobileNumber: '9819283746',
        email: 'sunil.shinde@mail.com',
        caste: 'General',
        religion: 'Hindu',
        maritalStatus: 'Married',
        educationLevel: 'Secondary (10th)',
        occupation: 'Auto Rickshaw Driver',
        annualIncomeINR: 75000,
        isDisabled: false,
        disabilityType: 'None',
        disabilityPercentage: 0,
        bankAccountNumber: '302918239102',
        bankIFSC: 'MAHB0000213',
        bankName: 'Bank of Maharashtra',
        dbtLinked: true,
        eKycVerified: true
      });
      setMembers([
        {
          id: 1,
          name: 'Pooja Shinde',
          dob: '1983-04-18',
          gender: 'Female',
          relationToHead: 'Spouse',
          aadhaarToken: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
          mobileNumber: '9819283747',
          caste: 'General',
          occupation: 'Domestic Helper',
          educationLevel: 'Middle (8th)',
          isDisabled: false,
          disabilityType: 'None',
          bankAccountNumber: '302918239105',
          bankIFSC: 'MAHB0000213',
          bankName: 'Bank of Maharashtra',
          dbtLinked: true,
          eKycVerified: true
        }
      ]);
    }
  };

  const applyAddMemberPreset = (preset) => {
    setErrorMsg('');
    const rand = Math.floor(1000 + Math.random() * 9000);
    if (preset === 'newborn') {
      setNewMemberData({
        name: 'Aarav Patel',
        dob: '2024-01-10',
        gender: 'Male',
        relationToHead: 'Son',
        aadhaarToken: `XXXX-XXXX-${rand}`,
        mobileNumber: '',
        email: '',
        caste: 'OBC',
        religion: 'Hindu',
        maritalStatus: 'Single',
        educationLevel: 'Infant',
        occupation: 'Dependent',
        annualIncomeINR: 0,
        isDisabled: false,
        disabilityType: 'None',
        disabilityPercentage: 0,
        bankAccountNumber: '',
        bankIFSC: '',
        bankName: '',
        dbtLinked: false,
        eKycVerified: false
      });
    } else if (preset === 'elderly') {
      setNewMemberData({
        name: 'Kashiben Patel',
        dob: '1954-10-05',
        gender: 'Female',
        relationToHead: 'Mother',
        aadhaarToken: `XXXX-XXXX-${rand}`,
        mobileNumber: '9825102938',
        email: '',
        caste: 'OBC',
        religion: 'Hindu',
        maritalStatus: 'Widowed',
        educationLevel: 'Primary (4th)',
        occupation: 'Senior Citizen / Pensioner',
        annualIncomeINR: 0,
        isDisabled: true,
        disabilityType: 'Locomotor',
        disabilityPercentage: 45,
        bankAccountNumber: '492019283746',
        bankIFSC: 'SBIN0001234',
        bankName: 'State Bank of India',
        dbtLinked: true,
        eKycVerified: true
      });
    } else if (preset === 'student') {
      setNewMemberData({
        name: 'Divya Patel',
        dob: '2005-06-18',
        gender: 'Female',
        relationToHead: 'Daughter',
        aadhaarToken: `XXXX-XXXX-${rand}`,
        mobileNumber: '9825102940',
        email: 'divya.p@student.ac.in',
        caste: 'OBC',
        religion: 'Hindu',
        maritalStatus: 'Single',
        educationLevel: 'Undergraduate (B.Sc)',
        occupation: 'College Student',
        annualIncomeINR: 0,
        isDisabled: false,
        disabilityType: 'None',
        disabilityPercentage: 0,
        bankAccountNumber: '492019283999',
        bankIFSC: 'SBIN0001234',
        bankName: 'State Bank of India',
        dbtLinked: true,
        eKycVerified: true
      });
    }
  };

  // Add/Remove dynamic members in Mode A
  const handleAddMemberRow = () => {
    setMembers([
      ...members,
      {
        id: Date.now(),
        name: '',
        dob: '2005-01-01',
        gender: 'Female',
        relationToHead: 'Child',
        aadhaarToken: '',
        mobileNumber: '',
        caste: headBeneficiary.caste || 'OBC',
        occupation: 'Student',
        educationLevel: 'Secondary',
        isDisabled: false,
        disabilityType: 'None',
        bankAccountNumber: '',
        bankIFSC: '',
        bankName: '',
        dbtLinked: false,
        eKycVerified: false
      }
    ]);
  };

  const handleRemoveMemberRow = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleUpdateMemberRow = (id, field, value) => {
    setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  // Handle Mode A submission (Register New Family)
  const handleSubmitNewFamily = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!headBeneficiary.name.trim()) {
      setErrorMsg('Head of Household full name is required.');
      setCurrentStep(2);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        family: familyData,
        headBeneficiary: headBeneficiary,
        members: members.filter(m => m.name && m.name.trim().length > 0)
      };

      const result = await registerBeneficiary(payload);
      if (result.success) {
        setSuccessData({
          type: 'new-family',
          familyId: result.familyId,
          message: result.message,
          membersCount: result.members ? result.members.length : 1
        });
        if (onRegistrationSuccess) {
          onRegistrationSuccess(result.familyId);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to complete registration.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Mode B submission (Add Member to Existing Family)
  const handleSubmitAddMember = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!targetFamilyId.trim()) {
      setErrorMsg('Target Family ID is required.');
      return;
    }
    if (!newMemberData.name.trim()) {
      setErrorMsg('Beneficiary full name is required.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        familyId: targetFamilyId.trim().toUpperCase(),
        member: newMemberData
      };

      const result = await addBeneficiaryMember(payload);
      if (result.success) {
        setSuccessData({
          type: 'add-member',
          familyId: result.familyId,
          message: result.message,
          memberName: result.member?.name,
          beneficiaryId: result.member?.beneficiaryId,
          totalMembers: result.totalMembers
        });
        if (onRegistrationSuccess) {
          onRegistrationSuccess(result.familyId);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to add member to family.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoTo360 = (fId) => {
    if (onNavigateTo360) {
      onNavigateTo360(fId);
    }
  };

  return (
    <div className="registration-container animate-fade-in">
      {/* Top Banner & Mode Toggle */}
      <div className="glass-card mb-4" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.8rem' }}>📝</span>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Beneficiary Registry & Family Onboarding
                </h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Common Family Identity Layer (State Master Registry & DBT Seeded e-KYC Enrolment)
                </div>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="mode-toggle-group">
            <button
              type="button"
              className={`mode-toggle-btn ${mode === 'new-family' ? 'active' : ''}`}
              onClick={() => {
                setMode('new-family');
                setSuccessData(null);
                setErrorMsg('');
              }}
            >
              <span>🏠 Register New Family</span>
              <span className="mode-badge">Full Household</span>
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${mode === 'add-member' ? 'active' : ''}`}
              onClick={() => {
                setMode('add-member');
                setSuccessData(null);
                setErrorMsg('');
              }}
            >
              <span>👤 Add Beneficiary to Family</span>
              <span className="mode-badge">Existing ID</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Card */}
      {successData && (
        <div className="glass-card success-banner mb-4 animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="success-icon-badge">✅</div>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  {successData.type === 'new-family' ? 'Family Successfully Enrolled!' : 'Beneficiary Successfully Added!'}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {successData.message}
                </p>
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', alignItems: 'center' }}>
                  <span className="badge badge-info">Family ID: {successData.familyId}</span>
                  {successData.beneficiaryId && (
                    <span className="badge badge-success">Beneficiary ID: {successData.beneficiaryId}</span>
                  )}
                  <span className="badge badge-neutral">Identity Layer Synced</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleGoTo360(successData.familyId)}
              >
                <span>🏛️ Open in Beneficiary 360°</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSuccessData(null);
                  if (mode === 'new-family') {
                    setCurrentStep(1);
                    setHeadBeneficiary(prev => ({ ...prev, name: '', aadhaarToken: '', mobileNumber: '' }));
                  } else {
                    setNewMemberData(prev => ({ ...prev, name: '', aadhaarToken: '', mobileNumber: '' }));
                  }
                }}
              >
                + Register Another
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="alert-strip critical mb-4">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <div className="alert-title">Registration Validation Error</div>
            <div className="alert-desc">{errorMsg}</div>
          </div>
        </div>
      )}

      {/* MODE A: REGISTER NEW FAMILY */}
      {mode === 'new-family' && (
        <div className="glass-card">
          {/* Quick Fill Presets */}
          <div className="presets-bar">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ⚡ Quick Fill Demo Household:
            </span>
            <button
              type="button"
              className="preset-chip"
              onClick={() => applyDemoPreset('rural-farmer')}
            >
              🌾 Rural Agricultural BPL Family (Gujarat)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => applyDemoPreset('urban-ews')}
            >
              🏗️ Urban Informal EWS Family (Maharashtra)
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="registration-steps">
            {[
              { num: 1, title: 'Household & Location', icon: '🏠' },
              { num: 2, title: 'Head of Household', icon: '👤' },
              { num: 3, title: 'Family Dependents', icon: '👨‍👩‍👧' },
              { num: 4, title: 'Review & Scan', icon: '📋' }
            ].map(step => (
              <div
                key={step.num}
                className={`step-item ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
                onClick={() => setCurrentStep(step.num)}
              >
                <div className="step-circle">{currentStep > step.num ? '✓' : step.num}</div>
                <div className="step-text">
                  <span className="step-subtitle">Step 0{step.num}</span>
                  <span className="step-name">{step.title}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmitNewFamily}>
            {/* STEP 1: HOUSEHOLD & LOCATION */}
            {currentStep === 1 && (
              <div className="form-step-content animate-fade-in">
                <div className="section-header">
                  <h3 className="section-title">1. Household & Socio-Economic Identity Anchor</h3>
                  <p className="section-desc">Defines the common Family ID master anchor used across government welfare departments.</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Family ID (Leave blank to auto-generate)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. GJ-849201"
                      value={familyData.familyId}
                      onChange={e => setFamilyData({ ...familyData, familyId: e.target.value.toUpperCase() })}
                    />
                    <span className="form-hint">Unique alpha-numeric identity anchor (e.g. STATE-XXXXXX)</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ration Card Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. RC-GJ-849201"
                      value={familyData.rationCardNumber}
                      onChange={e => setFamilyData({ ...familyData, rationCardNumber: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ration Card Category</label>
                    <select
                      className="form-select"
                      value={familyData.rationCardCategory}
                      onChange={e => setFamilyData({ ...familyData, rationCardCategory: e.target.value })}
                    >
                      <option value="AAY">Antyodaya Anna Yojana (AAY - Poorest of Poor)</option>
                      <option value="PHH">Priority Household (PHH / BPL)</option>
                      <option value="NPHH">Non-Priority Household (NPHH / APL)</option>
                      <option value="NONE">None / Not Issued</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Dwelling / Housing Structure</label>
                    <select
                      className="form-select"
                      value={familyData.householdType}
                      onChange={e => setFamilyData({ ...familyData, householdType: e.target.value })}
                    >
                      <option value="Kutcha">Kutcha (Thatched / Mud / Tin - PMAY High Priority)</option>
                      <option value="Semi-Pucca">Semi-Pucca (Brick walls, unplastered / sheet roof)</option>
                      <option value="Pucca">Pucca (Reinforced concrete / permanent)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Agricultural Land Holding (Acres)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-input"
                      value={familyData.landHoldingAcres}
                      onChange={e => setFamilyData({ ...familyData, landHoldingAcres: e.target.value })}
                    />
                    <span className="form-hint">Used for PM-KISAN (ceiling: ≤ 5.0 acres for small/marginal)</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Annual Household Income (₹ INR)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={familyData.annualIncomeINR}
                      onChange={e => setFamilyData({ ...familyData, annualIncomeINR: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Income Category</label>
                    <select
                      className="form-select"
                      value={familyData.incomeCategory}
                      onChange={e => setFamilyData({ ...familyData, incomeCategory: e.target.value })}
                    >
                      <option value="BPL">Below Poverty Line (BPL)</option>
                      <option value="EWS">Economically Weaker Section (EWS)</option>
                      <option value="LIG">Low Income Group (LIG)</option>
                      <option value="MIG">Middle Income Group (MIG)</option>
                      <option value="APL">Above Poverty Line (APL)</option>
                    </select>
                  </div>
                </div>

                {/* Address Sub-section */}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.8rem' }}>
                    📍 Geographic & Administrative Location
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">House / Locality / Street</label>
                      <input
                        type="text"
                        className="form-input"
                        value={familyData.address.house}
                        onChange={e => setFamilyData({ ...familyData, address: { ...familyData.address, house: e.target.value } })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Village / Ward</label>
                      <input
                        type="text"
                        className="form-input"
                        value={familyData.address.village}
                        onChange={e => setFamilyData({ ...familyData, address: { ...familyData.address, village: e.target.value } })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Block / Taluka</label>
                      <input
                        type="text"
                        className="form-input"
                        value={familyData.address.block}
                        onChange={e => setFamilyData({ ...familyData, address: { ...familyData.address, block: e.target.value } })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">District</label>
                      <input
                        type="text"
                        className="form-input"
                        value={familyData.address.district}
                        onChange={e => setFamilyData({ ...familyData, address: { ...familyData.address, district: e.target.value } })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select
                        className="form-select"
                        value={familyData.address.state}
                        onChange={e => setFamilyData({ ...familyData, address: { ...familyData.address, state: e.target.value } })}
                      >
                        <option value="Gujarat">Gujarat</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Bihar">Bihar</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        className="form-input"
                        value={familyData.address.pincode}
                        onChange={e => setFamilyData({ ...familyData, address: { ...familyData.address, pincode: e.target.value } })}
                      />
                    </div>
                  </div>
                </div>

                {/* Household Amenities Checkboxes */}
                <div style={{ marginTop: '1.2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={familyData.hasElectricity}
                      onChange={e => setFamilyData({ ...familyData, hasElectricity: e.target.checked })}
                    />
                    <span>💡 Domestic Electricity Connection</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={familyData.hasToilet}
                      onChange={e => setFamilyData({ ...familyData, hasToilet: e.target.checked })}
                    />
                    <span>🚽 Individual Household Latrine (IHHL)</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={familyData.hasDrinkingWater}
                      onChange={e => setFamilyData({ ...familyData, hasDrinkingWater: e.target.checked })}
                    />
                    <span>🚰 Piped Drinking Water (Jal Jeevan)</span>
                  </label>
                </div>

                <div className="step-actions">
                  <div></div>
                  <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(2)}>
                    Next: Head of Household →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: HEAD OF HOUSEHOLD */}
            {currentStep === 2 && (
              <div className="form-step-content animate-fade-in">
                <div className="section-header">
                  <h3 className="section-title">2. Head of Household (Primary Beneficiary)</h3>
                  <p className="section-desc">Primary citizen profile linked with tokenized Aadhaar, demographic identity, and DBT bank account.</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Rameshwar Patel"
                      value={headBeneficiary.name}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-input"
                      value={headBeneficiary.dob}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, dob: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={headBeneficiary.gender}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, gender: e.target.value })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Aadhaar Token / Masked Aadhaar</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="XXXX-XXXX-1234"
                      value={headBeneficiary.aadhaarToken}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, aadhaarToken: e.target.value })}
                    />
                    <span className="form-hint">Zero-knowledge Aadhaar vault token</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="10-digit mobile number"
                      value={headBeneficiary.mobileNumber}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, mobileNumber: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Social Category / Caste</label>
                    <select
                      className="form-select"
                      value={headBeneficiary.caste}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, caste: e.target.value })}
                    >
                      <option value="General">General / Open</option>
                      <option value="OBC">Other Backward Classes (OBC)</option>
                      <option value="SC">Scheduled Caste (SC)</option>
                      <option value="ST">Scheduled Tribe (ST)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Marital Status</label>
                    <select
                      className="form-select"
                      value={headBeneficiary.maritalStatus}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, maritalStatus: e.target.value })}
                    >
                      <option value="Married">Married</option>
                      <option value="Single">Single</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Primary Occupation</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Farmer / Construction Laborer"
                      value={headBeneficiary.occupation}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, occupation: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Education Level</label>
                    <select
                      className="form-select"
                      value={headBeneficiary.educationLevel}
                      onChange={e => setHeadBeneficiary({ ...headBeneficiary, educationLevel: e.target.value })}
                    >
                      <option value="Illiterate">Illiterate</option>
                      <option value="Primary (5th)">Primary (5th)</option>
                      <option value="Middle (8th)">Middle (8th)</option>
                      <option value="Secondary (10th)">Secondary (10th)</option>
                      <option value="Higher Secondary (12th)">Higher Secondary (12th)</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Post-Graduate">Post-Graduate</option>
                    </select>
                  </div>
                </div>

                {/* DBT & Bank Details Section */}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.8rem' }}>
                    💳 Direct Benefit Transfer (DBT) & Bank Credentials
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Bank Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={headBeneficiary.bankName}
                        onChange={e => setHeadBeneficiary({ ...headBeneficiary, bankName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bank Account Number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Account Number"
                        value={headBeneficiary.bankAccountNumber}
                        onChange={e => setHeadBeneficiary({ ...headBeneficiary, bankAccountNumber: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">IFSC Code</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. SBIN0001245"
                        value={headBeneficiary.bankIFSC}
                        onChange={e => setHeadBeneficiary({ ...headBeneficiary, bankIFSC: e.target.value.toUpperCase() })}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '0.8rem', display: 'flex', gap: '2rem' }}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={headBeneficiary.dbtLinked}
                        onChange={e => setHeadBeneficiary({ ...headBeneficiary, dbtLinked: e.target.checked })}
                      />
                      <span>✅ Aadhaar-Seeded for DBT (NPCI Mapper Verified)</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={headBeneficiary.eKycVerified}
                        onChange={e => setHeadBeneficiary({ ...headBeneficiary, eKycVerified: e.target.checked })}
                      />
                      <span>🛡️ Biometric / OTP e-KYC Completed</span>
                    </label>
                  </div>
                </div>

                <div className="step-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                    ← Back to Household
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(3)}>
                    Next: Add Dependents ({members.length}) →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: FAMILY DEPENDENTS */}
            {currentStep === 3 && (
              <div className="form-step-content animate-fade-in">
                <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 className="section-title">3. Family Members & Dependents</h3>
                    <p className="section-desc">Add spouse, children, elderly parents, or other household members to unlock individual schemes.</p>
                  </div>
                  <button type="button" className="btn btn-outline-cyan btn-sm" onClick={handleAddMemberRow}>
                    + Add Another Member
                  </button>
                </div>

                {members.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No dependents added yet. You can register with just the Head of Household, or add family members below.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {members.map((m, idx) => (
                      <div key={m.id} className="member-form-card">
                        <div className="member-card-header">
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
                            Dependent #{idx + 1}
                          </span>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ color: 'var(--accent-rose)' }}
                            onClick={() => handleRemoveMemberRow(m.id)}
                          >
                            ✕ Remove
                          </button>
                        </div>

                        <div className="form-grid">
                          <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="e.g. Shantaben Patel"
                              value={m.name}
                              onChange={e => handleUpdateMemberRow(m.id, 'name', e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Relationship to Head</label>
                            <select
                              className="form-select"
                              value={m.relationToHead}
                              onChange={e => handleUpdateMemberRow(m.id, 'relationToHead', e.target.value)}
                            >
                              <option value="Spouse">Spouse</option>
                              <option value="Son">Son</option>
                              <option value="Daughter">Daughter</option>
                              <option value="Mother">Mother</option>
                              <option value="Father">Father</option>
                              <option value="Brother">Brother</option>
                              <option value="Sister">Sister</option>
                              <option value="Grandchild">Grandchild</option>
                              <option value="Other">Other Dependent</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Date of Birth</label>
                            <input
                              type="date"
                              className="form-input"
                              value={m.dob}
                              onChange={e => handleUpdateMemberRow(m.id, 'dob', e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Gender</label>
                            <select
                              className="form-select"
                              value={m.gender}
                              onChange={e => handleUpdateMemberRow(m.id, 'gender', e.target.value)}
                            >
                              <option value="Female">Female</option>
                              <option value="Male">Male</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Occupation / Activity</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="e.g. Student / Homemaker"
                              value={m.occupation}
                              onChange={e => handleUpdateMemberRow(m.id, 'occupation', e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label">Aadhaar Token (Optional)</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="XXXX-XXXX-XXXX"
                              value={m.aadhaarToken}
                              onChange={e => handleUpdateMemberRow(m.id, 'aadhaarToken', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="step-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setCurrentStep(2)}>
                    ← Back to Head
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(4)}>
                    Next: Review & Instant Scan →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & INSTANT SCAN */}
            {currentStep === 4 && (
              <div className="form-step-content animate-fade-in">
                <div className="section-header">
                  <h3 className="section-title">4. Review Household Summary & Register</h3>
                  <p className="section-desc">Verify data accuracy. Upon registration, the deterministic Scheme Engine will immediately scan all national and state schemes.</p>
                </div>

                <div className="review-card">
                  <div className="review-grid">
                    <div>
                      <div className="review-label">PROPOSED FAMILY ID</div>
                      <div className="review-val" style={{ color: 'var(--accent-cyan)' }}>
                        {familyData.familyId || '(Auto-generated on save)'}
                      </div>
                    </div>
                    <div>
                      <div className="review-label">RATION CARD & CATEGORY</div>
                      <div className="review-val">{familyData.rationCardCategory} ({familyData.rationCardNumber || 'Auto-generated'})</div>
                    </div>
                    <div>
                      <div className="review-label">LOCATION</div>
                      <div className="review-val">
                        {familyData.address.village}, {familyData.address.district}, {familyData.address.state}
                      </div>
                    </div>
                    <div>
                      <div className="review-label">HOUSEHOLD TYPE & LAND</div>
                      <div className="review-val">{familyData.householdType} Dwelling • {familyData.landHoldingAcres} Acres</div>
                    </div>
                    <div>
                      <div className="review-label">ANNUAL INCOME & CATEGORY</div>
                      <div className="review-val">₹{Number(familyData.annualIncomeINR).toLocaleString('en-IN')} ({familyData.incomeCategory})</div>
                    </div>
                    <div>
                      <div className="review-label">TOTAL HOUSEHOLD MEMBERS</div>
                      <div className="review-val">
                        {1 + members.filter(m => m.name && m.name.trim()).length} Members (Head + {members.filter(m => m.name && m.name.trim()).length} Dependents)
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <div className="review-label" style={{ marginBottom: '0.5rem' }}>ENROLLED MEMBERS LIST</div>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-info">
                        ⭐ {headBeneficiary.name || 'Head of Household'} (Head, {headBeneficiary.gender}, {headBeneficiary.occupation})
                      </span>
                      {members.filter(m => m.name && m.name.trim()).map((m, idx) => (
                        <span key={idx} className="badge badge-neutral">
                          👤 {m.name} ({m.relationToHead}, {m.gender})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid var(--border-focus)', borderRadius: 'var(--radius-md)', padding: '1rem', marginTop: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>⚡</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      Deterministic Engine Integration Active:
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.3rem', marginLeft: '1.8rem' }}>
                    Registering this household will immediately evaluate eligibility across PM-KISAN, PMAY-G, NFSA, Ayushman Bharat, and PM-KMY, automatically seeding the unified 360° beneficiary view.
                  </p>
                </div>

                <div className="step-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setCurrentStep(3)}>
                    ← Back to Members
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Registering Household...' : '🚀 Complete Registration & Open 360°'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {/* MODE B: ADD BENEFICIARY TO EXISTING FAMILY */}
      {mode === 'add-member' && (
        <div className="glass-card animate-fade-in">
          <div className="section-header">
            <h3 className="section-title">Add Beneficiary to Existing Family ID</h3>
            <p className="section-desc">
              Onboard a new household member (newborn child, married spouse, returning relative, or dependent parent) into an established Family ID anchor.
            </p>
          </div>

          {/* Quick family selectors */}
          <div style={{ marginBottom: '1.5rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
              Target Family ID Anchor:
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="form-input"
                style={{ maxWidth: '280px' }}
                placeholder="e.g. GJ-102938"
                value={targetFamilyId}
                onChange={e => setTargetFamilyId(e.target.value.toUpperCase())}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => loadTargetFamily(targetFamilyId)}
              >
                🔍 Verify Family ID
              </button>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginLeft: 'auto' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Quick Pick:</span>
                {['GJ-102938', 'UP-492019', 'MH-338291'].map(id => (
                  <button
                    key={id}
                    type="button"
                    className={`id-chip ${targetFamilyId === id ? 'active' : ''}`}
                    onClick={() => {
                      setTargetFamilyId(id);
                      loadTargetFamily(id);
                    }}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Family Preview Box */}
            {existingFamilyInfo && existingFamilyInfo.family && (
              <div style={{ marginTop: '1rem', background: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '0.85rem 1.2rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.92rem' }}>
                      Family ID: {existingFamilyInfo.family.familyId}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.75rem' }}>
                      {existingFamilyInfo.family.address?.village}, {existingFamilyInfo.family.address?.district}, {existingFamilyInfo.family.address?.state}
                    </span>
                  </div>
                  <span className="badge badge-info">
                    {existingFamilyInfo.members ? existingFamilyInfo.members.length : 0} Existing Members
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {existingFamilyInfo.members && existingFamilyInfo.members.map(m => (
                    <span key={m.beneficiaryId} className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {m.isHead ? '⭐ ' : ''}{m.name} ({m.relationToHead})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Member Presets */}
          <div className="presets-bar" style={{ marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              ⚡ Quick Fill Sample Member:
            </span>
            <button
              type="button"
              className="preset-chip"
              onClick={() => applyAddMemberPreset('newborn')}
            >
              👶 Newborn Child
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => applyAddMemberPreset('elderly')}
            >
              👵 Elderly Dependent Parent (Pension Eligible)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => applyAddMemberPreset('student')}
            >
              🎓 College Student (Scholarship Eligible)
            </button>
          </div>

          {/* Add Member Form */}
          <form onSubmit={handleSubmitAddMember}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Beneficiary Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Meera Patel"
                  value={newMemberData.name}
                  onChange={e => setNewMemberData({ ...newMemberData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Relationship to Head of Household</label>
                <select
                  className="form-select"
                  value={newMemberData.relationToHead}
                  onChange={e => setNewMemberData({ ...newMemberData, relationToHead: e.target.value })}
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Grandchild">Grandchild</option>
                  <option value="Other">Other Relative / Dependent</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-input"
                  value={newMemberData.dob}
                  onChange={e => setNewMemberData({ ...newMemberData, dob: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  value={newMemberData.gender}
                  onChange={e => setNewMemberData({ ...newMemberData, gender: e.target.value })}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Aadhaar Token / Masked Aadhaar</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="XXXX-XXXX-XXXX"
                  value={newMemberData.aadhaarToken}
                  onChange={e => setNewMemberData({ ...newMemberData, aadhaarToken: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="10-digit mobile number"
                  value={newMemberData.mobileNumber}
                  onChange={e => setNewMemberData({ ...newMemberData, mobileNumber: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Occupation / Activity</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Student / Unemployed / Pensioner"
                  value={newMemberData.occupation}
                  onChange={e => setNewMemberData({ ...newMemberData, occupation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Education Level</label>
                <select
                  className="form-select"
                  value={newMemberData.educationLevel}
                  onChange={e => setNewMemberData({ ...newMemberData, educationLevel: e.target.value })}
                >
                  <option value="Infant">Infant / Pre-School</option>
                  <option value="Primary (5th)">Primary (5th)</option>
                  <option value="Middle (8th)">Middle (8th)</option>
                  <option value="Secondary (10th)">Secondary (10th)</option>
                  <option value="Higher Secondary (12th)">Higher Secondary (12th)</option>
                  <option value="Undergraduate (B.Sc)">Undergraduate (College)</option>
                  <option value="Post-Graduate">Post-Graduate</option>
                  <option value="Illiterate">Illiterate</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Social Category / Caste</label>
                <select
                  className="form-select"
                  value={newMemberData.caste}
                  onChange={e => setNewMemberData({ ...newMemberData, caste: e.target.value })}
                >
                  <option value="General">General / Open</option>
                  <option value="OBC">Other Backward Classes (OBC)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                </select>
              </div>
            </div>

            {/* Disability options */}
            <div style={{ marginTop: '1.2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <label className="checkbox-label" style={{ marginBottom: '0.75rem' }}>
                <input
                  type="checkbox"
                  checked={newMemberData.isDisabled}
                  onChange={e => setNewMemberData({ ...newMemberData, isDisabled: e.target.checked })}
                />
                <span style={{ fontWeight: 600 }}>♿ Person with Benchmark Disability (PwD)</span>
              </label>

              {newMemberData.isDisabled && (
                <div className="form-grid" style={{ marginTop: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Disability Type</label>
                    <select
                      className="form-select"
                      value={newMemberData.disabilityType}
                      onChange={e => setNewMemberData({ ...newMemberData, disabilityType: e.target.value })}
                    >
                      <option value="Locomotor">Locomotor Disability</option>
                      <option value="Visual Impairment">Visual Impairment / Blindness</option>
                      <option value="Hearing Impairment">Hearing Impairment</option>
                      <option value="Mental Illness">Mental Illness / Intellectual</option>
                      <option value="Multiple Disabilities">Multiple Disabilities</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Disability Percentage (%)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={newMemberData.disabilityPercentage}
                      onChange={e => setNewMemberData({ ...newMemberData, disabilityPercentage: e.target.value })}
                    />
                    <span className="form-hint">Threshold for welfare schemes is typically ≥ 40%</span>
                  </div>
                </div>
              )}
            </div>

            {/* DBT Bank Account */}
            <div style={{ marginTop: '1.2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.6rem' }}>
                💳 DBT Bank Details (Optional for minors/dependents)
              </h4>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Bank Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newMemberData.bankName}
                    onChange={e => setNewMemberData({ ...newMemberData, bankName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Account Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newMemberData.bankAccountNumber}
                    onChange={e => setNewMemberData({ ...newMemberData, bankAccountNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">IFSC Code</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newMemberData.bankIFSC}
                    onChange={e => setNewMemberData({ ...newMemberData, bankIFSC: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>
            </div>

            <div className="step-actions">
              <div></div>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Adding Member...' : '👤 Add Beneficiary to Family & Sync 360°'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
