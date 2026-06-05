import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, shadow, spacing } from "../styles/theme";

interface AppHeaderProps {
  navigation: any;
  currentRouteName: string;
}

const navItems = [
  { label: "Início", route: "Dashboard" },
  { label: "Alertas", route: "Alertas" },
  { label: "Leituras", route: "Leituras" },
  { label: "Plantações", route: "Plantacoes" },
  { label: "Ajustes", route: "Preferencias" },
];

export function AppHeader({ navigation, currentRouteName }: AppHeaderProps) {
  function handleLogin() {
    Alert.alert(
      "Login AgroVis",
      "Área de autenticação preparada para evolução futura do projeto."
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.brand}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <View style={styles.logoBox}>
            <Ionicons name="leaf" size={22} color={colors.white} />
          </View>

          <View>
            <Text style={styles.brandName}>AgroVis</Text>
            <Text style={styles.brandSubtitle}>Space Agriculture Platform</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Ionicons name="person-circle-outline" size={18} color={colors.white} />
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navContent}
      >
        {navItems.map((item) => {
          const active = currentRouteName === item.route;

          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.navItem, active && styles.navItemActive]}
              onPress={() => navigation.navigate(item.route)}
            >
              <Text style={[styles.navText, active && styles.navTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadow.card,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  logoBox: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.primaryDark,
  },
  brandSubtitle: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "600",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  loginText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 13,
  },
  navContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
    gap: spacing.sm,
  },
  navItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.surfaceSoft,
  },
  navItemActive: {
    backgroundColor: colors.primary,
  },
  navText: {
    color: colors.textSoft,
    fontWeight: "700",
    fontSize: 13,
  },
  navTextActive: {
    color: colors.white,
  },
});