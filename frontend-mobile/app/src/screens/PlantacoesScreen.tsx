import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InfoCard } from "../components/InfoCard";
import { listarPlantacoes } from "../services/plantacaoService";
import { StateMessage } from "../components/StateMessage";
import {
  buscarPreferencias,
  salvarPreferencias,
} from "../storage/preferenciasStorage";
import { Plantacao, PreferenciasUsuario } from "../types/agrovis";
import { colors, radius, spacing } from "../styles/theme";

export function PlantacoesScreen() {
  const [plantacoes, setPlantacoes] = useState<Plantacao[]>([]);
  const [preferencias, setPreferencias] = useState<PreferenciasUsuario | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

async function carregarDados() {
  try {
    setError(false);

    const [dadosPlantacoes, dadosPreferencias] = await Promise.all([
      listarPlantacoes(),
      buscarPreferencias(),
    ]);

    setPlantacoes(dadosPlantacoes);
    setPreferencias(dadosPreferencias);
  } catch (error) {
    console.log("Erro ao carregar plantações:", error);
    setError(true);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}

  async function definirPlantacaoPadrao(plantacao: Plantacao) {
    if (!preferencias) {
      return;
    }

    const novasPreferencias: PreferenciasUsuario = {
      ...preferencias,
      plantacaoPadraoId: String(plantacao.id),
    };

    await salvarPreferencias(novasPreferencias);
    setPreferencias(novasPreferencias);

    Alert.alert(
      "Plantação padrão atualizada",
      `${plantacao.nomePropriedade} agora será usada como referência no Dashboard.`
    );
  }

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando plantações...</Text>
      </View>
    );
  }
if (error) {
  return (
    <View style={styles.center}>
      <StateMessage
        title="Erro ao carregar plantações"
        description="Não foi possível buscar as plantações cadastradas. Verifique a conexão com a API."
        buttonText="Tentar novamente"
        onPress={() => {
          setLoading(true);
          carregarDados();
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
            carregarDados();
          }}
        />
      }
    >

      {plantacoes.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhuma plantação cadastrada</Text>
          <Text style={styles.emptyText}>
            Cadastre uma plantação pela API para visualizá-la no aplicativo.
          </Text>
        </View>
      ) : (
        plantacoes.map((plantacao) => {
          const isPadrao =
            preferencias?.plantacaoPadraoId === String(plantacao.id);

          return (
            <InfoCard
              key={plantacao.id}
              title={isPadrao ? "Plantação padrão" : "Plantação cadastrada"}
              value={plantacao.nomePropriedade}
              subtitle={`${plantacao.cultura} • ${plantacao.localizacao}`}
            >
              <Text style={styles.infoText}>
                Área monitorada: {plantacao.areaHectares} hectares
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  isPadrao ? styles.buttonDisabled : styles.buttonPrimary,
                ]}
                onPress={() => definirPlantacaoPadrao(plantacao)}
                disabled={isPadrao}
              >
                <Text style={styles.buttonText}>
                  {isPadrao
                    ? "Selecionada como padrão"
                    : "Usar no Dashboard"}
                </Text>
              </TouchableOpacity>
            </InfoCard>
          );
        })
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
  infoText: {
    marginTop: spacing.sm,
    color: colors.text,
  },
  button: {
    marginTop: spacing.md,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.muted,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  emptyBox: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.lg,
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