// Utilitários para formatação brasileira

import { cn } from "./utils";

// Formatação de moeda brasileira
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

// Formatação de data brasileira
export function formatarData(data: Date | string): string {
  const dataObj = typeof data === 'string' ? new Date(data) : data;
  return new Intl.DateTimeFormat('pt-BR').format(dataObj);
}

// Formatação de data e hora brasileira
export function formatarDataHora(data: Date | string): string {
  const dataObj = typeof data === 'string' ? new Date(data) : data;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dataObj);
}

// Formatação de telefone brasileiro
export function formatarTelefone(telefone: string): string {
  const apenasNumeros = telefone.replace(/\D/g, '');
  
  if (apenasNumeros.length === 11) {
    return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (apenasNumeros.length === 10) {
    return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return telefone;
}

// Formatação de CEP brasileiro
export function formatarCEP(cep: string): string {
  const apenasNumeros = cep.replace(/\D/g, '');
  
  if (apenasNumeros.length === 8) {
    return apenasNumeros.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  
  return cep;
}

// Função para obter tempo relativo em português
export function tempoRelativo(data: Date | string): string {
  const agora = new Date();
  const dataObj = typeof data === 'string' ? new Date(data) : data;
  const diffMs = agora.getTime() - dataObj.getTime();
  
  const minutos = Math.floor(diffMs / (1000 * 60));
  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (minutos < 1) return 'agora mesmo';
  if (minutos < 60) return `há ${minutos}min`;
  if (horas < 24) return `há ${horas}h`;
  if (dias < 7) return `há ${dias}d`;
  
  return formatarData(dataObj);
}

// Função para obter iniciais do nome
export function obterIniciais(nome: string): string {
  return nome
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

// Função para gerar cor com base em string
export function gerarCorPorString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const cores = [
    '#3B82F6', // azul
    '#10B981', // verde
    '#F59E0B', // amarelo
    '#8B5CF6', // roxo
    '#EC4899', // rosa
    '#EF4444', // vermelho
    '#06B6D4', // ciano
  ];
  
  return cores[Math.abs(hash) % cores.length];
}

// Validações brasileiras
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarTelefone(telefone: string): boolean {
  const apenasNumeros = telefone.replace(/\D/g, '');
  return apenasNumeros.length === 10 || apenasNumeros.length === 11;
}

export function validarCEP(cep: string): boolean {
  const apenasNumeros = cep.replace(/\D/g, '');
  return apenasNumeros.length === 8;
}

// Função helper para classes CSS condicionais
export { cn };