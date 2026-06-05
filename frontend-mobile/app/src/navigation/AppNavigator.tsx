import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { DashboardScreen } from "../screens/DashboardScreen";
import { AlertasScreen } from "../screens/AlertasScreen";
import { LeiturasScreen } from "../screens/LeiturasScreen";
import { PlantacoesScreen } from "../screens/PlantacoesScreen";
import { PreferenciasScreen } from "../screens/PreferenciasScreen";
import { AppHeader } from "../components/AppHeader";
import { AppFooter } from "../components/AppFooter";
import { colors } from "../styles/theme";

export type RootTabParamList = {
  Dashboard: undefined;
  Alertas: undefined;
  Leituras: undefined;
  Plantacoes: undefined;
  Preferencias: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <AppFooter {...props} />}
        screenOptions={({ route, navigation }) => ({
          header: () => (
            <AppHeader
              navigation={navigation}
              currentRouteName={route.name}
            />
          ),
          sceneStyle: {
            backgroundColor: colors.background,
          },
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
          options={{ title: "Preferências" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}