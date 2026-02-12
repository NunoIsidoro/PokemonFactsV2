import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { PokemonInfo } from "../models/Pokemon";
import { getPokemon } from "../services/pokemonService";

export function usePokemonProfileController() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShowingModal, setIsShowingModal] = useState(false);

  const fetchPokemonDetails = useCallback(async () => {
    if (!name) return;

    try {
      setLoading(true);
      const data = await getPokemon(name);
      setPokemon(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [fetchPokemonDetails]);

  return {
    pokemon,
    loading,
    isShowingModal,
    setIsShowingModal,
  };
}
