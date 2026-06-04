import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { InfoCard } from "../components/InfoCard";
import { MetricCard } from "../components/MetricCard";
import { ScreenHeader } from "../components/ScreenHeader";
import { StateMessage } from "../components/StateMessage";
import { buscarDashboardPlantacao } from "../services/dashboardService";
import { buscarPreferencias } from "../storage/preferenciasStorage";
import { DashboardPlantacao } from "../types/agrovis";
import { colors, spacing } from "../styles/theme";

export function DashboardScreen() {
  const [dashboard, setDashboard] = useState<DashboardPlantacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  async function carregarDashboard() {
    try {
      setError(false);

      const preferencias = await buscarPreferencias();
      const dados = await buscarDashboardPlantacao(preferencias.plantacaoPadraoId);

      setDashboard(dados);
    } catch (error) {
      console.log("Erro ao carregar dashboard:", error);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando monitoramento...</Text>
      </View>
    );
  }

  if (error || !dashboard) {
    return (
      <View style={styles.center}>
        <StateMessage
          title="Não foi possível carregar o dashboard"
          description="Verifique se a API está ativa e se o endereço configurado no app está correto."
          buttonText="Tentar novamente"
          onPress={() => {
            setLoading(true);
            carregarDashboard();
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            carregarDashboard();
          }}
        />
      }
    >
      <ScreenHeader
        title="Painel agrícola"
        subtitle="Resumo inteligente da sua propriedade monitorada"
        status={dashboard.statusGeral}
      />

      <InfoCard
        title="Propriedade monitorada"
        value={dashboard.nomePropriedade}
        subtitle={`${dashboard.cultura} • ${dashboard.localizacao}`}
      >
        <Text style={styles.recommendation}>
          {dashboard.recomendacaoOperacional}
        </Text>
      </InfoCard>

      <View style={styles.metricsRow}>
        <MetricCard
          label="Alertas"
          value={String(dashboard.alertasPendentes)}
          hint="pendentes"
        />
        <View style={styles.metricGap} />
        <MetricCard
          label="Críticos"
          value={String(dashboard.alertasCriticos)}
          hint="prioridade alta"
        />
      </View>

      <View style={styles.metricsRow}>
        <MetricCard
          label="Temperatura"
          value={
            dashboard.ultimaTemperaturaCelsius !== null
              ? `${dashboard.ultimaTemperaturaCelsius}°C`
              : "--"
          }
          hint="última leitura"
        />
        <View style={styles.metricGap} />
        <MetricCard
          label="Umidade"
          value={
            dashboard.ultimaUmidadePercentual !== null
              ? `${dashboard.ultimaUmidadePercentual}%`
              : "--"
          }
          hint="última leitura"
        />
      </View>

      <InfoCard
        title="Área monitorada"
        value={`${dashboard.areaHectares} hectares`}
        subtitle="Área cadastrada para acompanhamento climático e agrícola"
      />

      <Text style={styles.sectionTitle}>Alertas recentes</Text>

      {dashboard.ultimosAlertas.length === 0 ? (
        <StateMessage
          title="Nenhum alerta recente"
          description="A plantação não possui ocorrências recentes para exibir."
        />
      ) : (
        dashboard.ultimosAlertas.map((alerta) => (
          <InfoCard
            key={alerta.id}
            title={`${alerta.tipoDescricao} • ${alerta.nivelRiscoDescricao}`}
            value={alerta.titulo}
            subtitle={alerta.resolvido ? "Resolvido" : "Pendente"}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.muted,
    fontWeight: "600",
  },
  recommendation: {
    marginTop: spacing.sm,
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  metricsRow: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  metricGap: {
    width: spacing.md,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "900",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    color: colors.text,
  },
});