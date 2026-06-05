import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";

import DetailScreen from "./screens/DetailScreen";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SensorScreen from "./screens/SensorScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerTintColor: "#323131",
        headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#da291c",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          elevation: 5,
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "TreinoTracker",
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/images/tabIcons/inicio.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ListScreen"
        component={ListScreen}
        options={{
          title: "Exercícios",
          tabBarLabel: "Treinos",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/images/tabIcons/treinos.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/images/tabIcons/perfil.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SensorScreen"
        component={SensorScreen}
        options={{
          title: "Sensores",
          tabBarLabel: "Sensores",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/images/tabIcons/sensor.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={({ route }) => ({
            title: route.params?.name || "Detalhes do Exercício",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#f5f5f5" },
            headerTintColor: "#323131",
            headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
            headerShadowVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
