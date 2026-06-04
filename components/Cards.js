import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export function ExerciseCard({ id, name, muscle, difficulty, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardContent}>
        <View style={styles.gifContainer}>
          <Image source={image} style={styles.exerciseGif} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.exerciseName}>{name}</Text>
          <Text style={styles.muscleGroup}>
            {muscle} • {difficulty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
    ...Platform.select({
      web: { boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.05)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
    }),
  },
  cardContent: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  gifContainer: {
    width: 72,
    height: 72,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 14,
    backgroundColor: "#f5f5f5",
  },
  exerciseGif: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: { flex: 1 },
  exerciseName: {
    color: "#323131",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  muscleGroup: { color: "#666", fontSize: 13 },
});
