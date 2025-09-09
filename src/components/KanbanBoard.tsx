import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";
import { CardEditDrawer } from "./CardEditDrawer";
import { Estagio, Negocio, FiltroKanban } from "@/types";
import { negociosMock, estagiosMock } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface KanbanBoardProps {
  filtro: FiltroKanban;
  onAddCard: (estagioId?: string) => void;
  onAddColumn: () => void;
}

export function KanbanBoard({ filtro, onAddCard, onAddColumn }: KanbanBoardProps) {
  const [estagios, setEstagios] = useState<Estagio[]>(estagiosMock);
  const [negocios, setNegocios] = useState<Negocio[]>(negociosMock);
  const [negocioEditando, setNegocioEditando] = useState<Negocio | null>(null);
  const [drawerAberto, setDrawerAberto] = useState(false);

  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Filtrar negócios baseado nos filtros ativos
  const negociosFiltrados = negocios.filter((negocio) => {
    // Filtro por responsável
    if (filtro.responsavel && negocio.responsavelId !== filtro.responsavel) {
      return false;
    }

    // Filtro por etiquetas
    if (filtro.etiquetas && filtro.etiquetas.length > 0) {
      const temEtiqueta = negocio.etiquetas?.some(etiqueta => 
        filtro.etiquetas!.includes(etiqueta.id)
      );
      if (!temEtiqueta) return false;
    }

    // Filtro por busca
    if (filtro.busca) {
      const busca = filtro.busca.toLowerCase();
      const contatoNome = negocio.contato?.nome?.toLowerCase() || '';
      const contatoEmail = negocio.contato?.email?.toLowerCase() || '';
      const contatoInstagram = negocio.contato?.instagram?.toLowerCase() || '';
      const titulo = negocio.titulo.toLowerCase();
      
      const encontrado = titulo.includes(busca) || 
                        contatoNome.includes(busca) || 
                        contatoEmail.includes(busca) ||
                        contatoInstagram.includes(busca);
      
      if (!encontrado) return false;
    }

    return true;
  });

  // Organizar negócios por estágio
  const negociosPorEstagio = (estagioId: string) => {
    return negociosFiltrados.filter(negocio => negocio.estagioId === estagioId);
  };

  // Handlers para drag and drop
  const handleDragStart = (event: DragStartEvent) => {
    // Feedback visual quando começar a arrastar
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Se arrastar sobre uma coluna diferente
    if (activeId !== overId) {
      const activeNegocio = negocios.find(n => n.id === activeId);
      const overEstagio = estagios.find(e => e.id === overId);

      if (activeNegocio && overEstagio && activeNegocio.estagioId !== overEstagio.id) {
        setNegocios(negocios.map(negocio => 
          negocio.id === activeId 
            ? { ...negocio, estagioId: overEstagio.id }
            : negocio
        ));
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Se moveu para um estágio diferente
    const activeNegocio = negocios.find(n => n.id === activeId);
    const overEstagio = estagios.find(e => e.id === overId);

    if (activeNegocio && overEstagio) {
      toast({
        title: "Negócio movido com sucesso",
        description: `"${activeNegocio.titulo}" foi movido para "${overEstagio.nome}"`,
      });
    }
  };

  // Handlers para ações dos cards
  const handleCardClick = (negocio: Negocio) => {
    setNegocioEditando(negocio);
    setDrawerAberto(true);
  };

  const handleCardMove = (negocio: Negocio, estagioId: string) => {
    const novoEstagio = estagios.find(e => e.id === estagioId);
    
    setNegocios(negocios.map(n => 
      n.id === negocio.id 
        ? { ...n, estagioId, atualizadoEm: new Date() }
        : n
    ));

    if (novoEstagio) {
      toast({
        title: "Negócio movido com sucesso",
        description: `"${negocio.titulo}" foi movido para "${novoEstagio.nome}"`,
      });
    }
  };

  const handleSaveCard = (negocioAtualizado: Negocio) => {
    setNegocios(negocios.map(n => 
      n.id === negocioAtualizado.id ? negocioAtualizado : n
    ));
    
    setDrawerAberto(false);
    setNegocioEditando(null);
    
    toast({
      title: "Negócio atualizado com sucesso",
      description: `As alterações em "${negocioAtualizado.titulo}" foram salvas.`,
    });
  };

  // Handlers para ações das colunas
  const handleEditColumn = (estagio: Estagio) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A edição de colunas será implementada em breve.",
    });
  };

  const handleDeleteColumn = (estagio: Estagio) => {
    toast({
      title: "Funcionalidade em desenvolvimento", 
      description: "A exclusão de colunas será implementada em breve.",
    });
  };

  const handleChangeColumnColor = (estagio: Estagio) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A alteração de cor das colunas será implementada em breve.",
    });
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="p-6 bg-[hsl(var(--background))]">{/* Fundo branco quente #FAFAF9 */}
          <div className="flex gap-6 overflow-x-auto pb-6">
            <SortableContext 
              items={estagios.map(e => e.id)} 
              strategy={horizontalListSortingStrategy}
            >
              {estagios
                .sort((a, b) => a.ordem - b.ordem)
                .map((estagio) => (
                  <KanbanColumn
                    key={estagio.id}
                    estagio={estagio}
                    negocios={negociosPorEstagio(estagio.id)}
                    onCardClick={handleCardClick}
                    onCardMove={handleCardMove}
                    onAddCardClick={onAddCard}
                    onEditColumnClick={handleEditColumn}
                    onDeleteColumnClick={handleDeleteColumn}
                    onChangeColumnColor={handleChangeColumnColor}
                  />
                ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>

      {/* Drawer de edição de card */}
      <CardEditDrawer
        negocio={negocioEditando}
        aberto={drawerAberto}
        onClose={() => {
          setDrawerAberto(false);
          setNegocioEditando(null);
        }}
        onSave={handleSaveCard}
      />
    </>
  );
}