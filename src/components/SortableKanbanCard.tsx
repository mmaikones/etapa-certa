import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KanbanCard } from "./KanbanCard";
import { Negocio } from "@/types";

interface SortableKanbanCardProps {
  negocio: Negocio;
  onEditClick: (negocio: Negocio) => void;
  onMoveClick: (negocio: Negocio, estagioId: string) => void;
}

export function SortableKanbanCard({ negocio, onEditClick, onMoveClick }: SortableKanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: negocio.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-50 scale-105 z-50' : ''} transition-all duration-200`}
      {...attributes}
      {...listeners}
    >
      <KanbanCard
        negocio={negocio}
        onEditClick={onEditClick}
        onMoveClick={onMoveClick}
      />
    </div>
  );
}