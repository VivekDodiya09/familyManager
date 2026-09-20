import React from 'react';

export default function GovernmentDashboard({ commandData, exceptionData, onNavigateToTab, onSelectFamilyId }) {
  const metrics = commandData || {
    registeredBeneficiaries: 1245321,
    activeSchemeEnrollments: 891231,
    pendingApplications: 42183,
    potentiallyUnserved: 87421,
    openGrievances: 12421,
    slaBreaches: 1238,
    departmentMatrix: [],
    conversionFunnel: []
  };

  const exceptions = (exceptionData && exceptionData.alerts) ? exceptionData.alerts : [];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Hero Headline Box: Government Command Center */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(15, 23, 42, 0.9))', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>⭐ HERO COMMAND OVERVIEW</span>
            <h1 style={{ fontSize: '2.1rem', margin: 0, color: 'var(--text-primary)' }}>
              Unified Beneficiary Management Command Center
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.95rem' }}>
              State-wide cross-departmental operations: Real-time lifecycle tracking, delivery audit, and exception detection.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                onSelectFamilyId('GJ-102938');
                onNavigateToTab('360');
              }}
            >
              Open Family 360° (GJ-102938)
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigateToTab('gap')}
            >
              View Gap Analysis
            </button>
          </div>
        </div>

        {/* 6 Core Hero Metrics */}
        <div className="metrics-grid" style={{ marginBottom: 0 }}>
          <div className="metric-card cyan">
            <div className="metric-label">Registered Beneficiaries</div>
            <div className="metric-value">{metrics.registeredBeneficiaries.toLocaleString('en-IN')}</div>
            <div className="metric-sub">Across 33 Districts via Family ID</div>
          </div>

          <div className="metric-card emerald">
            <div className="metric-label">Active Scheme Enrollments</div>
            <div className="metric-value">{metrics.activeSchemeEnrollments.toLocaleString('en-IN')}</div>
            <div className="metric-sub">Direct Benefit Recipients</div>
          </div>

          <div className="metric-card amber">
            <div className="metric-label">Pending Applications</div>
            <div className="metric-value">{metrics.pendingApplications.toLocaleString('en-IN')}</div>
            <div className="metric-sub">In Verification Pipelines</div>
          </div>

          <div className="metric-card purple">
            <div className="metric-label">Potentially Unserved</div>
            <div className="metric-value">{metrics.potentiallyUnserved.toLocaleString('en-IN')}</div>
            <div className="metric-sub">Eligible But Not Yet Applied</div>
          </div>

          <div className="metric-card rose">
            <div className="metric-label">Open Grievances</div>
            <div className="metric-value">{metrics.openGrievances.toLocaleString('en-IN')}</div>
            <div className="metric-sub">Contextually Linked to Lifecycle</div>
          </div>

          <div className="metric-card rose">
            <div className="metric-label">SLA Breaches</div>
            <div className="metric-value">{metrics.slaBreaches.toLocaleString('en-IN')}</div>
            <div className="metric-sub">Requires Collector Escalation</div>
          </div>
        </div>
      </div>

      {/* Grid: Department-wise Matrix + Beneficiary Conversion Funnel */}
      <div className="grid-2">

        {/* Department-wise Delivery Matrix (Feature 14) */}
        <div className="glass-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">
                <span>📊</span> Department-Wise Delivery Performance
              </h2>
              <div className="card-subtitle">
                Cross-department visibility: Eligible vs Applied vs Approved vs Delivered
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Eligible</th>
                  <th>Applied</th>
                  <th>Approved</th>
                  <th>Delivered</th>
                  <th>Coverage</th>
                </tr>
              </thead>
              <tbody>
                {metrics.departmentMatrix && metrics.departmentMatrix.map((dept, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>
                      {dept.department}
                    </td>
                    <td>{dept.eligible.toLocaleString('en-IN')}</td>
                    <td>{dept.applied.toLocaleString('en-IN')}</td>
                    <td>{dept.approved.toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
                      {dept.delivered.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className="badge badge-info">
                        {dept.conversionRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <strong>Executive Summary:</strong> Healthcare (Ayushman) exhibits the highest conversion efficiency at 77.5%, while Housing (PMAY-G) has a 47.5% conversion rate due to homestead land title documentation bottlenecks.
            </div>
          </div>
        </div>

        {/* Beneficiary Conversion Funnel (Feature 15) */}
        <div className="glass-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">
                <span>🎯</span> Beneficiary Conversion Funnel
              </h2>
              <div className="card-subtitle">
                "Where are beneficiaries dropping out?" — End-to-end lifecycle drop-off analysis
              </div>
            </div>
            <span className="badge badge-success">Flagship Metric</span>
          </div>

          <div className="funnel-container">
            {metrics.conversionFunnel && metrics.conversionFunnel.map((item, index) => (
              <div key={index} className="funnel-stage">
                <div className="funnel-stage-num">{index + 1}</div>
                <div className="funnel-stage-info">
                  <div className="funnel-stage-title">
                    <span>{item.stage}</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>
                      {item.count.toLocaleString('en-IN')} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="funnel-bar-bg">
                    <div
                      className="funnel-bar-fill"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  {item.dropOff && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
                      <span className="funnel-dropoff">⚠️ Drop-off: {item.dropOff}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature 16: Beneficiary Risk / Exception Dashboard */}
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-amber)' }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>⚠️</span> Exception-Driven Administration (Automated Flags)
            </h2>
            <div className="card-subtitle">
              "Instead of officials manually searching thousands of records, the system tells them: These are the cases that need attention."
            </div>
          </div>
          <span className="badge badge-danger">6 Critical Clusters Active</span>
        </div>

        <div className="grid-3" style={{ marginTop: '0.5rem' }}>
          {exceptions.map((alert) => (
            <div
              key={alert.alertId}
              className={`alert-strip ${alert.severity === 'Critical' ? 'critical' : alert.severity === 'Warning' ? 'warning' : 'info'}`}
            >
              <div className="alert-icon">
                {alert.severity === 'Critical' ? '🚨' : alert.severity === 'Warning' ? '⚠️' : 'ℹ️'}
              </div>
              <div className="alert-content">
                <div className="alert-title">{alert.title}</div>
                <div className="alert-desc">{alert.description}</div>
                <div className="alert-action">
                  👉 Required Action: {alert.actionRequired}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
