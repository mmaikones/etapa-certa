import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { KanbanBoard } from "@/components/KanbanBoard";
import { Dashboard } from "@/components/Dashboard";
import { FiltroKanban } from "@/types";

const Index = () => {
  const [mostrarDashboard, setMostrarDashboard] = useState(false);
  const [filtro, setFiltro] = useState<FiltroKanban>({});

  const handleNovaColunaClick = () => {
    // Implementar criação de nova coluna
    console.log("Nova coluna clicada");
  };

  const handleNovoCardClick = (estagioId?: string) => {
    // Implementar criação de novo card
    console.log("Novo card clicado", estagioId);
  };

  if (mostrarDashboard) {
    return (
      <>
        <Dashboard onVoltar={() => setMostrarDashboard(false)} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        filtro={filtro}
        onFiltroChange={setFiltro}
        onNovaColunaClick={handleNovaColunaClick}
        onNovoCardClick={() => handleNovoCardClick()}
        onDashboardClick={() => setMostrarDashboard(true)}
      />
      
      <KanbanBoard
        filtro={filtro}
        onAddCard={handleNovoCardClick}
        onAddColumn={handleNovaColunaClick}
      />
      
      <Toaster />
    </div>
  );
};

export default Index;
