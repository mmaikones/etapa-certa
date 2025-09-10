import { getRuntimeConfig } from '@/lib/runtimeConfig';

async function fetchJSON<T=any>(path:string, opt:RequestInit={}) {
  const { n8nBase, clientKey } = getRuntimeConfig();
  if (!n8nBase || !clientKey) throw new Error('Config ausente');
  const url = `${n8nBase.replace(/\/$/,'')}${path}`;
  const h = new Headers(opt.headers || {});
  h.set('Content-Type','application/json');
  h.set('X-CLIENT-KEY', clientKey);
  const r = await fetch(url, { ...opt, headers:h, mode:'cors', credentials:'omit' });
  if (!r.ok) { let m=`Erro ${r.status}`; try{const j=await r.json(); m=j?.error||j?.message||m;}catch{} throw new Error(m); }
  return r.json() as Promise<T>;
}

export const API = {
  install: () => fetchJSON('/webhook/install', { method:'POST', body:'{}' }),
  getBoard: () => fetchJSON('/webhook/kanban/board'),
  createCard: (p:any) => fetchJSON('/webhook/kanban/card', { method:'POST', body:JSON.stringify(p) }),
  moveCard: (p:any) => fetchJSON('/webhook/kanban/move', { method:'POST', body:JSON.stringify(p) }),
  updateCard:(p:any)=> fetchJSON('/webhook/kanban/update',{ method:'POST', body:JSON.stringify(p) }),
  dashTotais: () => fetchJSON('/webhook/dashboard/totais'),
  dashPorEstagio: () => fetchJSON('/webhook/dashboard/por-estagio'),
};