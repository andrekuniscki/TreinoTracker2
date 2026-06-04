import { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

let Accelerometer = null;
if (Platform.OS !== "web") {
  Accelerometer = require("expo-sensors").Accelerometer;
}

export default function AccelerometerScreen() {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [shakeDetected, setShakeDetected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);

  const startListening = () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Não disponível",
        "Acelerômetro está disponível apenas no dispositivo mobile.",
      );
      return;
    }

    try {
      Accelerometer.setUpdateInterval(100);
      const subscription = Accelerometer.addListener((data) => {
        setAcceleration({
          x: parseFloat(data.x.toFixed(2)),
          y: parseFloat(data.y.toFixed(2)),
          z: parseFloat(data.z.toFixed(2)),
        });

        // Detectar shake (movimento brusco)
        const magnitude = Math.sqrt(
          data.x * data.x + data.y * data.y + data.z * data.z,
        );
        if (magnitude > 2.5) {
          setShakeDetected(true);
          setShakeCount((prev) => prev + 1);
          setTimeout(() => setShakeDetected(false), 1000);
        }
      });

      setIsListening(true);

      return () => {
        subscription.remove();
      };
    } catch (error) {
      Alert.alert("Erro", "Não foi possível iniciar o acelerômetro");
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setShakeCount(0);
    setAcceleration({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    if (isListening) {
      return startListening();
    }
  }, [isListening]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 Acelerômetro</Text>
        <Text style={styles.subtitle}>
          Sensor de movimento e detecção de gestos
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados em Tempo Real</Text>

        <View style={styles.dataGrid}>
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Eixo X</Text>
            <Text style={styles.dataValue}>{acceleration.x}</Text>
            <Text style={styles.dataUnit}>m/s²</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Eixo Y</Text>
            <Text style={styles.dataValue}>{acceleration.y}</Text>
            <Text style={styles.dataUnit}>m/s²</Text>
          </View>
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Eixo Z</Text>
            <Text style={styles.dataValue}>{acceleration.z}</Text>
            <Text style={styles.dataUnit}>m/s²</Text>
          </View>
        </View>

        {/* Magnitude */}
        <View style={styles.magnitudeBox}>
          <Text style={styles.magnitudeLabel}>Magnitude Total</Text>
          <Text style={styles.magnitudeValue}>
            {Math.sqrt(
              acceleration.x * acceleration.x +
                acceleration.y * acceleration.y +
                acceleration.z * acceleration.z,
            ).toFixed(2)}
            m/s²
          </Text>
        </View>

        {/* Shake Detection */}
        {shakeDetected && (
          <View style={styles.shakeAlert}>
            <Text style={styles.shakeText}>🤝 Movimento Detectado!</Text>
          </View>
        )}

        {/* Statistics */}
        <View style={styles.statsBox}>
          <Text style={styles.statsLabel}>Eventos de Movimento Detectados</Text>
          <Text style={styles.statsValue}>{shakeCount}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsCard}>
        <Text style={styles.sectionTitle}>Controles</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isListening && styles.buttonActive]}
            onPress={() => setIsListening(!isListening)}
          >
            <Text style={styles.buttonText}>
              {isListening ? "⏸ Parar" : "▶ Iniciar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={stopListening}
          >
            <Text style={styles.buttonText}>🔄 Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Sobre o Acelerômetro</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Eixos X, Y, Z</Text>
          <Text style={styles.infoText}>
            Medem a aceleração em cada direção (lateral, frontal, vertical)
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Magnitude</Text>
          <Text style={styles.infoText}>
            Cálculo da aceleração total: √(x² + y² + z²)
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Detecção de Movimento</Text>
          <Text style={styles.infoText}>
            Dispara quando magnitude {">"} 2.5 m/s² (shake ou movimento rápido)
          </Text>
        </View>
      </View>
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
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    ...Platform.select({
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#323131",
    marginBottom: 16,
  },
  dataGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dataItem: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  dataLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
  },
  dataValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#da291c",
    marginVertical: 4,
  },
  dataUnit: {
    fontSize: 11,
    color: "#999",
  },
  magnitudeBox: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#da291c",
  },
  magnitudeLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  magnitudeValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#da291c",
    marginTop: 4,
  },
  shakeAlert: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  shakeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  statsBox: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  statsLabel: {
    fontSize: 12,
    color: "#2E7D32",
  },
  statsValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D32",
    marginTop: 4,
  },
  controlsCard: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    ...Platform.select({
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
    }),
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "#da291c",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#B81C0C",
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#8e8e93",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 0,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    ...Platform.select({
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
    }),
  },
  infoBox: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#323131",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
});
