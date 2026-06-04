export type NivelRisco = 1 | 2 | 3 | 4;

export type TipoAlerta = 1 | 2 | 3 | 4 | 5 | 6;

export interface AlertaResumo {
  id: number;
  titulo: string;
  tipo: TipoAlerta;
  tipoDescricao: string;
  nivelRisco: NivelRisco;
  nivelRiscoDescricao: string;
  resolvido: boolean;
  criadoEm: string;
}

export interface DashboardPlantacao {
  plantacaoId: number;
  nomePropriedade: string;
  cultura: string;
  localizacao: string;
  areaHectares: number;
  totalAlertas: number;
  alertasPendentes: number;
  alertasResolvidos: number;
  alertasCriticos: number;
  alertasAltos: number;
  ultimaTemperaturaCelsius: number | null;
  ultimaUmidadePercentual: number | null;
  ultimaVelocidadeVentoKmh: number | null;
  ultimaPrecipitacaoMm: number | null;
  dataUltimaLeitura: string | null;
  statusGeral: string;
  recomendacaoOperacional: string;
  ultimosAlertas: AlertaResumo[];
}

export interface PreferenciasUsuario {
  nomeProdutor: string;
  plantacaoPadraoId: string;
  notificacoesAtivas: boolean;
}