import React, { useState } from 'react';

export default function BeneficiaryLifecycle({ applications, familyData }) {
  const family = familyData ? familyData.family : null;
  const appList = applications && applications.length > 0 ? applications : [];
  const [selectedAppId, setSelectedAppId] = useState(appList[0] ? appList[0].applicationId : null);

  const activeApp = appList.find(a => a.applicationId === selectedAppId) || appList[0];

  const standardStages = [
    { key: 'IDENTIFIED', label: '1. Identified', desc: 'Pre-seeded from Census / Family Registry' },
    { key: 'ELIGIBILITY_ASSESSED', label: '2. Eligibility Assessed', desc: 'Rules engine verification' },
    { key: 'APPLIED', label: '3. Applied', desc: 'Application filed online / camp' },
    { key: 'DOCUMENTS_VERIFIED', label: '4. Documents Verified', desc: 'Registrar & Desk audit' },
    { key: 'FIELD_VERIFIED', label: '5. Field Verified', desc: 'Talati / Revenue inspection' },
    { key: 'APPROVED', label: '6. Approved & Sanctioned', desc: 'Formal Sanction Order issued' },
    { key: 'PAYMENT_INITIATED', label: '7. Payment Initiated', desc: 'PFMS / Treasury batch queued' },
    { key: 'PAYMENT_COMPLETED', label: '8. Payment Completed', desc: 'Bank credit confirmed' },
    { key: 'RECEIPT_CONFIRMED', label: '9. Citizen Confirmed', desc: 'Citizen confirmed delivery / OTP' }
  ];

  // Helper to test if a stage is passed
  const getStageStatus = (stageKey) => {
    if (!activeApp) return 'upcoming';
    const stageOrder = [
      'IDENTIFIED', 'ELIGIBILITY_ASSESSED', 'APPLIED', 'DOCUMENTS_VERIFIED',
      'FIELD_VERIFIED', 'APPROVED', 'PAYMENT_INITIATED', 'PAYMENT_COMPLETED', 'RECEIPT_CONFIRMED'
    ];
    const currentIndex = stageOrder.indexOf(activeApp.currentStage);
    const thisIndex = stageOrder.indexOf(stageKey);

    if (thisIndex < currentIndex) return 'completed';
    if (thisIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>FEATURE 6: AUDITABLE STATE MACHINE</span>
        <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
          Beneficiary Lifecycle Engine
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
          "Every stage is recorded: From identification to citizen receipt confirmation. A single operational view of scheme delivery."
        </p>

        {/* Application Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          {appList.map(a => (
            <button
              key={a.applicationId}
              onClick={() => setSelectedAppId(a.applicationId)}
              className={`btn btn-sm ${activeApp && activeApp.applicationId === a.applicationId ? 'btn-primary' : 'btn-secondary'}`}
            >
              📄 {a.applicationId} ({a.department.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Lifecycle Visual Pipeline */}
      {activeApp && (
        <div className="glass-card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Lifecycle for Application: <strong style={{ color: 'var(--accent-cyan)' }}>{activeApp.applicationId}</strong>
              </div>
              <h2 className="card-title" style={{ marginTop: '0.2rem' }}>
                {activeApp.department} — Current Stage: <span style={{ color: 'var(--accent-emerald)' }}>{activeApp.currentStage}</span>
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-info">SLA: {activeApp.isSLABreached ? '⚠️ Approaching SLA' : '✓ Within SLA'}</span>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Assigned: {activeApp.assignedOfficer ? activeApp.assignedOfficer.name : 'District Nodal'}
              </div>
            </div>
          </div>

          {/* 9 Stage Stepper */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '0.5rem', margin: '1.5rem 0' }}>
            {standardStages.map((st) => {
              const status = getStageStatus(st.key);
              return (
                <div
                  key={st.key}
                  style={{
                    background: status === 'completed' ? 'rgba(16, 185, 129, 0.08)' :
                                status === 'current' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${
                      status === 'completed' ? 'var(--accent-emerald)' :
                      status === 'current' ? 'var(--accent-cyan)' : 'var(--border-subtle)'
                    }`,
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 0.5rem',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                    {status === 'completed' ? '✓' : status === 'current' ? '⏳' : '○'}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem', color: status === 'current' ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                    {st.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {st.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recorded Timeline Events */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.85rem' }}>
              Chronological Audit Trail
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activeApp.timeline && activeApp.timeline.map((event, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: '3px solid var(--accent-cyan)'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '90px' }}>
                    {new Date(event.timestamp).toLocaleDateString('en-IN')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                      {event.stage} — <span style={{ color: 'var(--accent-emerald)' }}>{event.status}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                      {event.remarks}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    👮 {event.officer}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
