import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { getFavorites } from "../services/favoriteService";
import {
  getListPokemons,
  getPokemon,
  PAGE_SIZE,
} from "../services/pokemonService";

export function usePokemonListController() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [isFavoritesMode, setIsFavoritesMode] = useState(false);

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadInitialPokemons();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  async function loadFavorites() {
    const data = await getFavorites();
    setFavorites(data);
  }

  useEffect(() => {
    if (searchQuery === "") {
      setIsSearching(false);
      if (!isFavoritesMode) loadInitialPokemons();
    }
  }, [searchQuery, isFavoritesMode]);

  async function loadInitialPokemons() {
    setLoading(true);
    setIsFavoritesMode(false);
    const data = await getListPokemons(0);
    if (data) {
      setPokemons(data);
      setOffset(PAGE_SIZE);
    }
    setLoading(false);
  }

  async function fetchNextPage() {
    if (loadingMore || loading || isSearching || isFavoritesMode) return;

    setLoadingMore(true);
    const data = await getListPokemons(offset);

    if (data && data.length > 0) {
      setPokemons((prev) => [...prev, ...data]);
      setOffset((prev) => prev + 20);
    }
    setLoadingMore(false);
  }

  async function searchPokemon() {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setIsSearching(true);
    setIsFavoritesMode(false);

    const formattedQuery = searchQuery.toLowerCase();
    const data = await getPokemon(formattedQuery);

    if (data) {
      setPokemons([{ name: data.name, image: data.image }]);
    } else {
      setPokemons([]);
    }
    setLoading(false);
  }

  async function toggleShowFavorites() {
    setLoading(true);
    setSearchQuery(""); //

    if (isFavoritesMode) {
      await loadInitialPokemons();
    } else {
      setIsFavoritesMode(true);

      const favoriteNames = await getFavorites();

      const favoritePokemons = await Promise.all(
        favoriteNames.map(async (name) => {
          const details = await getPokemon(name);
          return details ? { name: details.name, image: details.image } : null;
        }),
      );

      setPokemons(favoritePokemons.filter((p): p is Pokemon => p !== null));
    }
    setLoading(false);
  }

  return {
    pokemons,
    loading,
    loadingMore,
    fetchNextPage,
    searchQuery,
    setSearchQuery,
    isSearching,
    setIsSearching,
    searchPokemon,
    isFavoritesMode,
    toggleShowFavorites,
    favorites,
  };
}
