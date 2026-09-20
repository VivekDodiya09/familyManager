import React, { useState, useEffect } from 'react';
import { fetchGapAnalysis } from '../services/api';

export default function GapAnalysisDashboard() {
  const [selectedScheme, setSelectedScheme] = useState('SCH-EDU-POSTMATRIC');
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGapData(selectedScheme);
  }, [selectedScheme]);

  const loadGapData = async (schemeId) => {
    setLoading(true);
    try {
      const data = await fetchGapAnalysis(schemeId);
      setGapData(data);
    } catch (err) {
      console.error('Failed to load gap data:', err);
    } finally {
      setLoading(false);
    }
  };

  const schemes = [
    { id: 'SCH-EDU-POSTMATRIC', name: 'Education Scholarship (Post-Matric)' },
    { id: 'SCH-HOUSING-PMAYG', name: 'Housing Assistance (PMAY-G)' },
    { id: 'SCH-AGRI-PMKISAN', name: 'PM-KISAN Samman Nidhi (Agriculture)' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>FEATURE 4: ⭐ BENEFICIARY GAP ANALYSIS</span>
            <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
              Welfare Gap & Unserved Analytics
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              "Government shouldn't only know how many people received Scheme X. It must know how many potentially eligible citizens are NOT receiving it, and WHY."
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {schemes.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedScheme(s.id)}
                className={`btn btn-sm ${selectedScheme === s.id ? 'btn-primary' : 'btn-secondary'}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Gap Dashboard Content */}
      {gapData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Upper Funnel Cards */}
          <div className="metrics-grid">
            <div className="metric-card cyan">
              <div className="metric-label">Potentially Eligible</div>
              <div className="metric-value">{gapData.potentiallyEligible.toLocaleString('en-IN')}</div>
              <div className="metric-sub">Identified via Beneficiary Registry</div>
            </div>

            <div className="metric-card blue">
              <div className="metric-label">Applications Received</div>
              <div className="metric-value">{gapData.applicationsReceived.toLocaleString('en-IN')}</div>
              <div className="metric-sub">Citizens Submitted</div>
            </div>

            <div className="metric-card emerald">
              <div className="metric-label">Approved</div>
              <div className="metric-value">{gapData.approved.toLocaleString('en-IN')}</div>
              <div className="metric-sub">Sanctioned by Department</div>
            </div>

            <div className="metric-card emerald">
              <div className="metric-label">Benefits Delivered</div>
              <div className="metric-value">{gapData.benefitsDelivered.toLocaleString('en-IN')}</div>
              <div className="metric-sub">Successfully Disbursed</div>
            </div>

            <div className="metric-card rose">
              <div className="metric-label">Potentially Unserved</div>
              <div className="metric-value">{gapData.potentiallyUnserved.toLocaleString('en-IN')}</div>
              <div className="metric-sub">Welfare Delivery Deficit</div>
            </div>
          </div>

          {/* The Unserved Breakdown Analysis */}
          <div className="grid-2">

            {/* Visual Breakdown of the 45,000 Unserved */}
            <div className="glass-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">
                    <span>🔍</span> Anatomy of the Unserved Gap ({gapData.potentiallyUnserved.toLocaleString('en-IN')})
                  </h2>
                  <div className="card-subtitle">
                    Classified diagnosis: Where are citizens stalled or lost?
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {gapData.unservedBreakdown.map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                        {item.reason}
                      </span>
                      <span style={{ fontWeight: 800, color: item.color, fontSize: '1.05rem' }}>
                        {item.count.toLocaleString('en-IN')} ({item.percentage}%)
                      </span>
                    </div>

                    <div className="funnel-bar-bg">
                      <div
                        className="funnel-bar-fill"
                        style={{ width: `${item.percentage}%`, background: item.color }}
                      ></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.45rem', fontSize: '0.76rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Required Administrative Action:</span>
                      <strong style={{ color: 'var(--accent-cyan)' }}>{item.action}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Implications & Policy Insight */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="card-header">
                  <h3 className="card-title">
                    <span>💡</span> Why Gap Analysis Transforms Governance
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.06)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-blue)' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      Traditional Portals vs Beneficiary 360:
                    </strong>
                    Standard portals only report: <em>"We delivered 55,000 scholarships!"</em> and celebrate success. But Beneficiary 360 reveals that <strong>45,000 eligible students are left behind</strong>.
                  </div>

                  <div style={{ background: 'rgba(245, 158, 11, 0.06)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-amber)' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      Differentiated Intervention Strategy:
                    </strong>
                    The 20,000 who didn't apply need <strong>awareness camps</strong>. The 8,000 missing documents need an <strong>SMS upload link</strong>. The 2,000 payment issues need an <strong>Aadhaar NPCI bank mapper refresh</strong>.
                  </div>

                  <div style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-emerald)' }}>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
                      Outcome:
                    </strong>
                    Welfare coverage surges from 55% to 85%+ within a single fiscal cycle by converting unserved pockets into active beneficiaries.
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Active Audit Cycle: FY 2024-25 Q2 | Data Source: State Unified Citizen Registry
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
