import { ScrollView, StyleSheet, Text, View } from "react-native";
import SensorFeatures from "../components/SensorFeatures";

export default function SensorScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensores do Dispositivo</Text>
        <Text style={styles.subtitle}>
          Explore as funcionalidades de sensores do seu dispositivo
        </Text>
      </View>

      <SensorFeatures />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#323131",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});
