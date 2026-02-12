import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import {
  getListPokemons,
  getPokemon,
  PAGE_SIZE,
} from "../services/pokemonService";
// Importa o serviço de favoritos que criámos antes
import { getFavorites } from "../services/favoriteService";

export function usePokemonListController() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);

  // Estados de Pesquisa
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // NOVO: Estado para controlar se estamos a ver favoritos
  const [isFavoritesMode, setIsFavoritesMode] = useState(false);

  useEffect(() => {
    loadInitialPokemons();
  }, []);

  // Monitoriza a pesquisa (mantém-se igual)
  useEffect(() => {
    if (searchQuery === "") {
      setIsSearching(false);
      // Só recarrega a lista inicial se NÃO estivermos no modo favoritos
      if (!isFavoritesMode) loadInitialPokemons();
    }
  }, [searchQuery, isFavoritesMode]);

  async function loadInitialPokemons() {
    setLoading(true);
    // Garante que resetamos o modo
    setIsFavoritesMode(false);
    const data = await getListPokemons(0);
    if (data) {
      setPokemons(data);
      setOffset(PAGE_SIZE);
    }
    setLoading(false);
  }

  async function fetchNextPage() {
    // CORREÇÃO: Não carrega mais páginas se estivermos a pesquisar OU a ver favoritos
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
    setIsFavoritesMode(false); // Sai dos favoritos se pesquisar

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
  };
}
