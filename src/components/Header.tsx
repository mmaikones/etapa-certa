import { useState } from "react";
import { Search, Plus, Filter, BarChart3, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { usuariosMock, etiquetasMock } from "@/lib/mockData";
import { FiltroKanban } from "@/types";

interface HeaderProps {
  filtro: FiltroKanban;
  onFiltroChange: (filtro: FiltroKanban) => void;
  onNovaColunaClick: () => void;
  onNovoCardClick: () => void;
  onDashboardClick: () => void;
}

export function Header({ 
  filtro, 
  onFiltroChange, 
  onNovaColunaClick, 
  onNovoCardClick, 
  onDashboardClick 
}: HeaderProps) {
  const [buscaLocal, setBuscaLocal] = useState(filtro.busca || '');

  const handleBuscaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltroChange({ ...filtro, busca: buscaLocal });
  };

  const toggleResponsavel = (responsavelId: string) => {
    const novoResponsavel = filtro.responsavel === responsavelId ? undefined : responsavelId;
    onFiltroChange({ ...filtro, responsavel: novoResponsavel });
  };

  const toggleEtiqueta = (etiquetaId: string) => {
    const etiquetasAtuais = filtro.etiquetas || [];
    const novasEtiquetas = etiquetasAtuais.includes(etiquetaId)
      ? etiquetasAtuais.filter(id => id !== etiquetaId)
      : [...etiquetasAtuais, etiquetaId];
    onFiltroChange({ ...filtro, etiquetas: novasEtiquetas });
  };

  const limparFiltros = () => {
    setBuscaLocal('');
    onFiltroChange({});
  };

  const temFiltrosAtivos = !!(filtro.responsavel || (filtro.etiquetas && filtro.etiquetas.length > 0) || filtro.busca);

  return (
    <header className="bg-[#F0FDF4] border-b border-border p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-4">
        {/* Logo e título */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-foreground">Kanban CRM</h1>
          
          <Button
            onClick={onDashboardClick}
            variant="outline"
            size="sm"
            className="animate-button-press bg-white border-[#E5E7EB] text-[#111827] rounded-[15px] hover:bg-[#FAFAF9]"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </div>

        {/* Filtros e busca */}
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          {/* Busca */}
          <form onSubmit={handleBuscaSubmit} className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, e-mail, Instagram..."
              value={buscaLocal}
              onChange={(e) => setBuscaLocal(e.target.value)}
              className="pl-10 bg-[#FAFAF9] border-[#E5E7EB] rounded-[15px] focus:bg-white"
            />
          </form>

          {/* Filtro por responsável */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="animate-button-press bg-[#FAFAF9] border-[#E5E7EB] text-[#111827] rounded-[15px] hover:bg-white">
                <User className="h-4 w-4 mr-2" />
                Responsável
                {filtro.responsavel && (
                  <Badge variant="secondary" className="ml-2">
                    1
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filtrar por responsável</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {usuariosMock.map((usuario) => (
                <DropdownMenuCheckboxItem
                  key={usuario.id}
                  checked={filtro.responsavel === usuario.id}
                  onCheckedChange={() => toggleResponsavel(usuario.id)}
                >
                  {usuario.nome}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filtro por etiquetas */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="animate-button-press bg-[#FAFAF9] border-[#E5E7EB] text-[#111827] rounded-[15px] hover:bg-white">
                <Filter className="h-4 w-4 mr-2" />
                Etiquetas
                {filtro.etiquetas && filtro.etiquetas.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filtro.etiquetas.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filtrar por etiquetas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {etiquetasMock.map((etiqueta) => (
                <DropdownMenuCheckboxItem
                  key={etiqueta.id}
                  checked={(filtro.etiquetas || []).includes(etiqueta.id)}
                  onCheckedChange={() => toggleEtiqueta(etiqueta.id)}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: etiqueta.corHex }}
                    />
                    {etiqueta.nome}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botão limpar filtros */}
          {temFiltrosAtivos && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={limparFiltros}
              className="animate-button-press"
            >
              Limpar filtros
            </Button>
          )}
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onNovaColunaClick}
            variant="outline"
            size="sm"
            className="animate-button-press bg-[#FAFAF9] border-[#E5E7EB] text-[#111827] rounded-[15px] hover:bg-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Coluna
          </Button>
          
          <Button
            onClick={onNovoCardClick}
            size="sm"
            className="animate-button-press bg-primary text-primary-foreground rounded-[15px] hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Card
          </Button>
        </div>
      </div>
    </header>
  );
}