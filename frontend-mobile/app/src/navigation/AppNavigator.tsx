import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { DashboardScreen } from "../screens/DashboardScreen";
import { AlertasScreen } from "../screens/AlertasScreen";
import { LeiturasScreen } from "../screens/LeiturasScreen";
import { PlantacoesScreen } from "../screens/PlantacoesScreen";
import { PreferenciasScreen } from "../screens/PreferenciasScreen";
import { colors } from "../styles/theme";

export type RootTabParamList = {
  Dashboard: undefined;
  Alertas: undefined;
  Leituras: undefined;
  Plantacoes: undefined;
  Preferencias: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function getIconName(routeName: keyof RootTabParamList, focused: boolean) {
  const icons = {
    Dashboard: focused ? "grid" : "grid-outline",
    Alertas: focused ? "warning" : "warning-outline",
    Leituras: focused ? "cloud" : "cloud-outline",
    Plantacoes: focused ? "leaf" : "leaf-outline",
    Preferencias: focused ? "settings" : "settings-outline",
  } as const;

  return icons[routeName];
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 68,
            paddingTop: 8,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
          },
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={getIconName(route.name as keyof RootTabParamList, focused)}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: "Início" }}
        />

        <Tab.Screen
          name="Alertas"
          component={AlertasScreen}
          options={{ title: "Alertas" }}
        />

        <Tab.Screen
          name="Leituras"
          component={LeiturasScreen}
          options={{ title: "Leituras" }}
        />

        <Tab.Screen
          name="Plantacoes"
          component={PlantacoesScreen}
          options={{ title: "Plantações" }}
        />

        <Tab.Screen
          name="Preferencias"
          component={PreferenciasScreen}
          options={{ title: "Ajustes" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}