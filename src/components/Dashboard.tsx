import { ArrowLeft, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { negociosMock, estagiosMock } from "@/lib/mockData";
import { formatarMoeda } from "@/lib/utils-br";

interface DashboardProps {
  onVoltar: () => void;
}

export function Dashboard({ onVoltar }: DashboardProps) {
  // Calcular totais
  const totais = {
    aberto: negociosMock.filter(n => n.status === 'aberto').length,
    ganho: negociosMock.filter(n => n.status === 'ganho').length,
    perdido: negociosMock.filter(n => n.status === 'perdido').length,
    somaAberto: negociosMock.filter(n => n.status === 'aberto').reduce((sum, n) => sum + n.valor, 0),
    somaGanho: negociosMock.filter(n => n.status === 'ganho').reduce((sum, n) => sum + n.valor, 0),
    somaPerdido: negociosMock.filter(n => n.status === 'perdido').reduce((sum, n) => sum + n.valor, 0),
  };

  // Dados por estágio
  const dadosPorEstagio = estagiosMock.map(estagio => {
    const negociosDoEstagio = negociosMock.filter(n => n.estagioId === estagio.id);
    return {
      estagio: estagio.nome,
      quantidade: negociosDoEstagio.length,
      valor: negociosDoEstagio.reduce((sum, n) => sum + n.valor, 0)
    };
  });

  // Dados para gráfico pizza
  const dadosPizza = [
    { name: 'Aberto', value: totais.somaAberto, cor: '#3B82F6' },
    { name: 'Ganho', value: totais.somaGanho, cor: '#10B981' },
    { name: 'Perdido', value: totais.somaPerdido, cor: '#EF4444' },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header com fundo verde */}
      <div className="bg-[hsl(var(--header-background))] border-b border-[hsl(var(--border))] p-6">
        <div className="flex items-center gap-4">
          <Button onClick={onVoltar} variant="outline" size="sm" className="control-button shadow-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Kanban
          </Button>
          <h1 className="text-2xl font-semibold text-[hsl(var(--control-text))]">Dashboard</h1>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[hsl(var(--surface))] border-[hsl(var(--border))] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Negócios Abertos</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatarMoeda(totais.somaAberto)}</div>
              <p className="text-xs text-muted-foreground">{totais.aberto} negócios ativos</p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(var(--surface))] border-[hsl(var(--border))] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Negócios Ganhos</CardTitle>
              <TrendingUp className="h-4 w-4 text-[hsl(var(--chart-won))]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[hsl(var(--chart-won))]">{formatarMoeda(totais.somaGanho)}</div>
              <p className="text-xs text-muted-foreground">{totais.ganho} negócios fechados</p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(var(--surface))] border-[hsl(var(--border))] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Negócios Perdidos</CardTitle>
              <TrendingDown className="h-4 w-4 text-[hsl(var(--chart-lost))]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[hsl(var(--chart-lost))]">{formatarMoeda(totais.somaPerdido)}</div>
              <p className="text-xs text-muted-foreground">{totais.perdido} negócios perdidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de barras por estágio */}
          <Card className="bg-[hsl(var(--surface))] border-[hsl(var(--border))] shadow-sm">
            <CardHeader className="bg-[hsl(var(--muted))] rounded-t-lg border-b border-[hsl(var(--border))]">
              <CardTitle>Valor por Estágio</CardTitle>
              <CardDescription>Distribuição de valores nos estágios do pipeline</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosPorEstagio}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="estagio" />
                  <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => formatarMoeda(Number(value))} />
                  <Bar dataKey="valor" fill="hsl(var(--chart-open))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico pizza */}
          <Card className="bg-[hsl(var(--surface))] border-[hsl(var(--border))] shadow-sm">
            <CardHeader className="bg-[hsl(var(--muted))] rounded-t-lg border-b border-[hsl(var(--border))]">
              <CardTitle>Distribuição por Status</CardTitle>
              <CardDescription>Valores totais por status dos negócios</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Aberto', value: totais.somaAberto, cor: 'hsl(var(--chart-open))' },
                      { name: 'Ganho', value: totais.somaGanho, cor: 'hsl(var(--chart-won))' },
                      { name: 'Perdido', value: totais.somaPerdido, cor: 'hsl(var(--chart-lost))' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[
                      { name: 'Aberto', value: totais.somaAberto, cor: 'hsl(var(--chart-open))' },
                      { name: 'Ganho', value: totais.somaGanho, cor: 'hsl(var(--chart-won))' },
                      { name: 'Perdido', value: totais.somaPerdido, cor: 'hsl(var(--chart-lost))' },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatarMoeda(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}