import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { PokemonInfo } from "../models/Pokemon";
import { isPokemonFavorite, toggleFavorite } from "../services/favoriteService"; // Importar o novo serviço
import { getPokemon } from "../services/pokemonService";

export function usePokemonProfileController() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShowingModal, setIsShowingModal] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const fetchPokemonDetails = useCallback(async () => {
    if (!name) return;

    try {
      setLoading(true);

      const [data, favoriteStatus] = await Promise.all([
        getPokemon(name),
        isPokemonFavorite(name),
      ]);

      setPokemon(data);
      setIsFavorite(favoriteStatus);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [fetchPokemonDetails]);

  const handleToggleFavorite = async () => {
    if (!pokemon) return;

    setIsFavorite(!isFavorite);

    await toggleFavorite(pokemon.name);
  };

  return {
    pokemon,
    loading,
    isShowingModal,
    setIsShowingModal,
    isFavorite,
    handleToggleFavorite,
  };
}
