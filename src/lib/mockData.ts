// Dados mock para demonstração do Kanban CRM

import { Usuario, Estagio, Contato, Negocio, Etiqueta, PostIt, Atividade, Pipeline } from '../types';

// Usuários mock
export const usuariosMock: Usuario[] = [
  {
    id: '1',
    nome: 'Ana Silva',
    email: 'ana@empresa.com',
    cargo: 'Gerente de Vendas',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=40&h=40&fit=crop&crop=face',
    criadoEm: new Date('2024-01-01')
  },
  {
    id: '2',
    nome: 'Carlos Santos',
    email: 'carlos@empresa.com',
    cargo: 'Vendedor',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    criadoEm: new Date('2024-01-01')
  },
  {
    id: '3',
    nome: 'Maria Costa',
    email: 'maria@empresa.com',
    cargo: 'Vendedora',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    criadoEm: new Date('2024-01-01')
  }
];

// Pipeline mock
export const pipelineMock: Pipeline = {
  id: 'pipeline-1',
  nome: 'Vendas',
  padrao: true,
  criadoEm: new Date('2024-01-01')
};

// Estágios mock
export const estagiosMock: Estagio[] = [
  {
    id: 'estagio-1',
    pipelineId: 'pipeline-1',
    nome: 'Novo',
    ordem: 1,
    corHex: '#F1F5F9',
    eGanho: false,
    ePerdido: false
  },
  {
    id: 'estagio-2',
    pipelineId: 'pipeline-1',
    nome: 'Qualificação',
    ordem: 2,
    corHex: '#F0FDF4',
    eGanho: false,
    ePerdido: false
  },
  {
    id: 'estagio-3',
    pipelineId: 'pipeline-1',
    nome: 'Proposta',
    ordem: 3,
    corHex: '#FFFBEB',
    eGanho: false,
    ePerdido: false
  },
  {
    id: 'estagio-4',
    pipelineId: 'pipeline-1',
    nome: 'Fechado (Ganho)',
    ordem: 4,
    corHex: '#F0FDF4',
    eGanho: true,
    ePerdido: false
  },
  {
    id: 'estagio-5',
    pipelineId: 'pipeline-1',
    nome: 'Perdido',
    ordem: 5,
    corHex: '#FEF2F2',
    eGanho: false,
    ePerdido: true
  }
];

// Etiquetas mock
export const etiquetasMock: Etiqueta[] = [
  { id: '1', nome: 'Urgente', corHex: '#EF4444' },
  { id: '2', nome: 'Grande Cliente', corHex: '#10B981' },
  { id: '3', nome: 'Oportunidade', corHex: '#F59E0B' },
  { id: '4', nome: 'Follow-up', corHex: '#3B82F6' },
  { id: '5', nome: 'Reunião Marcada', corHex: '#8B5CF6' },
  { id: '6', nome: 'Proposta Enviada', corHex: '#EC4899' }
];

// Contatos mock
export const contatosMock: Contato[] = [
  {
    id: 'contato-1',
    nome: 'João Pereira',
    whatsapp: '(11) 99999-1234',
    email: 'joao@clienteabc.com',
    telefone: '(11) 99999-1234',
    instagram: '@joaopereira',
    facebook: '@joao.pereira',
    linkedin: '/in/joao-pereira',
    enderecoLinha1: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01234-567',
    criadoEm: new Date('2024-01-15'),
    atualizadoEm: new Date('2024-03-01')
  },
  {
    id: 'contato-2',
    nome: 'Empresa XYZ Ltda',
    whatsapp: '(11) 99988-7766',
    email: 'contato@xyz.com.br',
    telefone: '(11) 3333-4567',
    instagram: '@empresaxyz',
    linkedin: '/company/empresa-xyz',
    enderecoLinha1: 'Av. Paulista, 1000',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01310-100',
    criadoEm: new Date('2024-02-01'),
    atualizadoEm: new Date('2024-03-05')
  },
  {
    id: 'contato-3',
    nome: 'Marina Oliveira',
    whatsapp: '(11) 88888-9999',
    email: 'marina@startup.com',
    telefone: '(11) 88888-9999',
    instagram: '@marina_startup',
    facebook: '@marina.oliveira',
    linkedin: '/in/marina-oliveira-startup',
    enderecoLinha1: 'Rua da Inovação, 456',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '04567-890',
    criadoEm: new Date('2024-02-15'),
    atualizadoEm: new Date('2024-03-10')
  }
];

// Post-its mock
export const postItsMock: PostIt[] = [
  {
    id: 'postit-1',
    negocioId: 'negocio-1',
    texto: 'Cliente muito interessado!',
    corHex: '#10B981',
    fixoNoCard: true,
    criadoPor: '1',
    criadoEm: new Date('2024-03-01')
  },
  {
    id: 'postit-2',
    negocioId: 'negocio-2',
    texto: 'Aguardando orçamento',
    corHex: '#F59E0B',
    fixoNoCard: true,
    criadoPor: '2',
    criadoEm: new Date('2024-03-02')
  }
];

// Atividades mock
export const atividadesMock: Atividade[] = [
  {
    id: 'ativ-1',
    negocioId: 'negocio-1',
    tipo: 'nota',
    descricao: 'Primeira conversa com o cliente. Demonstrou muito interesse no produto.',
    autorId: '1',
    criadoEm: new Date('2024-03-01T10:30:00')
  },
  {
    id: 'ativ-2',
    negocioId: 'negocio-1',
    tipo: 'mudanca_estagio',
    descricao: 'Movido de "Novo" para "Qualificação"',
    autorId: '1',
    criadoEm: new Date('2024-03-01T15:00:00')
  }
];

// Negócios mock
export const negociosMock: Negocio[] = [
  {
    id: 'negocio-1',
    contatoId: 'contato-1',
    pipelineId: 'pipeline-1',
    estagioId: 'estagio-2',
    titulo: 'Implementação Sistema CRM',
    valor: 45000.00,
    moeda: 'BRL',
    status: 'aberto',
    responsavelId: '1',
    fonte: 'Website',
    probabilidade: 75,
    ultimaAtividadeEm: new Date('2024-03-01T15:00:00'),
    metaJson: {},
    criadoEm: new Date('2024-02-15'),
    atualizadoEm: new Date('2024-03-01'),
    etiquetas: [etiquetasMock[1], etiquetasMock[4]]
  },
  {
    id: 'negocio-2',
    contatoId: 'contato-2',
    pipelineId: 'pipeline-1',
    estagioId: 'estagio-1',
    titulo: 'Consultoria em Vendas',
    valor: 25000.00,
    moeda: 'BRL',
    status: 'aberto',
    responsavelId: '2',
    fonte: 'Indicação',
    probabilidade: 50,
    ultimaAtividadeEm: new Date('2024-03-02T09:00:00'),
    metaJson: {},
    criadoEm: new Date('2024-02-20'),
    atualizadoEm: new Date('2024-03-02'),
    etiquetas: [etiquetasMock[2]]
  },
  {
    id: 'negocio-3',
    contatoId: 'contato-3',
    pipelineId: 'pipeline-1',
    estagioId: 'estagio-3',
    titulo: 'Sistema de Automação',
    valor: 80000.00,
    moeda: 'BRL',
    status: 'aberto',
    responsavelId: '3',
    fonte: 'LinkedIn',
    probabilidade: 85,
    ultimaAtividadeEm: new Date('2024-03-05T14:30:00'),
    metaJson: {},
    criadoEm: new Date('2024-01-30'),
    atualizadoEm: new Date('2024-03-05'),
    etiquetas: [etiquetasMock[0], etiquetasMock[5]]
  },
  {
    id: 'negocio-4',
    contatoId: 'contato-1',
    pipelineId: 'pipeline-1',
    estagioId: 'estagio-4',
    titulo: 'Treinamento Equipe',
    valor: 15000.00,
    moeda: 'BRL',
    status: 'ganho',
    responsavelId: '1',
    fonte: 'Cliente Existente',
    probabilidade: 100,
    ultimaAtividadeEm: new Date('2024-02-28T16:00:00'),
    metaJson: {},
    criadoEm: new Date('2024-02-01'),
    atualizadoEm: new Date('2024-02-28'),
    etiquetas: [etiquetasMock[1]]
  },
  {
    id: 'negocio-5',
    contatoId: 'contato-2',
    pipelineId: 'pipeline-1',
    estagioId: 'estagio-5',
    titulo: 'Projeto Piloto',
    valor: 35000.00,
    moeda: 'BRL',
    status: 'perdido',
    responsavelId: '2',
    fonte: 'Cold Email',
    probabilidade: 0,
    ultimaAtividadeEm: new Date('2024-02-25T11:00:00'),
    metaJson: {},
    criadoEm: new Date('2024-01-20'),
    atualizadoEm: new Date('2024-02-25'),
    etiquetas: []
  }
];

// Função para buscar contatos por negócios
export const getContatoPorNegocio = (negocioId: string): Contato | undefined => {
  const negocio = negociosMock.find(n => n.id === negocioId);
  return negocio ? contatosMock.find(c => c.id === negocio.contatoId) : undefined;
};

// Função para buscar responsável por negócio
export const getResponsavelPorNegocio = (negocioId: string): Usuario | undefined => {
  const negocio = negociosMock.find(n => n.id === negocioId);
  return negocio ? usuariosMock.find(u => u.id === negocio.responsavelId) : undefined;
};

// Função para buscar estágio por negócio
export const getEstagioPorNegocio = (negocioId: string): Estagio | undefined => {
  const negocio = negociosMock.find(n => n.id === negocioId);
  return negocio ? estagiosMock.find(e => e.id === negocio.estagioId) : undefined;
};