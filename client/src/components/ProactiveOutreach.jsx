import React, { useState, useEffect } from 'react';
import { fetchOutreach } from '../services/api';

export default function ProactiveOutreach() {
  const [outreachData, setOutreachData] = useState(null);
  const [campaignLaunched, setCampaignLaunched] = useState(false);

  useEffect(() => {
    loadOutreach();
  }, []);

  const loadOutreach = async () => {
    try {
      const data = await fetchOutreach();
      setOutreachData(data);
    } catch (err) {
      console.error('Failed to load outreach data:', err);
    }
  };

  const handleLaunchCampaign = (district) => {
    setCampaignLaunched(district || 'All Targeted Districts');
    setTimeout(() => setCampaignLaunched(false), 4000);
  };

  if (!outreachData) {
    return <div className="glass-card">Loading Proactive Outreach Engine...</div>;
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>FEATURE 10 & 13: PROACTIVE OUTREACH</span>
        <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
          Proactive Beneficiary Identification & Outreach Engine
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
          "Instead of waiting for vulnerable citizens to apply: Database → Eligibility Engine → Potentially Eligible → Outreach List → Targeted Camps."
        </p>

        {campaignLaunched && (
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-emerald)', color: 'var(--badge-text-success)', fontSize: '0.88rem' }}>
            🚀 <strong>Campaign Dispatched:</strong> Automated SMS alerts and Gram Panchayat Camp rosters queued for <strong>{campaignLaunched}</strong>. ASHA workers alerted on mobile app.
          </div>
        )}
      </div>

      {/* Core Target Metrics Strip */}
      <div className="metrics-grid">
        <div className="metric-card cyan">
          <div className="metric-label">Target Scheme</div>
          <div className="metric-value" style={{ fontSize: '1.35rem' }}>PMAY-G Housing</div>
          <div className="metric-sub">Rural Pucca Housing Allotment</div>
        </div>

        <div className="metric-card blue">
          <div className="metric-label">Potentially Eligible</div>
          <div className="metric-value">{outreachData.potentiallyEligible.toLocaleString('en-IN')}</div>
          <div className="metric-sub">Satisfies Kutcha & Income Criteria</div>
        </div>

        <div className="metric-card emerald">
          <div className="metric-label">Applied</div>
          <div className="metric-value">{outreachData.applied.toLocaleString('en-IN')}</div>
          <div className="metric-sub">Active Applications in Flow</div>
        </div>

        <div className="metric-card rose">
          <div className="metric-label">Not Yet Applied (Deficit)</div>
          <div className="metric-value">{outreachData.notApplied.toLocaleString('en-IN')}</div>
          <div className="metric-sub">Target for Proactive Drives</div>
        </div>
      </div>

      {/* District Priority Queue */}
      <div className="glass-card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>📍</span> District-Wise Outreach Priority Roster
            </h2>
            <div className="card-subtitle">
              Prioritized by volume of unserved eligible households requiring assisted enrollment
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleLaunchCampaign('All Top 5 Priority Districts')}
          >
            Dispatch State-Wide SMS & Camp Drive 📢
          </button>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>District & State</th>
                <th>Unserved Eligible Citizens</th>
                <th>Intervention Priority</th>
                <th>Panchayat Camps Scheduled</th>
                <th>ASHA / Field Workers Assigned</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {outreachData.districtPriorities.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {item.district} ({item.state})
                  </td>
                  <td style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
                    {item.unservedCount.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className={`badge ${
                      item.priority === 'High' ? 'badge-danger' :
                      item.priority === 'Medium' ? 'badge-warning' : 'badge-info'
                    }`}>
                      {item.priority} Priority
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    ⛺ {item.campsScheduled} Village Camps
                  </td>
                  <td>
                    👩‍⚕️ {item.ashaWorkersAssigned} Field Mitras
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleLaunchCampaign(item.district)}
                    >
                      Trigger Drive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Outreach Channels Grid */}
      <div className="grid-3">
        <div className="glass-card">
          <div style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>📱</div>
          <h4 style={{ margin: '0 0 0.35rem', fontSize: '1rem' }}>Vernacular SMS & IVRS</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Auto-dispatches regional voice and text messages to verified mobile numbers linked to Family ID, explaining exact scheme entitlement and nearest registration counter.
          </p>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>⛺</div>
          <h4 style={{ margin: '0 0 0.35rem', fontSize: '1rem' }}>Gram Panchayat Special Camps</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Talati and CSC VLEs visit targeted villages on designated days with biometric fingerprint scanners, completing on-the-spot eKYC and instant application filing.
          </p>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>🤝</div>
          <h4 style={{ margin: '0 0 0.35rem', fontSize: '1rem' }}>Assisted Applications by ASHA</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Field workers receive pre-populated tablets containing only unserved families in their beat area, eliminating manual paper documentation and fraud.
          </p>
        </div>
      </div>

    </div>
  );
}
