import React from "react";
import { View } from "react-native";
import { Appbar, Searchbar, useTheme } from "react-native-paper";
import { SearchPokemonProps } from "../models/Pokemon";
import { ThemeToggle } from "./ThemeToggle";

export default function SearchPokemon({
  searchQuery,
  setSearchQuery,
  searchPokemon,
}: SearchPokemonProps) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: colors.surface }}>
        <Searchbar
          placeholder="Pesquisar..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={searchPokemon}
          onIconPress={searchPokemon}
          style={{
            flex: 1,
            height: 45,
            backgroundColor: colors.elevation.level2,
            marginLeft: 10,
            marginRight: 0,
          }}
          inputStyle={{ minHeight: 0 }}
        />
        <ThemeToggle />
      </Appbar.Header>
    </View>
  );
}
