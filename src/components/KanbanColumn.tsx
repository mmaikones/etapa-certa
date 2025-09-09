import { useState } from "react";
import { Plus, MoreHorizontal, Edit3, Trash2, Palette } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { KanbanCard } from "./KanbanCard";
import { SortableKanbanCard } from "./SortableKanbanCard";
import { Estagio, Negocio } from "@/types";
import { formatarMoeda } from "@/lib/utils-br";

interface KanbanColumnProps {
  estagio: Estagio;
  negocios: Negocio[];
  onCardClick: (negocio: Negocio) => void;
  onCardMove: (negocio: Negocio, estagioId: string) => void;
  onAddCardClick: (estagioId: string) => void;
  onEditColumnClick: (estagio: Estagio) => void;
  onDeleteColumnClick: (estagio: Estagio) => void;
  onChangeColumnColor: (estagio: Estagio) => void;
}

export function KanbanColumn({
  estagio,
  negocios,
  onCardClick,
  onCardMove,
  onAddCardClick,
  onEditColumnClick,
  onDeleteColumnClick,
  onChangeColumnColor,
}: KanbanColumnProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { setNodeRef } = useDroppable({
    id: estagio.id,
  });

  // Calcular valor total da coluna
  const valorTotal = negocios.reduce((sum, negocio) => sum + negocio.valor, 0);

  return (
    <div
      ref={setNodeRef}
      className="kanban-column flex flex-col"
      style={{
        backgroundColor: estagio.corHex || '#FFFFFF',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header da coluna */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/30">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-base text-foreground">
              {estagio.nome}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {negocios.length}
            </Badge>
          </div>
          
          <p className="text-sm font-medium text-muted-foreground">
            {formatarMoeda(valorTotal)}
          </p>
        </div>

        {/* Menu da coluna */}
        <div className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 animate-button-press"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditColumnClick(estagio)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Renomear Coluna
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onChangeColumnColor(estagio)}>
                <Palette className="h-4 w-4 mr-2" />
                Alterar Cor
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDeleteColumnClick(estagio)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Coluna
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Botão adicionar card */}
      <Button
        variant="outline"
        className="mb-4 animate-button-press border-dashed"
        onClick={() => onAddCardClick(estagio.id)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Novo Card
      </Button>

      {/* Lista de cards com espaçamento de 12px */}
      <div className="flex-1 space-y-3">{/* space-y-3 = 12px entre cards */}
        <SortableContext 
          items={negocios.map(n => n.id)} 
          strategy={verticalListSortingStrategy}
        >
          {negocios.map((negocio) => (
            <SortableKanbanCard
              key={negocio.id}
              negocio={negocio}
              onEditClick={onCardClick}
              onMoveClick={onCardMove}
            />
          ))}
        </SortableContext>
      </div>

      {/* Indicador de drop zone */}
      <div className="h-2 opacity-0 group-hover:opacity-50 bg-primary rounded transition-opacity duration-200 mt-2" />
    </div>
  );
}