import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, radius, shadow, spacing } from "../styles/theme";

interface StateMessageProps {
  title: string;
  description: string;
  buttonText?: string;
  onPress?: () => void;
  icon?: string;
}

export function StateMessage({
  title,
  description,
  buttonText,
  onPress,
  icon = "🌱",
}: StateMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {buttonText && onPress ? (
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: "center",
    marginTop: spacing.md,
    ...shadow.card,
  },
  icon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 19,
    fontWeight: "900",
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 22,
    textAlign: "center",
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 14,
  },
});