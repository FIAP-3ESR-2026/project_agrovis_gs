import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../styles/theme";

interface InfoCardProps {
  title: string;
  value: string;
  subtitle?: string;
  children?: ReactNode;
}

export function InfoCard({ title, value, subtitle, children }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      {children ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  title: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: "600",
    marginBottom: spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  value: {
    fontSize: 23,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textSoft,
    lineHeight: 20,
  },
  content: {
    marginTop: spacing.sm,
  },
});