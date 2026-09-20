import React, { useState, useEffect } from 'react';
import { fetchCrossSchemeOverlap } from '../services/api';

export default function CrossSchemeOverlap() {
  const [overlapData, setOverlapData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchCrossSchemeOverlap();
      setOverlapData(data);
    } catch (err) {
      console.error('Failed to load overlap data:', err);
    }
  };

  if (!overlapData) {
    return <div className="glass-card">Loading Cross-Scheme Analysis...</div>;
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>FEATURE 5: MULTI-DEPARTMENT CO-OCCURRENCE</span>
        <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
          Cross-Scheme Beneficiary Overlap Analysis
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
          "Unlocking departmental silos: Discovering multi-scheme co-enrollment, vulnerable unserved populations, and duplicate records requiring verification."
        </p>

        {/* Crucial Ethical Governance Callout */}
        <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-amber)', fontSize: '0.85rem' }}>
          ⚠️ <strong>Administrative Principle:</strong> Overlaps are never labeled as fraud automatically. Instead, they are flagged as <em>"Potential duplicate / overlapping beneficiary record requiring verification"</em>, protecting vulnerable citizens from wrongful termination.
        </div>
      </div>

      {/* Scheme Cohorts Overview */}
      <div className="metrics-grid">
        {overlapData.schemes.map((s, idx) => (
          <div key={idx} className="metric-card" style={{ borderLeftColor: s.color }}>
            <div className="metric-label">{s.name}</div>
            <div className="metric-value" style={{ color: s.color }}>
              {s.count.toLocaleString('en-IN')}
            </div>
            <div className="metric-sub">Active Scheme Beneficiaries</div>
          </div>
        ))}

        <div className="metric-card rose">
          <div className="metric-label">Vulnerable Underserved</div>
          <div className="metric-value">{overlapData.underservedCount.toLocaleString('en-IN')}</div>
          <div className="metric-sub">Eligible for ≥1 Scheme, Receiving 0</div>
        </div>
      </div>

      {/* Venn Overlap Intersections */}
      <div className="grid-2">

        <div className="glass-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">
                <span>🔗</span> Identified Intersections (Venn Overlaps)
              </h2>
              <div className="card-subtitle">
                Pairwise and Triple-Department cross-benefit matrices
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {overlapData.intersections.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>
                    {item.label}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem' }}>
                    {item.count.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="funnel-bar-bg" style={{ margin: '0.5rem 0' }}>
                  <div
                    className="funnel-bar-fill"
                    style={{ width: `${item.percentage * 3.5}%`, background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }}
                  ></div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Policy Insights */}
        <div className="glass-card">
          <div className="card-header">
            <h3 className="card-title">
              <span>🎯</span> Cross-Department Strategic Outcomes
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', fontSize: '0.86rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.3rem' }}>
                1. Bundling Benefits via Family ID:
              </strong>
              With <strong>40,000 families</strong> shared between Education and Health, field teams can distribute Ayushman Health Cards directly through school/college scholarship distribution camps, cutting administrative costs by 60%.
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--accent-emerald)', display: 'block', marginBottom: '0.3rem' }}>
                2. Triple-Benefit Saturation (8,000 Citizens):
              </strong>
              8,000 citizens receive simultaneous assistance across Education, Health, and Agriculture. These represent fully saturated high-vulnerability rural families whose progress toward self-sufficiency can be tracked longitudinally.
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ color: 'var(--accent-rose)', display: 'block', marginBottom: '0.3rem' }}>
                3. Identifying the Forgotten Zero-Benefit Cohort (32,000):
              </strong>
              While 8,000 receive 3 schemes, <strong>32,000 citizens qualify for programs but receive none</strong>. The system flags these coordinates for Gram Panchayat mobile enrollment vans.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
