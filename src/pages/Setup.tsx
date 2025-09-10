import InstallButton from '@/components/InstallButton';

export default function SetupPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Configuração Inicial</h1>
      <p className="text-sm text-gray-600 mt-2">
        Abra o app com os parâmetros na URL:
        <code className="ml-1">?n8n_base=https://SEU-N8N.com&k=SUA_CHAVE</code>.
        Depois clique no botão abaixo para criar as tabelas no seu Supabase via n8n.
      </p>
      <div className="mt-4">
        <InstallButton />
      </div>
    </div>
  );
}