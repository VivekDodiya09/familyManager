import React, { useState } from 'react';

export default function ApplicationManager({ applicationsData, onAdvanceApplication }) {
  const bottlenecks = (applicationsData && applicationsData.bottlenecks) ? applicationsData.bottlenecks : {
    totalPending: 2431,
    stages: [
      { name: 'Department Review', count: 1200, percentage: 49.4, avgDays: 14, icon: '🏛️' },
      { name: 'Document Verification', count: 631, percentage: 26.0, avgDays: 9, icon: '📄' },
      { name: 'Field Verification', count: 400, percentage: 16.5, avgDays: 19, icon: '🌾' },
      { name: 'Payment Processing', count: 200, percentage: 8.2, avgDays: 6, icon: '💳' }
    ]
  };

  const apps = (applicationsData && applicationsData.applications) ? applicationsData.applications : [];
  const [selectedBottleneck, setSelectedBottleneck] = useState('All');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>FEATURE 7: BOTTLENECK ROOT-CAUSE ANALYSIS</span>
        <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
          Application Pipeline & Bottleneck Manager
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
          "Officials don't merely need to see '2,431 pending'. They need to know WHY it is stuck: Department review, document verification, field verification, or payment."
        </p>

        {/* Bottleneck Summary Strip */}
        <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(0, 0, 0, 0.25)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                TOTAL PENDING PIPELINE
              </span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                {bottlenecks.totalPending.toLocaleString('en-IN')} Applications Stuck
              </div>
            </div>
            <span className="badge badge-warning">Action Required by Desk Officers</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {bottlenecks.stages.map((st, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedBottleneck(st.name)}
                style={{
                  background: selectedBottleneck === st.name ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${selectedBottleneck === st.name ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{st.icon}</span>
                  <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>Avg: {st.avgDays} Days</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{st.name}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-cyan)', margin: '0.2rem 0' }}>
                  {st.count.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {st.percentage}% of total queue
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Table with Quick Action */}
      <div className="glass-card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>📋</span> Active Application Records (Live Queue)
            </h2>
            <div className="card-subtitle">
              Family-linked applications with instant officer transition controls
            </div>
          </div>
          {selectedBottleneck !== 'All' && (
            <button className="btn btn-secondary btn-sm" onClick={() => setSelectedBottleneck('All')}>
              Clear Filter ({selectedBottleneck})
            </button>
          )}
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>App ID</th>
                <th>Family ID</th>
                <th>Department & Scheme</th>
                <th>Current Stage</th>
                <th>Bottleneck Diagnosis</th>
                <th>SLA Countdown</th>
                <th>Officer Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.applicationId}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {app.applicationId}
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    {app.familyId}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{app.department}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.schemeId}</div>
                  </td>
                  <td>
                    <span className="badge badge-info">{app.currentStage}</span>
                  </td>
                  <td>
                    {app.bottleneckReason !== 'None' ? (
                      <span className="badge badge-warning">⚠️ {app.bottleneckReason}</span>
                    ) : (
                      <span className="badge badge-success">✓ Clear (In Flow)</span>
                    )}
                  </td>
                  <td>
                    {app.isSLABreached ? (
                      <span className="badge badge-danger">🚨 SLA Breached</span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>8 Days Remaining</span>
                    )}
                  </td>
                  <td>
                    {app.currentStage === 'FIELD_VERIFIED' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onAdvanceApplication(app.applicationId, 'APPROVED', 'Talati verified landholdings. Approved by BDO.')}
                      >
                        Approve & Sanction
                      </button>
                    )}
                    {app.currentStage === 'APPROVED' && (
                      <button
                        className="btn btn-outline-cyan btn-sm"
                        onClick={() => onAdvanceApplication(app.applicationId, 'PAYMENT_INITIATED', 'Batch pushed to PFMS Treasury.')}
                      >
                        Release PFMS Batch
                      </button>
                    )}
                    {app.currentStage === 'PAYMENT_COMPLETED' && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                        ✓ Disbursed
                      </span>
                    )}
                    {app.currentStage === 'RECEIPT_CONFIRMED' && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--badge-text-success)', fontWeight: 600 }}>
                        ✓ Confirmed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
