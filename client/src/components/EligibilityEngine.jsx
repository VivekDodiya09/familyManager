import React, { useState, useEffect } from 'react';
import { evaluateScheme } from '../services/api';

export default function EligibilityEngine({ schemes, familyData, preselectedSchemeId }) {
  const family = familyData ? familyData.family : null;
  const members = familyData ? familyData.members : [];

  const [selectedSchemeId, setSelectedSchemeId] = useState(preselectedSchemeId || 'SCH-EDU-POSTMATRIC');
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState(members[2] ? members[2].beneficiaryId : (members[0] ? members[0].beneficiaryId : ''));
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedSchemeId) {
      setSelectedSchemeId(preselectedSchemeId);
    }
  }, [preselectedSchemeId]);

  useEffect(() => {
    if (selectedSchemeId && selectedBeneficiaryId && family) {
      runEvaluation();
    }
  }, [selectedSchemeId, selectedBeneficiaryId]);

  const runEvaluation = async () => {
    setLoading(true);
    try {
      const res = await evaluateScheme(selectedBeneficiaryId, family.familyId, selectedSchemeId);
      setEvaluationResult(res);
    } catch (err) {
      console.error('Evaluation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedMember = members.find(m => m.beneficiaryId === selectedBeneficiaryId) || members[0];
  const selectedSchemeObj = (schemes || []).find(s => s.schemeId === selectedSchemeId) || (schemes && schemes[0]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header Banner */}
      <div className="glass-card">
        <span className="badge badge-info" style={{ marginBottom: '0.4rem' }}>FEATURE 3: DECISION ENGINE</span>
        <h1 style={{ fontSize: '1.85rem', margin: 0 }}>
          Transparent Eligibility Engine
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
          "Beneficiary Data + Family Context + Scheme Rules → Clear Verdict + Explainable Reasons (✓ / ✗)"
        </p>

        {/* Dynamic Sandbox Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
              1. SELECT SCHEME TO TEST:
            </label>
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.6rem', color: 'var(--text-primary)', outline: 'none' }}
            >
              {schemes && schemes.map(s => (
                <option key={s.schemeId} value={s.schemeId} style={{ background: '#111827' }}>
                  {s.category}: {s.schemeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', fontWeight: 600 }}>
              2. SELECT CITIZEN (FAMILY {family ? family.familyId : 'GJ-102938'}):
            </label>
            <select
              value={selectedBeneficiaryId}
              onChange={(e) => setSelectedBeneficiaryId(e.target.value)}
              style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.6rem', color: 'var(--text-primary)', outline: 'none' }}
            >
              {members.map(m => (
                <option key={m.beneficiaryId} value={m.beneficiaryId} style={{ background: '#111827' }}>
                  {m.name} ({m.relationToHead}) — Age {Math.floor((Date.now() - new Date(m.dob).getTime()) / (1000 * 3600 * 24 * 365.25))}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Decision Engine Output */}
      {evaluationResult && (
        <div className="glass-card" style={{ borderLeft: `4px solid ${
          evaluationResult.verdict === 'ELIGIBLE' ? 'var(--accent-emerald)' :
          evaluationResult.verdict === 'POTENTIALLY_ELIGIBLE' ? 'var(--accent-amber)' : 'var(--accent-rose)'
        }`}}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Decision Output for <strong>{selectedMember ? selectedMember.name : 'Citizen'}</strong>
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: '0.2rem 0' }}>
                {evaluationResult.schemeName}
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                🏛️ {evaluationResult.department} | Benefit: <strong style={{ color: 'var(--accent-emerald)' }}>{evaluationResult.benefitAmount}</strong>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                STATUS VERDICT
              </div>
              <div style={{ marginTop: '0.35rem' }}>
                {evaluationResult.verdict === 'ELIGIBLE' && (
                  <span className="badge badge-success" style={{ fontSize: '1.1rem', padding: '0.4rem 1rem' }}>
                    ✓ ELIGIBLE
                  </span>
                )}
                {evaluationResult.verdict === 'POTENTIALLY_ELIGIBLE' && (
                  <span className="badge badge-warning" style={{ fontSize: '1.1rem', padding: '0.4rem 1rem' }}>
                    ⚡ POTENTIALLY ELIGIBLE
                  </span>
                )}
                {evaluationResult.verdict === 'NOT_ELIGIBLE' && (
                  <span className="badge badge-danger" style={{ fontSize: '1.1rem', padding: '0.4rem 1rem' }}>
                    ✗ NOT ELIGIBLE
                  </span>
                )}
                {evaluationResult.verdict === 'MISSING_INFORMATION' && (
                  <span className="badge badge-info" style={{ fontSize: '1.1rem', padding: '0.4rem 1rem' }}>
                    ? MISSING INFORMATION
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Transparent Criteria Breakdown (✓ and ✗) */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Transparent Criteria Evaluation Audit
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {evaluationResult.criteriaBreakdown && evaluationResult.criteriaBreakdown.map((rule, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1rem',
                    background: rule.passed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(244, 63, 94, 0.05)',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${rule.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.2rem', color: rule.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 800 }}>
                      {rule.passed ? '✓' : '✗'}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                        {rule.description}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {rule.reason} (Scope: {rule.scope})
                      </div>
                    </div>
                  </div>

                  <span className={`badge ${rule.passed ? 'badge-success' : 'badge-danger'}`}>
                    {rule.passed ? 'Satisfied' : 'Failed'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Documents Check */}
          {evaluationResult.missingDocuments && evaluationResult.missingDocuments.length > 0 && (
            <div style={{ marginTop: '1.5rem', background: 'rgba(245, 158, 11, 0.06)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>📑</span>
                <strong style={{ color: 'var(--accent-amber)', fontSize: '0.9rem' }}>
                  Missing / Unverified Required Documents ({evaluationResult.missingDocuments.length})
                </strong>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                All eligibility criteria were satisfied, but the following documents must be verified to release DBT sanction:
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {evaluationResult.missingDocuments.map((doc, dIdx) => (
                  <span key={dIdx} className="badge badge-warning">
                    ✗ {doc.name} (Required)
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Citizen & Official Transparency Callout */}
          <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            🤝 <strong>Zero Ambiguity:</strong> Because both citizens and officials see the exact same explainable rules checklist, appeals and grievances are drastically reduced. If ineligible, the system points directly to the failing parameter.
          </div>

        </div>
      )}

    </div>
  );
}
