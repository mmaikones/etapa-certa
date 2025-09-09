// Tipos para o Kanban CRM

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  avatarUrl?: string;
  criadoEm: Date;
}

export interface Pipeline {
  id: string;
  nome: string;
  padrao: boolean;
  criadoEm: Date;
}

export interface Estagio {
  id: string;
  pipelineId: string;
  nome: string;
  ordem: number;
  corHex: string;
  eGanho: boolean;
  ePerdido: boolean;
}

export interface Contato {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  instagram?: string;
  facebook?: string;
  enderecoLinha1?: string;
  enderecoLinha2?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface Negocio {
  id: string;
  contatoId?: string;
  contato?: Contato;
  pipelineId?: string;
  estagioId?: string;
  estagio?: Estagio;
  titulo: string;
  valor: number;
  moeda: string;
  status: 'aberto' | 'ganho' | 'perdido';
  responsavelId?: string;
  responsavel?: Usuario;
  fonte?: string;
  probabilidade?: number;
  ultimaAtividadeEm?: Date;
  metaJson: Record<string, any>;
  criadoEm: Date;
  atualizadoEm: Date;
  etiquetas?: Etiqueta[];
  postIts?: PostIt[];
  atividades?: Atividade[];
}

export interface Etiqueta {
  id: string;
  nome: string;
  corHex: string;
}

export interface PostIt {
  id: string;
  negocioId: string;
  texto: string;
  corHex: string;
  fixoNoCard: boolean;
  criadoPor?: string;
  criadoEm: Date;
}

export interface Atividade {
  id: string;
  negocioId: string;
  tipo: 'nota' | 'mudanca_estagio' | 'edicao_valor' | 'interacao';
  descricao: string;
  autorId?: string;
  autor?: Usuario;
  criadoEm: Date;
}

export interface FiltroKanban {
  responsavel?: string;
  etiquetas?: string[];
  dataInicio?: Date;
  dataFim?: Date;
  busca?: string;
}

export interface RelatorioTotais {
  aberto: number;
  ganho: number;
  perdido: number;
  somaAberto: number;
  somaGanho: number;
  somaPerdido: number;
}

export interface RelatorioPorEstagio {
  estagio: string;
  quantidade: number;
  somaValor: number;
}

// Cores padrão para etiquetas e elementos
export const CORES_ETIQUETAS = [
  { nome: 'Azul', hex: '#3B82F6' },
  { nome: 'Verde', hex: '#10B981' },
  { nome: 'Amarelo', hex: '#F59E0B' },
  { nome: 'Roxo', hex: '#8B5CF6' },
  { nome: 'Rosa', hex: '#EC4899' },
  { nome: 'Vermelho', hex: '#EF4444' },
  { nome: 'Ciano', hex: '#06B6D4' },
];

// Cores padrão para colunas/estágios
export const CORES_ESTAGIOS = [
  { nome: 'Azul claro', hex: '#F1F5F9' },
  { nome: 'Verde claro', hex: '#F0FDF4' },
  { nome: 'Amarelo claro', hex: '#FFFBEB' },
  { nome: 'Roxo claro', hex: '#F5F3FF' },
  { nome: 'Rosa claro', hex: '#FDF2F8' },
  { nome: 'Vermelho claro', hex: '#FEF2F2' },
  { nome: 'Ciano claro', hex: '#F0F9FF' },
];