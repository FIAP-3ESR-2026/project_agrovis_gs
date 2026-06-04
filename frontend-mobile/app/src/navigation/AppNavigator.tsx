import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardScreen } from "../screens/DashboardScreen";
import { AlertasScreen } from "../screens/AlertasScreen";
import { PreferenciasScreen } from "../screens/PreferenciasScreen";
import { colors } from "../styles/theme";

export type RootTabParamList = {
  Dashboard: undefined;
  Alertas: undefined;
  Preferencias: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: "Dashboard" }}
        />

        <Tab.Screen
          name="Alertas"
          component={AlertasScreen}
          options={{ title: "Alertas" }}
        />

        <Tab.Screen
          name="Preferencias"
          component={PreferenciasScreen}
          options={{ title: "Preferências" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}