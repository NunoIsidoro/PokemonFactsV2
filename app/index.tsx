import { FlatList, ImageBackground, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import CardComponent from "../src/components/PokemonCard";
import { usePokemonListController } from "../src/controllers/usePokemonListController";

export default function Index() {
  const { pokemons, loading } = usePokemonListController();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Pokémon não encontrado.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <CardComponent title={item.name} image={item.image} />
        )}
        contentContainerStyle={{
          padding: 3,
          alignItems: "center",
          paddingBottom: 100,
        }}
      />
    </ImageBackground>
  );
}
