import { Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  View,
} from "react-native";
import {
  Avatar,
  Chip,
  IconButton,
  MD3Colors,
  ProgressBar,
  Text,
} from "react-native-paper";
import AmplifyImage from "../../src/components/modal/AmplifyImage";
import { usePokemonProfileController } from "../../src/controllers/usePokemonProfileController";

export default function PokemonProfile() {
  const {
    pokemon,
    loading,
    isShowingModal,
    setIsShowingModal,
    isFavorite,
    handleToggleFavorite,
  } = usePokemonProfileController();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Pokémon não encontrado.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Stack.Screen
        options={{
          title: pokemon.name.toUpperCase(),
          headerRight: () => (
            <IconButton
              icon={isFavorite ? "heart" : "heart-outline"}
              iconColor={isFavorite ? MD3Colors.error50 : undefined}
              size={28}
              onPress={handleToggleFavorite}
            />
          ),
        }}
      />

      <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <Pressable onPress={() => setIsShowingModal(true)}>
          <Avatar.Image size={150} source={{ uri: pokemon.image }} />
        </Pressable>

        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            textTransform: "capitalize",
            marginVertical: 10,
          }}
        >
          {pokemon.name}
        </Text>

        <Text variant="headlineSmall">
          Peso: {pokemon.weight} Kg | Altura: {pokemon.height}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            marginTop: 10,
          }}
        >
          {pokemon.stats.map((item) => (
            <View key={item.name} style={{ width: "50%", padding: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  textTransform: "capitalize",
                  marginBottom: 4,
                }}
              >
                {item.name}: {item.value}
              </Text>
              <ProgressBar
                progress={item.value / 100}
                color={MD3Colors.primary100}
                style={{ height: 8, borderRadius: 4 }}
              />
            </View>
          ))}
        </View>

        <FlatList
          data={pokemon.abilities}
          keyExtractor={(item) => item}
          numColumns={3}
          style={{ width: "100%", marginTop: 20 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={{ flex: 1, padding: 5 }}>
              <Chip>{item}</Chip>
            </View>
          )}
        />

        <AmplifyImage
          uri={pokemon.image}
          title={pokemon.name}
          visible={isShowingModal}
          setVisible={setIsShowingModal}
        />
      </View>
    </ImageBackground>
  );
}
