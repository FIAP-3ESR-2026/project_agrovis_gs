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
import { buscarDashboardPlantacao } from "../services/dashboardService";
import { buscarPreferencias } from "../storage/preferenciasStorage";
import { DashboardPlantacao } from "../types/agrovis";
import { StateMessage } from "../components/StateMessage";
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
        <Text style={styles.loadingText}>Carregando dados do AgroVis...</Text>
      </View>
    );
  }

if (error || !dashboard) {
  return (
    <View style={styles.center}>
      <StateMessage
        title="Não foi possível carregar os dados"
        description="Verifique se a API está rodando e se a URL configurada no app está correta."
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
      <Text style={styles.header}>AgroVis</Text>
      <Text style={styles.subtitle}>
        Monitoramento inteligente da sua plantação
      </Text>

      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Status geral</Text>
        <Text style={styles.statusValue}>{dashboard.statusGeral}</Text>
        <Text style={styles.recommendation}>
          {dashboard.recomendacaoOperacional}
        </Text>
      </View>

      <InfoCard
        title="Propriedade"
        value={dashboard.nomePropriedade}
        subtitle={`${dashboard.cultura} • ${dashboard.localizacao}`}
      />

      <InfoCard
        title="Área monitorada"
        value={`${dashboard.areaHectares} ha`}
        subtitle="Área total cadastrada para acompanhamento"
      />

      <InfoCard
        title="Alertas pendentes"
        value={String(dashboard.alertasPendentes)}
        subtitle={`${dashboard.alertasCriticos} críticos • ${dashboard.alertasAltos} altos`}
      />

      <InfoCard
        title="Última temperatura"
        value={
          dashboard.ultimaTemperaturaCelsius !== null
            ? `${dashboard.ultimaTemperaturaCelsius}°C`
            : "Sem leitura"
        }
      />

      <InfoCard
        title="Última umidade"
        value={
          dashboard.ultimaUmidadePercentual !== null
            ? `${dashboard.ultimaUmidadePercentual}%`
            : "Sem leitura"
        }
      />

      <Text style={styles.sectionTitle}>Últimos alertas</Text>

      {dashboard.ultimosAlertas.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum alerta recente encontrado.</Text>
      ) : (
        dashboard.ultimosAlertas.map((alerta) => (
          <InfoCard
            key={alerta.id}
            title={alerta.nivelRiscoDescricao}
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
    paddingBottom: spacing.xl,
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
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  errorText: {
    color: colors.muted,
    textAlign: "center",
  },
  header: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: spacing.lg,
  },
  statusBox: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  statusLabel: {
    color: "#DCEFE5",
    fontSize: 14,
  },
  statusValue: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    marginVertical: spacing.xs,
  },
  recommendation: {
    color: "#F3FFF7",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    color: colors.text,
  },
  emptyText: {
    color: colors.muted,
  },
});