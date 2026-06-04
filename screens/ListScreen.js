import { useCallback } from "react";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";
import { ExerciseCard } from "../components/Cards.js";
import { EXERCISES } from "../data/mockExercises";

export default function ListScreen({ navigation }) {
  const handleLoadMore = useCallback(() => {
    console.log("Fim da lista alcançado, carregar mais...");
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ExerciseCard
        id={item.id}
        name={item.name}
        muscle={item.muscle}
        difficulty={item.difficulty}
        image={item.image}
        onPress={() =>
          navigation.navigate("DetailScreen", {
            id: item.id,
            name: item.name,
            muscle: item.muscle,
            difficulty: item.difficulty,
            image: item.image,
          })
        }
      />
    ),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={EXERCISES}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listPadding}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        scrollIndicatorInsets={{ right: 1 }}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listPadding: {
    padding: 12,
    paddingBottom: 20,
  },
});
