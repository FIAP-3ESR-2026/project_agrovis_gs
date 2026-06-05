import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../styles/theme";

const labels: Record<string, string> = {
  Dashboard: "Início",
  Alertas: "Alertas",
  Leituras: "Leituras",
  Plantacoes: "Plantações",
  Preferencias: "Ajustes",
};

const icons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  Dashboard: { active: "grid", inactive: "grid-outline" },
  Alertas: { active: "warning", inactive: "warning-outline" },
  Leituras: { active: "cloud", inactive: "cloud-outline" },
  Plantacoes: { active: "leaf", inactive: "leaf-outline" },
  Preferencias: { active: "settings", inactive: "settings-outline" },
};

export function AppFooter({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>AgroVis • ODS 2 e ODS 13</Text>

      <View style={styles.navRow}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const options = descriptors[route.key].options;

          function onPress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          const iconName = focused
            ? icons[route.name]?.active
            : icons[route.name]?.inactive;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.navButton}
            >
              <Ionicons
                name={iconName ?? "ellipse-outline"}
                size={22}
                color={focused ? colors.primary : colors.muted}
              />

              <Text style={[styles.navLabel, focused && styles.navLabelActive]}>
                {labels[route.name] ?? route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  footerText: {
    textAlign: "center",
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 58,
    paddingVertical: spacing.xs,
  },
  navLabel: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  navLabelActive: {
    color: colors.primary,
  },
});