import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

let ImagePicker = null;
let Location = null;

if (Platform.OS !== "web") {
  ImagePicker = require("expo-image-picker");
  Location = require("expo-location");
}

export default function SensorFeatures() {
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  // geolocalização (apenas mobile)
  const handleGetLocation = async () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Não disponível",
        "Geolocalização está disponível apenas no dispositivo mobile.",
      );
      return;
    }

    try {
      setLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão Negada",
          "Permissão de localização não concedida",
        );
        setLocationLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        altitude: currentLocation.coords.altitude,
      });

      Alert.alert(
        "Localização Obtida",
        `Lat: ${currentLocation.coords.latitude.toFixed(4)}\nLon: ${currentLocation.coords.longitude.toFixed(4)}`,
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter a localização");
    } finally {
      setLocationLoading(false);
    }
  };

  // câmera/galeria (apenas mobile)
  const handlePickImage = async () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Não disponível",
        "Câmera e Galeria estão disponíveis apenas no dispositivo mobile.",
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        Alert.alert("Sucesso", "Imagem selecionada!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível selecionar a imagem");
    }
  };

  const handleTakePhoto = async () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Não disponível",
        "Câmera está disponível apenas no dispositivo mobile.",
      );
      return;
    }

    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão Negada", "Permissão de câmera não concedida");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        Alert.alert("Sucesso", "Foto capturada!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível capturar a foto");
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <View style={styles.webNotice}>
          <Text style={styles.webNoticeText}>
            💡 Esta tela funciona melhor no dispositivo mobile. No navegador,
            apenas informações são mostradas.
          </Text>
        </View>
      )}

      {}
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Geolocalização</Text>
        <Text style={styles.featureDescription}>
          GPS do dispositivo para obter localização em tempo real
        </Text>
        <TouchableOpacity
          style={[styles.button, { opacity: locationLoading ? 0.6 : 1 }]}
          onPress={handleGetLocation}
          disabled={locationLoading}
        >
          {locationLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Obter Localização</Text>
          )}
        </TouchableOpacity>
        {location && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Latitude: {location.latitude.toFixed(4)}
            </Text>
            <Text style={styles.infoText}>
              Longitude: {location.longitude.toFixed(4)}
            </Text>
            {location.altitude && (
              <Text style={styles.infoText}>
                Altitude: {location.altitude.toFixed(2)}m
              </Text>
            )}
          </View>
        )}
      </View>

      {}
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Câmera & Galeria</Text>
        <Text style={styles.featureDescription}>
          Integração com câmera e galeria do dispositivo
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Tirar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePickImage}>
            <Text style={styles.buttonText}>Selecionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {}
      <View style={styles.featureCard}>
        <Text style={styles.featureTitle}>Acelerômetro</Text>
        <Text style={styles.featureDescription}>
          Sensor de movimento e detecção de gestos/shake
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Sensor disponível no dispositivo mobile
          </Text>
          <Text style={styles.infoText}>
            Detecta: movimento, aceleração, shake gesture
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    flex: 1,
  },
  webNotice: {
    backgroundColor: "#FFF3CD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  webNoticeText: {
    color: "#856404",
    fontSize: 13,
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#323131",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: "#999",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#da291c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  infoBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    marginVertical: 4,
  },
});
