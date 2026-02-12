import SearchPokemon from "@/src/components/SearchPokemon";
import { Stack } from "expo-router";
import React, { useCallback } from "react";
import {
  FlatList,
  ImageBackground,
  Keyboard,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, FAB, Text, useTheme } from "react-native-paper";
import CardComponent from "../src/components/PokemonCard";
import { usePokemonListController } from "../src/controllers/usePokemonListController";

export default function Index() {
  const {
    pokemons,
    loading,
    fetchNextPage,
    loadingMore,
    searchQuery,
    setSearchQuery,
    searchPokemon,
    isFavoritesMode,
    toggleShowFavorites,
  } = usePokemonListController();

  const theme = useTheme();

  const renderPokemonItem = useCallback(
    ({ item }: { item: any }) => (
      <CardComponent title={item.name} image={item.image} />
    ),
    [],
  );

  if (loading && pokemons.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Stack.Screen
        options={{
          header: () => (
            <SearchPokemon
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchPokemon={searchPokemon}
            />
          ),
        }}
      />

      <View style={{ flex: 1, marginTop: 90 }}>
        {(!pokemons || pokemons.length === 0) && !loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text variant="titleMedium">
              {isFavoritesMode
                ? "Ainda não tens favoritos."
                : "Pokémon não encontrado."}
            </Text>
          </View>
        ) : (
          <FlatList
            data={pokemons}
            keyExtractor={(item) => item.name}
            numColumns={2}
            windowSize={5}
            renderItem={(renderPokemonItem) => (
              <CardComponent
                title={renderPokemonItem.item.name}
                image={renderPokemonItem.item.image}
              />
            )}
            contentContainerStyle={{
              padding: 3,
              alignItems: "center",
              paddingBottom: 80,
            }}
            onEndReached={
              searchQuery.length === 0 && !isFavoritesMode
                ? fetchNextPage
                : null
            }
            onEndReachedThreshold={0.5}
            onScrollBeginDrag={Keyboard.dismiss}
            ListFooterComponent={
              loadingMore ? (
                <View style={{ padding: 20 }}>
                  <ActivityIndicator size="small" />
                </View>
              ) : null
            }
          />
        )}

        <FAB
          icon={isFavoritesMode ? "account-group" : "heart"}
          label={isFavoritesMode ? "Ver Todos" : "Favoritos"}
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          color={theme.colors.onPrimary}
          onPress={toggleShowFavorites}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
