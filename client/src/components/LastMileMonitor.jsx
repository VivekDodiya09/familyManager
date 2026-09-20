import React, { useState } from 'react';

export default function LastMileMonitor({ disbursements, onTriggerInvestigation }) {
  const [filterMode, setFilterMode] = useState('All');

  const items = disbursements || [];
  const exceptions = items.filter(d => d.isDeliveryException);

  const displayedItems = filterMode === 'ExceptionsOnly' ? exceptions : items;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-danger" style={{ marginBottom: '0.4rem' }}>FEATURE 9: ⭐ LAST-MILE DELIVERY MONITORING</span>
            <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
              Benefit Delivery Exception Tracker
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              "Don't stop at 'Approved' or even 'Payment Completed'. Track whether the citizen actually received the benefit. If Payment Completed + Beneficiary says NOT RECEIVED → automatically trigger Exception Workflow."
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn btn-sm ${filterMode === 'All' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterMode('All')}
            >
              All Deliveries ({items.length})
            </button>
            <button
              className={`btn btn-sm ${filterMode === 'ExceptionsOnly' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ background: filterMode === 'ExceptionsOnly' ? 'var(--accent-rose)' : '' }}
              onClick={() => setFilterMode('ExceptionsOnly')}
            >
              ⚠ Exceptions Only ({exceptions.length})
            </button>
          </div>
        </div>
      </div>

      {/* Last-Mile Exception Flow Visualizer */}
      <div className="glass-card">
        <div className="card-header">
          <h3 className="card-title">
            <span>🛡️</span> Zero-Leakage Delivery Verification Loop
          </h3>
          <span className="badge badge-info">IVRS / ASHA / SMS Audit Protocol</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem', textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem 0' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)' }}>1</div>
            <strong>Eligible</strong>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-blue)' }}>2</div>
            <strong>Applied</strong>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-purple)' }}>3</div>
            <strong>Approved</strong>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-amber)' }}>4</div>
            <strong>Payment Initiated</strong>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-emerald)' }}>5</div>
            <strong>Payment Completed</strong>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(244, 63, 94, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-rose)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--accent-rose)' }}>6 ⚠️</div>
            <strong>Citizen Feedback</strong>
          </div>
        </div>
      </div>

      {/* Disbursements & Exceptions Queue Table */}
      <div className="glass-card">
        <div className="card-header">
          <h3 className="card-title">
            <span>💳</span> Payment Disbursements & Delivery Confirmation Records
          </h3>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Disb. Ref</th>
                <th>Family ID</th>
                <th>Scheme & Dept</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Citizen Receipt Confirmation</th>
                <th>Exception Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item) => (
                <tr key={item.disbursementId}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {item.transactionRef || item.disbursementId}
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.familyId}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.schemeId}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.department}</div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    {item.amountINR > 0 ? `₹${item.amountINR.toLocaleString('en-IN')}` : item.benefitType}
                  </td>
                  <td>
                    <span className="badge badge-success">✓ {item.paymentStatus}</span>
                  </td>
                  <td>
                    {item.beneficiaryConfirmation && item.beneficiaryConfirmation.status === 'Reported Not Received' ? (
                      <span className="badge badge-danger">
                        ❌ Citizen Reported NOT RECEIVED
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        ✓ Citizen Confirmed Received
                      </span>
                    )}
                  </td>
                  <td>
                    {item.isDeliveryException ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <span className="badge badge-danger">
                          ⚠ BENEFIT DELIVERY EXCEPTION
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-rose)' }}>
                          Status: {item.exceptionInvestigationStatus}
                        </span>
                      </div>
                    ) : (
                      <span className="badge badge-neutral">Normal Delivery</span>
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
