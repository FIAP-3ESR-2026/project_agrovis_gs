import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius, spacing } from "../styles/theme";

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  status?: string;
}

export function ScreenHeader({ title, subtitle, status }: ScreenHeaderProps) {
  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primary]}
      style={styles.container}
    >
      <View>
        <Text style={styles.appName}>AgroVis</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {status ? (
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  appName: {
    color: "#DCEFE5",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "900",
  },
  subtitle: {
    color: "#ECFFF4",
    fontSize: 15,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  statusPill: {
    marginTop: spacing.md,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  statusText: {
    color: colors.white,
    fontWeight: "800",
  },
});