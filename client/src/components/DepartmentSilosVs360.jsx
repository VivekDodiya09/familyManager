import React, { useState } from 'react';

export default function DepartmentSilosVs360({ onNavigateTo360 }) {
  const [viewMode, setViewMode] = useState('360'); // 'silos' or '360'

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>ARCHITECTURAL PARADIGM SHIFT</span>
            <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
              The Core Problem: Departmental Silos vs Beneficiary 360°
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              Can the government see the complete lifecycle of a beneficiary across multiple schemes?
            </p>
          </div>

          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '0.25rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
            <button
              className={`btn btn-sm ${viewMode === 'silos' ? 'btn-primary' : ''}`}
              style={{ borderRadius: 'var(--radius-full)', background: viewMode === 'silos' ? 'var(--accent-rose)' : 'transparent', color: viewMode === 'silos' ? 'white' : 'var(--text-secondary)' }}
              onClick={() => setViewMode('silos')}
            >
              ❌ Before: Departmental Silos
            </button>
            <button
              className={`btn btn-sm ${viewMode === '360' ? 'btn-primary' : ''}`}
              style={{ borderRadius: 'var(--radius-full)', background: viewMode === '360' ? 'var(--accent-cyan)' : 'transparent', color: viewMode === '360' ? 'var(--bg-primary)' : 'var(--text-secondary)', fontWeight: 700 }}
              onClick={() => setViewMode('360')}
            >
              ✓ After: Beneficiary 360°
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Visual Comparison */}
      {viewMode === 'silos' ? (
        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
          <div className="card-header">
            <div>
              <h2 className="card-title" style={{ color: 'var(--accent-rose)' }}>
                Traditional Paradigm: Fragmented Departmental Databases
              </h2>
              <div className="card-subtitle">
                Each department operates an isolated island of citizen data with zero cross-visibility.
              </div>
            </div>
            <span className="badge badge-danger">Blind Spots & Citizen Burden</span>
          </div>

          {/* ASCII / Visual Graph of Silos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', margin: '1.5rem 0' }}>
            <div style={{ background: 'rgba(244, 63, 94, 0.04)', border: '1px dashed var(--accent-rose)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem' }}>Department A</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Higher Education</div>
              <div style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>↓</div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.9rem' }}>
                Scholarship DB (Isolated)
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Cannot check if student's family has Ayushman card or farm distress.
              </p>
            </div>

            <div style={{ background: 'rgba(244, 63, 94, 0.04)', border: '1px dashed var(--accent-rose)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏥</div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem' }}>Department B</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Health Authority</div>
              <div style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>↓</div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.9rem' }}>
                PM-JAY Health DB (Isolated)
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Relies on stale census lists; cannot verify live school enrollment or agricultural status.
              </p>
            </div>

            <div style={{ background: 'rgba(244, 63, 94, 0.04)', border: '1px dashed var(--accent-rose)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌾</div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.25rem' }}>Department C</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Agriculture & Farmers Welfare</div>
              <div style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>↓</div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.9rem' }}>
                PM-KISAN DB (Isolated)
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Requires separate land record verification, unable to check housing conditions.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <div style={{ color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
              ❌ <strong>Citizen Harassment:</strong> Citizen must present income, caste, and residence proof separately to 5 different offices.
            </div>
            <div style={{ color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
              ❌ <strong>Ghost Beneficiaries:</strong> Deceased citizens remain active in Department A while canceled in Department B.
            </div>
            <div style={{ color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
              ❌ <strong>Zero Lifecycle Visibility:</strong> Collector cannot tell if a family received any state welfare this month.
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
          <div className="card-header">
            <div>
              <h2 className="card-title" style={{ color: 'var(--accent-cyan)' }}>
                Beneficiary 360° Architecture: Common Identity Layer
              </h2>
              <div className="card-subtitle">
                Family ID acts as the master key connecting household attributes, demographics, and multi-scheme outcomes.
              </div>
            </div>
            <span className="badge badge-success">Single Source of Truth</span>
          </div>

          {/* Connected Architecture Flow */}
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1.5rem', borderRadius: 'var(--radius-md)', margin: '1.25rem 0', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #2563eb, #06b6d4)', padding: '0.6rem 1.75rem', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '1.1rem', color: 'white', boxShadow: 'var(--shadow-glow)' }}>
              FAMILY ID (e.g. GJ-102938)
            </div>

            <div style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)', margin: '0.4rem 0' }}>↓</div>

            <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.06)', padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-blue)', fontWeight: 700 }}>
              UNIFIED BENEFICIARY REGISTRY (Citizens + Household Context + Verified Docs)
            </div>

            <div style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)', margin: '0.4rem 0' }}>↓</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-cyan)' }}>
                <strong>SCHEME A: Education</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>✓ Auto-validated Enrolment</div>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-emerald)' }}>
                <strong>SCHEME B: Health (PM-JAY)</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>✓ Active 5 Member Wallet</div>
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-amber)' }}>
                <strong>SCHEME C: Agriculture</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>✓ RoR 7/12 Mapped Land</div>
              </div>
              <div style={{ background: 'rgba(139, 92, 246, 0.08)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-purple)' }}>
                <strong>SCHEME D: Housing (PMAY-G)</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>⚡ Proactive Outreach Trigger</div>
              </div>
            </div>

            <div style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)', margin: '0.5rem 0' }}>↓</div>

            <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.15)', padding: '0.75rem 2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-emerald)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--badge-text-success)' }}>
              ⭐ BENEFICIARY 360° FLAGSHIP VIEW
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Cross-scheme visibility empowers administrators to assess saturation, prevent duplicate leakages, and track citizen welfare from birth to retirement.
            </div>
            <button
              className="btn btn-primary"
              onClick={() => onNavigateTo360('GJ-102938')}
            >
              Experience Live 360° Search →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
