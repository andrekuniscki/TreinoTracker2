import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

export default function DetailScreen({ route, navigation }) {
  const { name, muscle, difficulty, image } = route.params || {};

  const [showFeedback, setShowFeedback] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Accelerometer.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    askPermission();

    const SHAKE_THRESHOLD = 1.5;

    const subscribe = () => {
      Accelerometer.setUpdateInterval(100);
      const subscription = Accelerometer.addListener((accelerometerData) => {
        let { x, y, z } = accelerometerData;

        let accelerationSum = Math.sqrt(
          Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2),
        );

        if (accelerationSum > SHAKE_THRESHOLD) {
          handleShakeDetected();
        }
      });
      return subscription;
    };

    // dispara o feedback visual
    const handleShakeDetected = () => {
      console.log("Shake Detectado!");

      // feedback visual ao usuário
      setShowFeedback(true);

      // some automaticamente após 2 segundos
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    };

    const subscription = subscribe();

    // evita Memory Leak
    return () => {
      subscription && subscription.remove();
    };
  }, []);

  if (hasPermission === null)
    return <Text style={styles.text}>Pedindo permissão para o sensor...</Text>;
  if (hasPermission === false)
    return (
      <Text style={styles.text}>Sem acesso ao acelerômetro do celular.</Text>
    );

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name || "Nome não encontrado"}</Text>
        <Text style={styles.subtext}>
          Foco: {muscle || "Foco não informado"}
        </Text>
        <Text style={styles.subtext}>
          Dificuldade: {difficulty || "Dificuldade não informada"}
        </Text>
        <Text style={styles.description}>
          Instruções: Balance o celular após completar uma série para registrar
          automaticamente no seu histórico.
        </Text>
      </View>

      {}
      {showFeedback && (
        <View style={styles.feedbackOverlay}>
          <Text style={styles.feedbackText}>Série Registrada!</Text>
          <Text style={styles.feedbackSubtext}>
            Aceleração brusca detectada
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: -50,
  },
  textContainer: {
    padding: 20,
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#323131",
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    color: "#666",
  },
  description: {
    fontSize: 14,
    color: "#da291c",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#da291c",
    textAlign: "center",
    padding: 20,
  },

  // ESTILOS DO FEEDBACK VISUAL
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(218, 41, 28, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    ...Platform.select({
      web: { cursor: "none" },
    }),
  },
  feedbackEmoji: {
    fontSize: 70,
    marginBottom: 20,
  },
  feedbackText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  feedbackSubtext: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
    marginTop: 10,
  },
});
