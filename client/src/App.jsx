import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GovernmentDashboard from './components/GovernmentDashboard';
import Beneficiary360 from './components/Beneficiary360';
import SchemeRegistry from './components/SchemeRegistry';
import EligibilityEngine from './components/EligibilityEngine';
import GapAnalysisDashboard from './components/GapAnalysisDashboard';
import CrossSchemeOverlap from './components/CrossSchemeOverlap';
import BeneficiaryLifecycle from './components/BeneficiaryLifecycle';
import ApplicationManager from './components/ApplicationManager';
import GrievanceTracker from './components/GrievanceTracker';
import LastMileMonitor from './components/LastMileMonitor';
import ProactiveOutreach from './components/ProactiveOutreach';
import DepartmentSilosVs360 from './components/DepartmentSilosVs360';
import NewRegistration from './components/NewRegistration';
import GovernmentLogin from './components/GovernmentLogin';

import {
  fetchBeneficiarySearch,
  fetchSchemes,
  fetchApplications,
  fetchGrievances,
  fetchCommandMetrics,
  fetchExceptions,
  advanceApplication,
  resolveGrievance,
  fileGrievance
} from './services/api';

export default function App() {
  const [authority, setAuthority] = useState(() => {
    const session = JSON.parse(localStorage.getItem('beneficiary360_session') || 'null');
    return session?.authority || null;
  });
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' is HERO, '360' is FLAGSHIP
  const [currentFamilyId, setCurrentFamilyId] = useState('GJ-102938');
  const [registrationParams, setRegistrationParams] = useState({ mode: 'new-family', familyId: '' });
  const [familyData, setFamilyData] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [applicationsData, setApplicationsData] = useState(null);
  const [grievances, setGrievances] = useState([]);
  const [commandData, setCommandData] = useState(null);
  const [exceptionData, setExceptionData] = useState(null);
  const [preselectedSchemeId, setPreselectedSchemeId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthExpired = () => setAuthority(null);
    window.addEventListener('auth-expired', handleAuthExpired);
    return () => window.removeEventListener('auth-expired', handleAuthExpired);
  }, []);

  useEffect(() => {
    loadAllData(currentFamilyId);
  }, [currentFamilyId]);

  const loadAllData = async (familyId) => {
    setLoading(true);
    try {
      const [fData, sData, aData, gData, cData, eData] = await Promise.allSettled([
        fetchBeneficiarySearch(familyId),
        fetchSchemes(),
        fetchApplications(),
        fetchGrievances(),
        fetchCommandMetrics(),
        fetchExceptions()
      ]);

      if (fData.status === 'fulfilled') setFamilyData(fData.value);
      if (sData.status === 'fulfilled') setSchemes(sData.value);
      if (aData.status === 'fulfilled') setApplicationsData(aData.value);
      if (gData.status === 'fulfilled') setGrievances(gData.value);
      if (cData.status === 'fulfilled') setCommandData(cData.value);
      if (eData.status === 'fulfilled') setExceptionData(eData.value);
    } catch (err) {
      console.error('Data load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setCurrentFamilyId(query);
    setActiveTab('360');
  };

  const handleSelectFamilyId = (fId) => {
    setCurrentFamilyId(fId);
    setActiveTab('360');
  };

  const handleNavigateToTab = (tabId, params = null) => {
    if (tabId === 'register' && params) {
      setRegistrationParams(params);
    }
    setActiveTab(tabId);
  };

  const handleTestScheme = (schemeId) => {
    setPreselectedSchemeId(schemeId);
    setActiveTab('engine');
  };

  const handleAdvanceApplication = async (appId, newStage, remarks) => {
    try {
      await advanceApplication(appId, newStage, remarks);
      loadAllData(currentFamilyId);
    } catch (err) {
      console.error('Failed to advance application:', err);
    }
  };

  const handleResolveGrievance = async (gId, resolutionNotes) => {
    try {
      await resolveGrievance(gId, resolutionNotes);
      loadAllData(currentFamilyId);
    } catch (err) {
      console.error('Failed to resolve grievance:', err);
    }
  };

  const handleFileGrievance = async (formData) => {
    try {
      await fileGrievance(formData);
      loadAllData(currentFamilyId);
    } catch (err) {
      console.error('Failed to file grievance:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('beneficiary360_session');
    setAuthority(null);
  };

  if (!authority) return <GovernmentLogin onLogin={setAuthority} />;

  const tabs = [
    { id: 'dashboard', label: '⭐ Government Dashboard', badge: 'Hero' },
    { id: '360', label: '🏛️ Beneficiary 360°', badge: 'Flagship' },
    { id: 'register', label: '📝 New Registration', badge: 'New' },
    { id: 'schemes', label: '📋 Scheme Registry' },
    { id: 'engine', label: '⚡ Eligibility Engine' },
    { id: 'gap', label: '📊 Gap Analysis' },
    { id: 'overlap', label: '🔗 Cross-Scheme Overlap' },
    { id: 'lifecycle', label: '⏳ Beneficiary Lifecycle' },
    { id: 'applications', label: '🛠️ Application Manager' },
    { id: 'grievances', label: '🎟️ Grievance Redressal' },
    { id: 'lastmile', label: '🛡️ Last-Mile Monitor' },
    { id: 'outreach', label: '📢 Proactive Outreach' },
    { id: 'silos', label: '🔄 Silos vs 360°' }
  ];

  return (
    <div className="app-container">
      {/* Top Universal Header */}
      <Header
        currentFamilyId={currentFamilyId}
        onSearch={handleSearch}
        onSelectFamilyId={handleSelectFamilyId}
        onNavigateToTab={handleNavigateToTab}
        authority={authority}
        onLogout={handleLogout}
      />

      {/* Main Navigation Tabs */}
      <nav className="nav-tabs">
        <div className="nav-tabs-inner">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`nav-tab ${activeTab === t.id ? 'active' : ''}`}
            >
              <span>{t.label}</span>
              {t.badge && <span className="tab-badge">{t.badge}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {loading && !familyData ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔄</div>
            <h3>Synchronizing Unified Beneficiary Registry...</h3>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <GovernmentDashboard
                commandData={commandData}
                exceptionData={exceptionData}
                onNavigateToTab={handleNavigateToTab}
                onSelectFamilyId={handleSelectFamilyId}
              />
            )}

            {activeTab === '360' && (
              <Beneficiary360
                data={familyData}
                onNavigateToTab={handleNavigateToTab}
              />
            )}

            {activeTab === 'register' && (
              <NewRegistration
                initialMode={registrationParams.mode || 'new-family'}
                prefilledFamilyId={registrationParams.familyId || currentFamilyId}
                onRegistrationSuccess={(fId) => {
                  handleSelectFamilyId(fId);
                }}
                onNavigateTo360={(fId) => {
                  handleSelectFamilyId(fId);
                }}
              />
            )}

            {activeTab === 'schemes' && (
              <SchemeRegistry
                schemes={schemes}
                onTestScheme={handleTestScheme}
                onNavigateToEngine={() => setActiveTab('engine')}
              />
            )}

            {activeTab === 'engine' && (
              <EligibilityEngine
                schemes={schemes}
                familyData={familyData}
                preselectedSchemeId={preselectedSchemeId}
              />
            )}

            {activeTab === 'gap' && (
              <GapAnalysisDashboard />
            )}

            {activeTab === 'overlap' && (
              <CrossSchemeOverlap />
            )}

            {activeTab === 'lifecycle' && (
              <BeneficiaryLifecycle
                applications={familyData ? familyData.applications : []}
                familyData={familyData}
              />
            )}

            {activeTab === 'applications' && (
              <ApplicationManager
                applicationsData={applicationsData}
                onAdvanceApplication={handleAdvanceApplication}
              />
            )}

            {activeTab === 'grievances' && (
              <GrievanceTracker
                grievances={grievances}
                onResolveGrievance={handleResolveGrievance}
                onFileGrievance={handleFileGrievance}
                onNavigateTo360={handleSelectFamilyId}
              />
            )}

            {activeTab === 'lastmile' && (
              <LastMileMonitor
                disbursements={familyData ? familyData.disbursements : []}
              />
            )}

            {activeTab === 'outreach' && (
              <ProactiveOutreach />
            )}

            {activeTab === 'silos' && (
              <DepartmentSilosVs360
                onNavigateTo360={handleSelectFamilyId}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.25rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        Beneficiary 360° Unified Management Platform • Built on MERN Stack (MongoDB, Express, React, Node) • Family ID Identity Layer Architecture
      </footer>
    </div>
  );
}
