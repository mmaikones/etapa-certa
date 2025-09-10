export function getRuntimeConfig() {
  if (typeof window === 'undefined') return { n8nBase: '', clientKey: '' };
  const url = new URL(window.location.href);
  const base = url.searchParams.get('n8n_base') || localStorage.getItem('n8n_base') || '';
  const k    = url.searchParams.get('k')        || localStorage.getItem('client_key') || '';
  if (url.searchParams.get('n8n_base')) localStorage.setItem('n8n_base', base);
  if (url.searchParams.get('k'))        localStorage.setItem('client_key', k);
  return { n8nBase: base, clientKey: k };
}