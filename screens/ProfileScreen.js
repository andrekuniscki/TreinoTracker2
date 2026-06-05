import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/Button";

export default function ProfileScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const goals = [
    { label: "Treinos por Semana", current: 4, target: 5 },
    { label: "Exercícios Concluídos", current: 25, target: 30 },
    { label: "Minutos de Treino", current: 120, target: 150 },
  ];

  async function requestLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationStatus(status);
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Permissão de localização é necessária.",
        );
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        altitude: pos.coords.altitude ?? null,
      });
    } catch (err) {
      console.warn("Erro localização:", err);
      Alert.alert("Erro", "Não foi possível obter a localização.");
    }
  }

  async function handleImageResult(result) {
    if (result.canceled) {
      return;
    }
    const uri = result.assets?.[0]?.uri ?? result.uri;
    if (uri) {
      setImageUri(uri);
    }
  }

  async function pickImageFromLibrary() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Permissão de galeria é necessária.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    await handleImageResult(result);
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Permissão de câmera é necessária.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    await handleImageResult(result);
  }

  function onAvatarPress() {
    Alert.alert("Foto de perfil", "Escolha uma opção", [
      { text: "Tirar Foto", onPress: takePhoto },
      { text: "Escolher da Galeria", onPress: pickImageFromLibrary },
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
        <Text style={styles.subtitle}>
          Veja suas informações, metas e progresso.
        </Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={onAvatarPress} style={styles.avatarWrapper}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>A</Text>
            </View>
          )}
        </TouchableOpacity>
        <Button
          title="Atualizar Localização"
          onPress={requestLocation}
          style={{ width: "100%", marginBottom: 12 }}
        />
        {location ? (
          <View style={styles.locationBox}>
            <Text style={styles.fieldLabel}>Minha Unidade / Academia</Text>
            <Text style={styles.locationText}>
              Latitude: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {location.longitude.toFixed(6)}
            </Text>
            {location.altitude != null && (
              <Text style={styles.locationText}>
                Altitude: {location.altitude.toFixed(2)}
              </Text>
            )}
          </View>
        ) : (
          <Text style={styles.hintText}>
            Toque em atualizar localização para ver suas coordenadas.
          </Text>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.fieldLabel}>Tema</Text>
          <Text style={styles.fieldValue}>Automático (Sistema)</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.fieldLabel}>Aluno</Text>
          <Text style={styles.fieldValue}>André Kuniscki</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.fieldLabel}>Versão do App</Text>
          <Text style={styles.fieldValue}>2.0.0</Text>
        </View>
      </View>

      <View style={styles.goalsSection}>
        <Text style={styles.sectionTitle}>Metas e Progresso</Text>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Text style={styles.goalLabel}>{goal.label}</Text>
            <Text style={styles.goalValue}>
              {goal.current}/{goal.target}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(goal.current / goal.target) * 100}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      <Button
        title="Ver Exercícios"
        onPress={() => navigation.navigate("ListScreen")}
        style={styles.navigationButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 100,
  },
  header: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#323131",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#323131",
    lineHeight: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    marginVertical: 16,
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
      },
      default: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
    }),
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#da291c",
  },
  avatarWrapper: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    color: "#da291c",
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  fieldLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 14,
    color: "#323131",
    fontWeight: "600",
    textAlign: "center",
  },
  goalsSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    width: "100%",
    maxWidth: 320,
    ...Platform.select({
      web: {
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
      },
      default: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#323131",
    marginBottom: 16,
    textAlign: "center",
  },
  goalItem: {
    marginBottom: 16,
  },
  goalLabel: {
    fontSize: 14,
    color: "#323131",
    marginBottom: 4,
    textAlign: "center",
  },
  goalValue: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#da291c",
  },
  locationBox: { marginTop: 12 },
  locationText: { fontSize: 14, color: "#222" },
  hintText: { color: "#666", marginTop: 8 },
  navigationButton: {
    marginTop: 20,
    width: "100%",
    maxWidth: 320,
  },
});
