import { useState } from 'react';
import { API } from '@/lib/api';

export default function InstallButton(){
  const [s,setS]=useState<'idle'|'run'|'ok'|'err'>('idle');
  const [msg,setMsg]=useState('');
  const run=async()=>{ 
    try{ setS('run'); await API.install(); setS('ok'); } 
    catch(e:any){ setMsg(e?.message||'Falha'); setS('err'); } 
  };
  return (
    <div className="flex items-center gap-3">
      <button onClick={run} disabled={s==='run'} className="px-4 py-2 rounded-[15px] border bg-[#F9FAFB] hover:bg-[#F3F4F6]">
        {s==='run'?'Instalando…':'Criar Tabelas (1 clique)'}
      </button>
      {s==='ok' && <span className="text-green-700">Schema instalado ✅</span>}
      {s==='err' && <span className="text-red-600">{msg}</span>}
    </div>
  );
}