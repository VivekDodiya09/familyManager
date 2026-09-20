import React, { useState } from 'react';

export default function SchemeRegistry({ schemes, onTestScheme, onNavigateToEngine }) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const categories = ['All', 'Education', 'Health', 'Housing', 'Agriculture', 'Pension', 'Food Security', 'Clean Energy'];

  const filteredSchemes = filterCategory === 'All'
    ? (schemes || [])
    : (schemes || []).filter(s => s.category === filterCategory);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>FEATURE 2: CENTRALIZED CATALOGUE</span>
            <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
              Government Scheme Registry
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              Standardized digital representation of all central and state welfare programs: rules, required documents, benefits, and SLAs.
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => onNavigateToEngine()}
          >
            Launch Eligibility Engine ⚡
          </button>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid-2">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.schemeId} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                <span className="badge badge-info">{scheme.category}</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>
                  {scheme.schemeId}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                {scheme.schemeName}
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                🏛️ {scheme.department}
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', fontSize: '0.82rem' }}>
                <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>
                  Target Beneficiaries:
                </strong>
                {scheme.targetBeneficiaries}
              </div>

              {/* Standardized Scheme Meta */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Benefit Type:</span>
                  <strong>{scheme.benefitType}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Benefit Amount:</span>
                  <strong style={{ color: 'var(--accent-emerald)' }}>{scheme.benefitAmount}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Application Method:</span>
                  <strong>{scheme.applicationMethod}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Citizen Charter SLA:</span>
                  <strong style={{ color: 'var(--accent-amber)' }}>{scheme.slaDays} Days</strong>
                </div>
              </div>

              {/* Rules Preview */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                  KEY ELIGIBILITY CRITERIA:
                </span>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {scheme.eligibilityRules && scheme.eligibilityRules.map((rule, rIdx) => (
                    <li key={rIdx} style={{ marginBottom: '0.2rem' }}>
                      {rule.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              <button
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => onTestScheme(scheme.schemeId)}
              >
                Test Family GJ-102938 ⚡
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedScheme(scheme)}
              >
                View Documents
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Scheme Required Documents Modal / Card */}
      {selectedScheme && (
        <div className="glass-card" style={{ border: '1px solid var(--accent-cyan)' }}>
          <div className="card-header">
            <h3 className="card-title">
              Required Documents: {selectedScheme.schemeName}
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setSelectedScheme(null)}>
              Close
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {selectedScheme.requiredDocuments && selectedScheme.requiredDocuments.map((doc, idx) => (
              <div key={idx} style={{ padding: '0.65rem 1rem', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                📑 <strong>{doc.name}</strong> ({doc.isMandatory ? 'Mandatory' : 'Optional'})
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
