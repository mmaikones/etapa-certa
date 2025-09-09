import { useState } from "react";
import { 
  Edit3, 
  MoreHorizontal, 
  Move, 
  Copy, 
  Archive, 
  User, 
  Mail, 
  Instagram, 
  Facebook, 
  MapPin,
  MessageCircle,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Negocio, Usuario, Contato, Estagio } from "@/types";
import { formatarMoeda, tempoRelativo, obterIniciais } from "@/lib/utils-br";
import { getContatoPorNegocio, getResponsavelPorNegocio, getEstagioPorNegocio, estagiosMock } from "@/lib/mockData";

interface KanbanCardProps {
  negocio: Negocio;
  onEditClick: (negocio: Negocio) => void;
  onMoveClick: (negocio: Negocio, estagioId: string) => void;
  onDuplicateClick?: (negocio: Negocio) => void;
  onArchiveClick?: (negocio: Negocio) => void;
}

export function KanbanCard({ 
  negocio, 
  onEditClick, 
  onMoveClick, 
  onDuplicateClick, 
  onArchiveClick 
}: KanbanCardProps) {
  const [showActions, setShowActions] = useState(false);
  
  const contato = getContatoPorNegocio(negocio.id);
  const responsavel = getResponsavelPorNegocio(negocio.id);
  const estagio = getEstagioPorNegocio(negocio.id);

  const handleMoveToStage = (estagioId: string) => {
    onMoveClick(negocio, estagioId);
  };

  return (
    <div
      className="kanban-card group cursor-pointer"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={() => onEditClick(negocio)}
    >
      {/* Header do card com título e valor */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-light text-sm text-foreground leading-tight flex-1 mr-2">
          {negocio.titulo}
        </h3>
        <div className="text-right">
          <p className="font-light text-sm text-foreground">
            {formatarMoeda(negocio.valor)}
          </p>
        </div>
      </div>

      {/* Informações do contato */}
      {contato && (
        <div className="mb-3">
          <p className="font-light text-xs text-muted-foreground mb-1">
            {contato.nome}
          </p>
          
          {/* WhatsApp sempre primeiro - preparado para Chatwoot */}
          {contato.whatsapp && (
            <div className="mb-2">
              <Badge 
                variant="outline" 
                className="text-xs px-2 py-1 cursor-pointer hover:bg-green-50 bg-green-50 text-green-700 border-green-200"
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Integração futura com Chatwoot
                  console.log('WhatsApp clicked - preparado para Chatwoot:', contato.whatsapp);
                }}
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                {contato.whatsapp}
              </Badge>
            </div>
          )}
          
          {/* Demais contatos */}
          <div className="flex flex-wrap gap-1">
            {contato.email && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                <Mail className="h-3 w-3 mr-1" />
                E-mail
              </Badge>
            )}
            {contato.instagram && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                <Instagram className="h-3 w-3 mr-1" />
                {contato.instagram}
              </Badge>
            )}
            {contato.facebook && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                <Facebook className="h-3 w-3 mr-1" />
                {contato.facebook}
              </Badge>
            )}
            {contato.linkedin && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                <Linkedin className="h-3 w-3 mr-1" />
                LinkedIn
              </Badge>
            )}
            {contato.cidade && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                <MapPin className="h-3 w-3 mr-1" />
                {contato.cidade}/{contato.uf}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Etiquetas */}
      {negocio.etiquetas && negocio.etiquetas.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {negocio.etiquetas.map((etiqueta) => (
            <Badge
              key={etiqueta.id}
              variant="outline"
              className="text-xs px-2 py-0.5"
              style={{
                backgroundColor: `${etiqueta.corHex}15`,
                color: etiqueta.corHex,
                borderColor: `${etiqueta.corHex}30`
              }}
            >
              {etiqueta.nome}
            </Badge>
          ))}
        </div>
      )}

      {/* Post-its fixos (exemplo) */}
      <div className="mb-3">
        <div className="relative">
          {/* Post-it exemplo - seria dinâmico */}
          {negocio.probabilidade && negocio.probabilidade > 70 && (
            <div 
              className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded transform rotate-3 shadow-sm"
              style={{ fontSize: '10px' }}
            >
              {negocio.probabilidade}% chance!
            </div>
          )}
        </div>
      </div>

      {/* Footer com responsável e última atividade */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        {/* Responsável */}
        <div className="flex items-center gap-2">
          {responsavel && (
            <>
              <Avatar className="h-6 w-6">
                <AvatarImage src={responsavel.avatarUrl} />
                <AvatarFallback className="text-xs">
                  {obterIniciais(responsavel.nome)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {responsavel.nome.split(' ')[0]}
              </span>
            </>
          )}
        </div>

        {/* Última atividade */}
        <div className="text-xs text-muted-foreground">
          {negocio.ultimaAtividadeEm && (
            <span>
              {tempoRelativo(negocio.ultimaAtividadeEm)}
            </span>
          )}
        </div>
      </div>

      {/* Ações rápidas no hover */}
      <div 
        className={`absolute top-2 right-2 flex gap-1 transition-opacity duration-200 ${
          showActions ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Editar */}
        <Button
          size="sm"
          variant="secondary"
          className="h-7 w-7 p-0 animate-button-press"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(negocio);
          }}
        >
          <Edit3 className="h-3 w-3" />
        </Button>

        {/* Menu Mover */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 w-7 p-0 animate-button-press"
              onClick={(e) => e.stopPropagation()}
            >
              <Move className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            {estagiosMock
              .filter(e => e.id !== negocio.estagioId)
              .map((estagio) => (
                <DropdownMenuItem
                  key={estagio.id}
                  onClick={() => handleMoveToStage(estagio.id)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: estagio.corHex }}
                    />
                    Mover para {estagio.nome}
                  </div>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Menu Mais opções */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 w-7 p-0 animate-button-press"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            {onDuplicateClick && (
              <DropdownMenuItem onClick={() => onDuplicateClick(negocio)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </DropdownMenuItem>
            )}
            {onArchiveClick && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onArchiveClick(negocio)}>
                  <Archive className="h-4 w-4 mr-2" />
                  Arquivar
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}