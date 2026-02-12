import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_KEY = "@my_pokedex_favorites";

export async function getFavorites(): Promise<string[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao ler favoritos", e);
    return [];
  }
}

export async function toggleFavorite(pokemonName: string): Promise<boolean> {
  try {
    const currentFavorites = await getFavorites();

    const index = currentFavorites.indexOf(pokemonName);

    let newFavorites;
    let isNowFavorite;

    if (index >= 0) {
      newFavorites = currentFavorites.filter((name) => name !== pokemonName);
      isNowFavorite = false;
    } else {
      newFavorites = [...currentFavorites, pokemonName];
      isNowFavorite = true;
    }

    await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorites));

    return isNowFavorite;
  } catch (e) {
    console.error("Erro ao alterar favorito", e);
    return false;
  }
}

export async function isPokemonFavorite(pokemonName: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(pokemonName);
}
