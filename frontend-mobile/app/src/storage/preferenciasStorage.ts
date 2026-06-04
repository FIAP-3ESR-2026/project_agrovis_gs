import AsyncStorage from "@react-native-async-storage/async-storage";
import { PreferenciasUsuario } from "../types/agrovis";

const STORAGE_KEY = "@agrovis:preferencias";

const preferenciasPadrao: PreferenciasUsuario = {
  nomeProdutor: "Produtor AgroVis",
  plantacaoPadraoId: "1",
  notificacoesAtivas: true,
};

export async function salvarPreferencias(
  preferencias: PreferenciasUsuario
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferencias));
}

export async function buscarPreferencias(): Promise<PreferenciasUsuario> {
  const dados = await AsyncStorage.getItem(STORAGE_KEY);

  if (!dados) {
    await salvarPreferencias(preferenciasPadrao);
    return preferenciasPadrao;
  }

  return JSON.parse(dados) as PreferenciasUsuario;
}