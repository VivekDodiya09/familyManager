import React, { useState } from 'react';

export default function GrievanceTracker({ grievances, onResolveGrievance, onFileGrievance, onNavigateTo360 }) {
  const [selectedGrievance, setSelectedGrievance] = useState(grievances && grievances[0] ? grievances[0] : null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [resolutionText, setResolutionText] = useState('');

  // Form for filing new contextual grievance
  const [formData, setFormData] = useState({
    familyId: 'GJ-102938',
    beneficiaryId: 'B-GJ-102-01',
    schemeId: 'SCH-AGRI-PMKISAN',
    applicationId: 'APP-AGRI-10928',
    issueCategory: 'Payment Approved But Not Received',
    description: '',
    department: 'Ministry of Agriculture'
  });

  const handleResolve = (gId) => {
    if (resolutionText.trim()) {
      onResolveGrievance(gId, resolutionText.trim());
      setResolutionText('');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>FEATURE 8: LIFECYCLE-INTEGRATED REDRESSAL</span>
            <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
              Beneficiary-Linked Grievance Redressal
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              "Don't make grievance a separate complaint portal. Connect it directly: Beneficiary → Scheme → Application → Benefit → Problem."
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setShowFileModal(true)}
          >
            + Log Contextual Grievance
          </button>
        </div>

        {/* The Exact User Spec Callout */}
        <div style={{ marginTop: '1.25rem', padding: '0.85rem 1.1rem', background: 'rgba(59, 130, 246, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-blue)', fontSize: '0.86rem' }}>
          📌 <strong>Full Context Advantage:</strong> When an officer inspects a ticket for Family <code>GJ-102938</code>, they don't just see a plain text complaint. The system loads the entire household context, payment transaction IDs, and verification history immediately on the same screen.
        </div>
      </div>

      {/* Grid: Grievance List + Full 360° Context Inspector */}
      <div className="grid-2">

        {/* Grievance Queue */}
        <div className="glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <span>🎟️</span> Active Redressal Tickets ({grievances ? grievances.length : 0})
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {grievances && grievances.map((grv) => (
              <div
                key={grv.grievanceId}
                onClick={() => setSelectedGrievance(grv)}
                style={{
                  background: selectedGrievance && selectedGrievance.grievanceId === grv.grievanceId ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${selectedGrievance && selectedGrievance.grievanceId === grv.grievanceId ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {grv.grievanceId}
                  </span>
                  <span className={`badge ${grv.status === 'Resolved' ? 'badge-success' : 'badge-danger'}`}>
                    {grv.status}
                  </span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {grv.issueCategory}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Citizen: <strong>{grv.beneficiaryName}</strong> | Family: <strong>{grv.familyId}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>🏛️ {grv.department}</span>
                  <span>Filed: {new Date(grv.filedDate).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Grievance 360° Inspector */}
        {selectedGrievance && (
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
            <div className="card-header">
              <div>
                <span className="badge badge-info" style={{ marginBottom: '0.25rem' }}>360° CONTEXT VIEW</span>
                <h3 className="card-title">
                  Ticket #{selectedGrievance.grievanceId}
                </h3>
              </div>
              <button
                className="btn btn-outline-cyan btn-sm"
                onClick={() => onNavigateTo360(selectedGrievance.familyId)}
              >
                Open Beneficiary 360°
              </button>
            </div>

            {/* Context Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', fontSize: '0.82rem', marginBottom: '1rem', background: 'rgba(0, 0, 0, 0.2)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Family ID:</span>
                <strong>{selectedGrievance.familyId}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Beneficiary ID:</span>
                <strong>{selectedGrievance.beneficiaryId} ({selectedGrievance.beneficiaryName})</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Scheme:</span>
                <strong>{selectedGrievance.schemeName || selectedGrievance.schemeId}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Application ID:</span>
                <strong>{selectedGrievance.applicationId || 'Direct Scheme Allotment'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Lifecycle Stage at Issue:</span>
                <strong style={{ color: 'var(--accent-amber)' }}>{selectedGrievance.lifecycleStageAtIssue}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>Bank Disb. Ref:</span>
                <strong style={{ fontFamily: 'monospace' }}>{selectedGrievance.disbursementRef || 'PFMS-881900332'}</strong>
              </div>
            </div>

            {/* Citizen Complaint Description */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Citizen Description
              </span>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginTop: '0.35rem', fontSize: '0.88rem', borderLeft: '3px solid var(--accent-rose)' }}>
                {selectedGrievance.description}
              </div>
            </div>

            {/* Resolution Action Area */}
            {selectedGrievance.status !== 'Resolved' ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.92rem', color: 'var(--accent-emerald)' }}>
                  Officer Resolution Action
                </h4>
                <textarea
                  rows="2"
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="Enter corrective action taken (e.g. NPCI bank mapper re-linked to active SBI account)..."
                  style={{ width: '100%', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.5rem', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }}
                ></textarea>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleResolve(selectedGrievance.grievanceId)}
                  >
                    Mark Resolved & Notify Citizen
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-emerald)', fontSize: '0.85rem' }}>
                ✓ <strong>Resolved:</strong> {selectedGrievance.resolutionNotes}
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
