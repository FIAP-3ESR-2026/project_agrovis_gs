import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { InfoCard } from "../components/InfoCard";
import {
  criarLeituraClimatica,
  listarLeiturasClimaticas,
} from "../services/leituraClimaticaService";
import { LeituraClimatica } from "../types/agrovis";
import { StateMessage } from "../components/StateMessage";
import { colors, radius, spacing } from "../styles/theme";

export function LeiturasScreen() {
  const [leituras, setLeituras] = useState<LeituraClimatica[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [temperatura, setTemperatura] = useState("");
  const [umidade, setUmidade] = useState("");
  const [vento, setVento] = useState("");
  const [chuva, setChuva] = useState("");
  const [observacao, setObservacao] = useState("");
  const [error, setError] = useState(false);

  async function carregarLeituras() {
    try {
      const dados = await listarLeiturasClimaticas();
      setLeituras(dados);
    } catch (error) {
      console.log("Erro ao carregar leituras:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function salvarLeitura() {
    const novaLeitura = {
      temperaturaCelsius: Number(temperatura),
      umidadePercentual: Number(umidade),
      velocidadeVentoKmh: Number(vento),
      precipitacaoMm: Number(chuva),
      observacaoVisual: observacao,
      sateliteId: 1,
      plantacaoId: 1,
    };

    if (
      Number.isNaN(novaLeitura.temperaturaCelsius) ||
      Number.isNaN(novaLeitura.umidadePercentual) ||
      Number.isNaN(novaLeitura.velocidadeVentoKmh) ||
      Number.isNaN(novaLeitura.precipitacaoMm)
    ) {
      Alert.alert("Dados inválidos", "Preencha os campos numéricos corretamente.");
      return;
    }

    try {
      await criarLeituraClimatica(novaLeitura);

      Alert.alert(
        "Leitura cadastrada",
        "A leitura climática foi enviada com sucesso. Caso exista risco, a API irá gerar alertas automaticamente."
      );

      setTemperatura("");
      setUmidade("");
      setVento("");
      setChuva("");
      setObservacao("");

      carregarLeituras();
    } catch (error) {
      console.log("Erro ao salvar leitura:", error);

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar a leitura. Verifique se a API está rodando."
      );
    }
  }

  useEffect(() => {
    carregarLeituras();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando leituras climáticas...</Text>
      </View>
    );
  }

  if (error) {
  return (
    <View style={styles.center}>
      <StateMessage
        title="Erro ao carregar leituras"
        description="Não foi possível buscar o histórico climático. Confirme se a API está rodando."
        buttonText="Tentar novamente"
        onPress={() => {
          setLoading(true);
          carregarLeituras();
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
            carregarLeituras();
          }}
        />
      }
    >
      <View style={styles.formBox}>
        <Text style={styles.formTitle}>Nova leitura climática</Text>

        <TextInput
          style={styles.input}
          placeholder="Temperatura em °C"
          keyboardType="numeric"
          value={temperatura}
          onChangeText={setTemperatura}
        />

        <TextInput
          style={styles.input}
          placeholder="Umidade em %"
          keyboardType="numeric"
          value={umidade}
          onChangeText={setUmidade}
        />

        <TextInput
          style={styles.input}
          placeholder="Vento em km/h"
          keyboardType="numeric"
          value={vento}
          onChangeText={setVento}
        />

        <TextInput
          style={styles.input}
          placeholder="Chuva em mm"
          keyboardType="numeric"
          value={chuva}
          onChangeText={setChuva}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Observação visual"
          value={observacao}
          onChangeText={setObservacao}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={salvarLeitura}>
          <Text style={styles.buttonText}>Cadastrar leitura</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Histórico de leituras</Text>

      {leituras.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma leitura cadastrada.</Text>
      ) : (
        leituras.map((leitura) => (
          <InfoCard
            key={leitura.id}
            title={leitura.nomePropriedade ?? "Plantação monitorada"}
            value={`${leitura.temperaturaCelsius}°C`}
            subtitle={`Umidade ${leitura.umidadePercentual}% • Chuva ${leitura.precipitacaoMm}mm`}
          >
            <Text style={styles.message}>
              Vento: {leitura.velocidadeVentoKmh} km/h
            </Text>

            {leitura.observacaoVisual ? (
              <Text style={styles.message}>{leitura.observacaoVisual}</Text>
            ) : null}
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
  formBox: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 15,
    color: colors.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: spacing.md,
    color: colors.text,
  },
  message: {
    marginTop: spacing.sm,
    color: colors.text,
    lineHeight: 20,
  },
  emptyText: {
    color: colors.muted,
  },
});