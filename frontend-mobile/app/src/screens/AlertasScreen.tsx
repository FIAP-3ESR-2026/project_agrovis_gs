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
import { listarAlertasPendentes } from "../services/alertaService";
import { Alerta } from "../types/agrovis";
import { StateMessage } from "../components/StateMessage";
import { colors, spacing } from "../styles/theme";

export function AlertasScreen() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

async function carregarAlertas() {
  try {
    setError(false);

    const dados = await listarAlertasPendentes();
    setAlertas(dados);
  } catch (error) {
    console.log("Erro ao carregar alertas:", error);
    setError(true);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}

  useEffect(() => {
    carregarAlertas();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando alertas...</Text>
      </View>
    );
    
  }
if (error) {
  return (
    <View style={styles.center}>
      <StateMessage
        title="Erro ao carregar alertas"
        description="Não foi possível buscar os alertas pendentes. Verifique se o backend está ativo."
        buttonText="Tentar novamente"
        onPress={() => {
          setLoading(true);
          carregarAlertas();
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
            carregarAlertas();
          }}
        />
      }
    >
      <Text style={styles.header}>Alertas</Text>
      <Text style={styles.subtitle}>
        Ocorrências pendentes identificadas pela análise climática
      </Text>

      {alertas.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhum alerta pendente</Text>
          <Text style={styles.emptyText}>
            Sua plantação não possui alertas ativos no momento.
          </Text>
        </View>
      ) : (
        alertas.map((alerta) => (
          <InfoCard
            key={alerta.id}
            title={`${alerta.tipoDescricao} • ${alerta.nivelRiscoDescricao}`}
            value={alerta.titulo}
            subtitle={
              alerta.nomePropriedade
                ? `${alerta.nomePropriedade} • ${alerta.cultura ?? "Cultura não informada"}`
                : "Plantação monitorada"
            }
          >
            <Text style={styles.message}>{alerta.mensagem}</Text>
          </InfoCard>
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
  header: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: spacing.lg,
  },
  message: {
    marginTop: spacing.sm,
    color: colors.text,
    lineHeight: 20,
  },
  emptyBox: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  emptyText: {
    color: colors.muted,
  },
});