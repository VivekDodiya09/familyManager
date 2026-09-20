import React, { useState } from 'react';

export default function Beneficiary360({ data, onNavigateToTab }) {
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  if (!data || !data.family) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Loading Beneficiary 360° Dossier...</h3>
      </div>
    );
  }

  const { family, members, metrics, schemeParticipation, grievances } = data;
  const activeMember = selectedMemberId
    ? members.find(m => m.beneficiaryId === selectedMemberId)
    : members[0];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Top Banner: Central Flagship Concept */}
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-info" style={{ fontSize: '0.85rem' }}>FLAGSHIP 360° DOSSIER</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Linking Key: <strong>Family ID {family.familyId}</strong>
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', margin: 0 }}>
              Beneficiary 360°
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.92rem' }}>
              "This is beneficiary management, not family management. Complete lifecycle visibility across all schemes."
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="badge badge-success">✓ Biometric eKYC Verified</span>
            <span className="badge badge-info">✓ DBT Aadhaar Mapped</span>
            <span className="badge badge-warning">Ration Card: {family.rationCardCategory}</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '1.25rem 0 1rem', paddingBottom: '0.25rem' }}></div>

        {/* The Exact Flagship Metrics Box from Specification */}
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              Family ID: {family.familyId}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Location: {family.address.village}, {family.address.block}, {family.address.district} ({family.address.state})
            </span>
          </div>

          <div className="metrics-grid" style={{ marginBottom: 0 }}>
            <div className="metric-card cyan">
              <div className="metric-label">Members</div>
              <div className="metric-value">{metrics.membersCount}</div>
              <div className="metric-sub">5 Registered Citizens</div>
            </div>

            <div className="metric-card emerald">
              <div className="metric-label">Active Schemes</div>
              <div className="metric-value">{metrics.activeSchemesCount}</div>
              <div className="metric-sub">Enrolled & Receiving</div>
            </div>

            <div className="metric-card blue">
              <div className="metric-label">Eligible Schemes</div>
              <div className="metric-value">{metrics.eligibleSchemesCount}</div>
              <div className="metric-sub">Auto-evaluated by Rules Engine</div>
            </div>

            <div className="metric-card purple">
              <div className="metric-label">Applications</div>
              <div className="metric-value">{metrics.applicationsCount}</div>
              <div className="metric-sub">Active in Pipeline</div>
            </div>

            <div className="metric-card emerald">
              <div className="metric-label">Benefits Received</div>
              <div className="metric-value">{metrics.benefitsReceivedCount}</div>
              <div className="metric-sub">Disbursements to Date</div>
            </div>

            <div className="metric-card amber">
              <div className="metric-label">Pending Applications</div>
              <div className="metric-value">{metrics.pendingApplicationsCount}</div>
              <div className="metric-sub">Field Verification Stage</div>
            </div>

            <div className="metric-card rose">
              <div className="metric-label">Open Grievances</div>
              <div className="metric-value">{metrics.openGrievancesCount}</div>
              <div className="metric-sub">Payment Delivery Exception</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Scheme Participation Table */}
      <div className="glass-card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>🏛️</span> Scheme Participation Matrix
            </h2>
            <div className="card-subtitle">
              Cross-department visibility: Education, Health, Housing, Agriculture, Pension, Food, Clean Energy
            </div>
          </div>
          <button
            className="btn btn-outline-cyan btn-sm"
            onClick={() => onNavigateToTab('silos')}
          >
            Compare: Silos vs 360° Mode
          </button>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Scheme</th>
                <th>Department</th>
                <th>Eligibility</th>
                <th>Application</th>
                <th>Benefit</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schemeParticipation.map((item) => {
                const isEligible = item.eligibilityDisplay === 'Eligible';
                const isPaid = item.statusDisplay === 'Paid';
                const isActive = item.statusDisplay === 'Active';
                const isPending = item.statusDisplay === 'Pending';
                const isOutreach = item.statusDisplay === 'Outreach';
                const isIneligible = item.statusDisplay === 'Ineligible';

                return (
                  <tr key={item.schemeId}>
                    <td style={{ fontWeight: 600 }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.95rem' }}>{item.category}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.schemeName}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                      {item.department}
                    </td>
                    <td>
                      <span className={`badge ${isEligible ? 'badge-success' : 'badge-danger'}`}>
                        {item.eligibilityDisplay}
                      </span>
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      {item.applicationDisplay}
                    </td>
                    <td style={{ fontWeight: 700, color: isPaid || isActive ? 'var(--accent-emerald)' : 'var(--text-primary)' }}>
                      {item.benefitDisplay}
                    </td>
                    <td>
                      {isPaid && <span className="badge badge-success">Paid</span>}
                      {isActive && <span className="badge badge-info">Active</span>}
                      {isPending && <span className="badge badge-warning">Pending (Field Verif.)</span>}
                      {isOutreach && <span className="badge badge-danger">Outreach (Unserved)</span>}
                      {isIneligible && <span className="badge badge-neutral">—</span>}
                    </td>
                    <td>
                      {isOutreach && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onNavigateToTab('outreach')}
                        >
                          Proactive Apply
                        </button>
                      )}
                      {isPending && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onNavigateToTab('applications')}
                        >
                          Track Bottleneck
                        </button>
                      )}
                      {isPaid && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onNavigateToTab('lifecycle')}
                        >
                          View Receipt
                        </button>
                      )}
                      {isIneligible && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onNavigateToTab('engine')}
                        >
                          Check Rule
                        </button>
                      )}
                      {isActive && !isPaid && (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>In-Benefit</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Household Context & Individual Member Drill-Down */}
      <div className="grid-2">

        {/* Household Context */}
        <div className="glass-card">
          <div className="card-header">
            <h3 className="card-title">
              <span>🏡</span> Household Socio-Economic Context
            </h3>
            <span className="badge badge-info">Family ID Linked</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Dwelling Construction</div>
              <div style={{ fontWeight: 700, marginTop: '0.2rem', color: 'var(--accent-amber)' }}>
                {family.householdType} (Eligible for PMAY-G)
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Annual Household Income</div>
              <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>
                ₹{family.annualIncomeINR.toLocaleString()} ({family.incomeCategory})
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Cultivable Landholding</div>
              <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>
                {family.landHoldingAcres} Acres (Marginal Farmer)
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Ration Card Tier</div>
              <div style={{ fontWeight: 700, marginTop: '0.2rem' }}>
                {family.rationCardCategory} ({family.rationCardNumber})
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(6, 182, 212, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--accent-cyan)', fontSize: '0.8rem' }}>
            💡 <strong>Cross-Scheme Advantage:</strong> Updating household data here immediately recomputes eligibility for all 5 members across Education, Health, Housing, and Agriculture without asking citizens to re-submit proof.
          </div>
        </div>

        {/* Member-Level Drill-Down */}
        <div className="glass-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <span>👥</span> Individual Member Registry
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {members.length} registered citizens • Click to view individual entitlement profile
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline-cyan btn-sm"
              onClick={() => onNavigateToTab('register', { mode: 'add-member', familyId: family.familyId })}
              title="Add a new beneficiary to this family"
            >
              + Add Member
            </button>
          </div>

          {/* Member selector tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            {members.map(m => (
              <button
                key={m.beneficiaryId}
                onClick={() => setSelectedMemberId(m.beneficiaryId)}
                className={`btn btn-sm ${activeMember.beneficiaryId === m.beneficiaryId ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem' }}
              >
                {m.name} ({m.relationToHead.split(' ')[0]})
              </button>
            ))}
          </div>

          {/* Selected Member Profile Card */}
          {activeMember && (
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--accent-cyan)' }}>
                    {activeMember.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Beneficiary ID: {activeMember.beneficiaryId} | {activeMember.relationToHead}
                  </span>
                </div>
                <span className="badge badge-success">
                  {activeMember.eKycVerified ? 'eKYC Passed' : 'Pending eKYC'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', fontSize: '0.8rem', marginBottom: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Gender / Age:</span>
                  <strong>{activeMember.gender}, {Math.floor((Date.now() - new Date(activeMember.dob).getTime()) / (1000 * 3600 * 24 * 365.25))} yrs</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Occupation:</span>
                  <strong>{activeMember.occupation}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Education:</span>
                  <strong>{activeMember.educationLevel}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Aadhaar Token:</span>
                  <strong>{activeMember.aadhaarToken}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>Bank Account:</span>
                  <strong>{activeMember.bankName} (Linked)</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>DBT Status:</span>
                  <strong style={{ color: 'var(--accent-emerald)' }}>Active Direct Credit</strong>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.65rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                  ATTACHED VERIFIED DOCUMENTS:
                </span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {activeMember.documents && activeMember.documents.map((doc, idx) => (
                    <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      📄 {doc.docType} ({doc.docNumber})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
