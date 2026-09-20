// API Service for Beneficiary 360°

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function loginAuthority(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Login failed' }));
    throw new Error(err.error || 'Login failed');
  }
  return res.json();
}

async function apiFetch(url, options = {}) {
  const session = JSON.parse(localStorage.getItem('beneficiary360_session') || 'null');
  const headers = { ...(options.headers || {}) };
  if (session?.token) headers.Authorization = `Bearer ${session.token}`;
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem('beneficiary360_session');
    window.dispatchEvent(new Event('auth-expired'));
  }
  return res;
}

export async function fetchBeneficiarySearch(query = 'GJ-102938') {
  const res = await apiFetch(`${BASE_URL}/beneficiaries/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to fetch beneficiary data');
  return res.json();
}

export async function fetchFamilies() {
  const res = await apiFetch(`${BASE_URL}/beneficiaries/families`);
  if (!res.ok) throw new Error('Failed to fetch families');
  return res.json();
}

export async function registerBeneficiary(payload) {
  const res = await apiFetch(`${BASE_URL}/beneficiaries/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Registration failed' }));
    throw new Error(err.error || 'Registration failed');
  }
  return res.json();
}

export async function addBeneficiaryMember(payload) {
  const res = await apiFetch(`${BASE_URL}/beneficiaries/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to add member' }));
    throw new Error(err.error || 'Failed to add member');
  }
  return res.json();
}

export async function fetchSchemes() {
  const res = await apiFetch(`${BASE_URL}/schemes`);
  if (!res.ok) throw new Error('Failed to fetch schemes');
  return res.json();
}

export async function evaluateScheme(beneficiaryId, familyId, schemeId) {
  const res = await apiFetch(`${BASE_URL}/schemes/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ beneficiaryId, familyId, schemeId })
  });
  if (!res.ok) throw new Error('Failed to evaluate scheme');
  return res.json();
}

export async function fetchApplications() {
  const res = await apiFetch(`${BASE_URL}/applications`);
  if (!res.ok) throw new Error('Failed to fetch applications');
  return res.json();
}

export async function advanceApplication(applicationId, newStage, remarks) {
  const res = await apiFetch(`${BASE_URL}/applications/${applicationId}/advance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newStage, remarks })
  });
  if (!res.ok) throw new Error('Failed to advance application');
  return res.json();
}

export async function fetchGrievances() {
  const res = await apiFetch(`${BASE_URL}/grievances`);
  if (!res.ok) throw new Error('Failed to fetch grievances');
  return res.json();
}

export async function fileGrievance(data) {
  const res = await apiFetch(`${BASE_URL}/grievances`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to file grievance');
  return res.json();
}

export async function resolveGrievance(grievanceId, resolutionNotes) {
  const res = await apiFetch(`${BASE_URL}/grievances/${grievanceId}/resolve`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resolutionNotes })
  });
  if (!res.ok) throw new Error('Failed to resolve grievance');
  return res.json();
}

export async function fetchGapAnalysis(schemeId) {
  const url = schemeId ? `${BASE_URL}/analytics/gap-analysis?schemeId=${encodeURIComponent(schemeId)}` : `${BASE_URL}/analytics/gap-analysis`;
  const res = await apiFetch(url);
  if (!res.ok) throw new Error('Failed to fetch gap analysis');
  return res.json();
}

export async function fetchCrossSchemeOverlap() {
  const res = await apiFetch(`${BASE_URL}/analytics/cross-scheme-overlap`);
  if (!res.ok) throw new Error('Failed to fetch overlap analysis');
  return res.json();
}

export async function fetchConversionFunnel() {
  const res = await apiFetch(`${BASE_URL}/analytics/conversion-funnel`);
  if (!res.ok) throw new Error('Failed to fetch conversion funnel');
  return res.json();
}

export async function fetchOutreach(schemeId) {
  const url = schemeId ? `${BASE_URL}/analytics/outreach?schemeId=${encodeURIComponent(schemeId)}` : `${BASE_URL}/analytics/outreach`;
  const res = await apiFetch(url);
  if (!res.ok) throw new Error('Failed to fetch outreach list');
  return res.json();
}

export async function fetchCommandMetrics() {
  const res = await apiFetch(`${BASE_URL}/dashboard/command`);
  if (!res.ok) throw new Error('Failed to fetch command metrics');
  return res.json();
}

export async function fetchExceptions() {
  const res = await apiFetch(`${BASE_URL}/dashboard/exceptions`);
  if (!res.ok) throw new Error('Failed to fetch exceptions');
  return res.json();
}
