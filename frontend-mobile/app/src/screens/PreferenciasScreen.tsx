import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  buscarPreferencias,
  salvarPreferencias,
} from "../storage/preferenciasStorage";
import { PreferenciasUsuario } from "../types/agrovis";
import { colors, radius, spacing } from "../styles/theme";

export function PreferenciasScreen() {
  const [preferencias, setPreferencias] = useState<PreferenciasUsuario>({
    nomeProdutor: "",
    plantacaoPadraoId: "1",
    notificacoesAtivas: true,
  });

  async function carregarPreferencias() {
    const dados = await buscarPreferencias();
    setPreferencias(dados);
  }

  async function salvar() {
    await salvarPreferencias(preferencias);

    Alert.alert(
      "Preferências salvas",
      "Suas configurações locais foram atualizadas com sucesso."
    );
  }

  useEffect(() => {
    carregarPreferencias();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Preferências</Text>
      <Text style={styles.subtitle}>
        Configure os dados locais usados pelo aplicativo AgroVis
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do produtor</Text>
        <TextInput
          style={styles.input}
          value={preferencias.nomeProdutor}
          onChangeText={(texto) =>
            setPreferencias((atual) => ({
              ...atual,
              nomeProdutor: texto,
            }))
          }
          placeholder="Digite seu nome"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>ID da plantação padrão</Text>
        <TextInput
          style={styles.input}
          value={preferencias.plantacaoPadraoId}
          onChangeText={(texto) =>
            setPreferencias((atual) => ({
              ...atual,
              plantacaoPadraoId: texto,
            }))
          }
          keyboardType="numeric"
          placeholder="Ex: 1"
        />
      </View>

      <View style={styles.switchRow}>
        <View>
          <Text style={styles.label}>Notificações</Text>
          <Text style={styles.helper}>
            Ativar avisos locais para alertas importantes
          </Text>
        </View>

        <Switch
          value={preferencias.notificacoesAtivas}
          onValueChange={(valor) =>
            setPreferencias((atual) => ({
              ...atual,
              notificacoesAtivas: valor,
            }))
          }
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>Salvar preferências</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
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
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  switchRow: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helper: {
    color: colors.muted,
    maxWidth: 230,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});