import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../styles/theme";

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
}

export function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
  },
  hint: {
    color: colors.textSoft,
    marginTop: spacing.xs,
    fontSize: 12,
  },
});