import React, { useState } from 'react';

export default function Header({ currentFamilyId, onSearch, onSelectFamilyId, onNavigateToTab, authority, onLogout }) {
  const [searchInput, setSearchInput] = useState(currentFamilyId || 'GJ-102938');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const quickIds = [
    { id: 'GJ-102938', label: 'GJ-102938 (Patel Family - Flagship 5 Members)', state: 'Gujarat' },
    { id: 'UP-492019', label: 'UP-492019 (Yadav Family - AAY / PMAY)', state: 'UP' },
    { id: 'MH-338291', label: 'MH-338291 (Jadhav Family - Health / Agri)', state: 'MH' }
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand-section">
          <div className="brand-badge">360°</div>
          <div>
            <div className="brand-title">
              BENEFICIARY 360°
            </div>
            <div className="brand-subtitle">
              Common Family Identity Layer & Lifecycle Platform
            </div>
          </div>
        </div>

        <div className="search-container">
          <form onSubmit={handleSubmit} className="search-input-wrapper">
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>🔍</span>
            <input
              type="text"
              className="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Family ID (e.g. GJ-102938), Beneficiary ID, Aadhaar Token, or Name..."
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Search 360°
            </button>
          </form>

          <div className="quick-id-tags">
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Demo IDs:</span>
            {quickIds.map(item => (
              <button
                key={item.id}
                type="button"
                className={`id-chip ${currentFamilyId === item.id ? 'active' : ''}`}
                onClick={() => {
                  setSearchInput(item.id);
                  onSelectFamilyId(item.id);
                }}
                title={item.label}
              >
                {item.id}
              </button>
            ))}
          </div>
        </div>

        <div className="header-actions">
          {onNavigateToTab && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onNavigateToTab('register')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
            >
              <span>+ New Registration</span>
            </button>
          )}

          <div className="officer-badge">
            <div className="officer-avatar">AS</div>
            <div className="officer-info">
              <span className="officer-name">{authority?.name || 'Government Authority'}</span>
              <span className="officer-role">{authority?.role || 'Government Authority'}</span>
            </div>
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onLogout}>Sign out</button>
        </div>
      </div>
    </header>
  );
}
