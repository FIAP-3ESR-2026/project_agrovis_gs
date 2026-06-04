import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { colors } from "./src/styles/theme";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DashboardScreen />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});