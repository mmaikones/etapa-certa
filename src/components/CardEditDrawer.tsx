import { useState, useEffect } from "react";
import { X, Save, User, Mail, Phone, Instagram, Facebook, MapPin, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Negocio } from "@/types";
import { formatarMoeda, formatarData, formatarTelefone, formatarCEP } from "@/lib/utils-br";
import { 
  usuariosMock, 
  estagiosMock, 
  etiquetasMock, 
  getContatoPorNegocio,
  contatosMock 
} from "@/lib/mockData";

interface CardEditDrawerProps {
  negocio: Negocio | null;
  aberto: boolean;
  onClose: () => void;
  onSave: (negocio: Negocio) => void;
}

export function CardEditDrawer({ negocio, aberto, onClose, onSave }: CardEditDrawerProps) {
  const [formData, setFormData] = useState<Negocio | null>(null);
  const [contato, setContato] = useState<any>(null);

  useEffect(() => {
    if (negocio) {
      setFormData({ ...negocio });
      const contatoData = getContatoPorNegocio(negocio.id);
      setContato(contatoData || {});
    }
  }, [negocio]);

  if (!formData || !negocio) return null;

  const handleSave = () => {
    onSave(formData);
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContatoChange = (field: string, value: any) => {
    setContato({ ...contato, [field]: value });
  };

  const adicionarEtiqueta = (etiquetaId: string) => {
    const etiqueta = etiquetasMock.find(e => e.id === etiquetaId);
    if (etiqueta && !formData.etiquetas?.find(e => e.id === etiquetaId)) {
      const novasEtiquetas = [...(formData.etiquetas || []), etiqueta];
      handleFieldChange('etiquetas', novasEtiquetas);
    }
  };

  const removerEtiqueta = (etiquetaId: string) => {
    const novasEtiquetas = formData.etiquetas?.filter(e => e.id !== etiquetaId) || [];
    handleFieldChange('etiquetas', novasEtiquetas);
  };

  return (
    <Sheet open={aberto} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[600px] overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-lg font-semibold">
                Editar Negócio
              </SheetTitle>
              <SheetDescription>
                Gerencie todas as informações do negócio e contato
              </SheetDescription>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Dados do negócio */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Dados do Negócio
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="titulo">Título do Negócio</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => handleFieldChange('titulo', e.target.value)}
                  placeholder="Ex: Implementação de CRM"
                />
              </div>

              <div>
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => handleFieldChange('valor', parseFloat(e.target.value) || 0)}
                  placeholder="0,00"
                />
              </div>

              <div>
                <Label htmlFor="probabilidade">Probabilidade (%)</Label>
                <Input
                  id="probabilidade"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probabilidade || ''}
                  onChange={(e) => handleFieldChange('probabilidade', parseInt(e.target.value) || 0)}
                  placeholder="50"
                />
              </div>

              <div>
                <Label htmlFor="estagio">Estágio</Label>
                <Select 
                  value={formData.estagioId || ''} 
                  onValueChange={(value) => handleFieldChange('estagioId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estágio" />
                  </SelectTrigger>
                  <SelectContent>
                    {estagiosMock.map((estagio) => (
                      <SelectItem key={estagio.id} value={estagio.id}>
                        {estagio.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="responsavel">Responsável</Label>
                <Select 
                  value={formData.responsavelId || ''} 
                  onValueChange={(value) => handleFieldChange('responsavelId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {usuariosMock.map((usuario) => (
                      <SelectItem key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="fonte">Fonte do Lead</Label>
                <Input
                  id="fonte"
                  value={formData.fonte || ''}
                  onChange={(e) => handleFieldChange('fonte', e.target.value)}
                  placeholder="Ex: Website, LinkedIn, Indicação"
                />
              </div>
            </div>
          </div>

          {/* Dados do contato */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados do Contato
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="nome">Nome do Contato</Label>
                <Input
                  id="nome"
                  value={contato?.nome || ''}
                  onChange={(e) => handleContatoChange('nome', e.target.value)}
                  placeholder="Nome completo ou empresa"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={contato?.email || ''}
                    onChange={(e) => handleContatoChange('email', e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="telefone"
                    className="pl-10"
                    value={contato?.telefone || ''}
                    onChange={(e) => handleContatoChange('telefone', formatarTelefone(e.target.value))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="instagram"
                    className="pl-10"
                    value={contato?.instagram || ''}
                    onChange={(e) => handleContatoChange('instagram', e.target.value)}
                    placeholder="@usuario"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="facebook"
                    className="pl-10"
                    value={contato?.facebook || ''}
                    onChange={(e) => handleContatoChange('facebook', e.target.value)}
                    placeholder="@pagina"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={contato?.enderecoLinha1 || ''}
                  onChange={(e) => handleContatoChange('enderecoLinha1', e.target.value)}
                  placeholder="Rua, número, complemento"
                />
              </div>

              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={contato?.cidade || ''}
                  onChange={(e) => handleContatoChange('cidade', e.target.value)}
                  placeholder="São Paulo"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="uf">UF</Label>
                  <Input
                    id="uf"
                    maxLength={2}
                    value={contato?.uf || ''}
                    onChange={(e) => handleContatoChange('uf', e.target.value.toUpperCase())}
                    placeholder="SP"
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={contato?.cep || ''}
                    onChange={(e) => handleContatoChange('cep', formatarCEP(e.target.value))}
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Etiquetas */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Etiquetas</h3>
            
            {/* Etiquetas atuais */}
            <div className="flex flex-wrap gap-2">
              {formData.etiquetas?.map((etiqueta) => (
                <Badge
                  key={etiqueta.id}
                  variant="outline"
                  className="cursor-pointer"
                  style={{
                    backgroundColor: `${etiqueta.corHex}15`,
                    color: etiqueta.corHex,
                    borderColor: `${etiqueta.corHex}30`
                  }}
                  onClick={() => removerEtiqueta(etiqueta.id)}
                >
                  {etiqueta.nome} ×
                </Badge>
              ))}
            </div>

            {/* Adicionar etiquetas */}
            <div>
              <Label>Adicionar Etiqueta</Label>
              <Select onValueChange={adicionarEtiqueta}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma etiqueta" />
                </SelectTrigger>
                <SelectContent>
                  {etiquetasMock
                    .filter(e => !formData.etiquetas?.find(fe => fe.id === e.id))
                    .map((etiqueta) => (
                      <SelectItem key={etiqueta.id} value={etiqueta.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: etiqueta.corHex }}
                          />
                          {etiqueta.nome}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Informações
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Criado em:</span><br />
                {formatarData(formData.criadoEm)}
              </div>
              <div>
                <span className="font-medium">Atualizado em:</span><br />
                {formatarData(formData.atualizadoEm)}
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 pt-6 border-t">
          <Button onClick={handleSave} className="flex-1 animate-button-press">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
          <Button onClick={onClose} variant="outline" className="animate-button-press">
            Cancelar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}