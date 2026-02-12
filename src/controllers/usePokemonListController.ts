import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { getListPokemons } from "../services/pokemonService";

export function usePokemonListController() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemons();
  }, []);

  async function loadPokemons() {
    try {
      setLoading(true);
      const data = await getListPokemons();
      if (data) setPokemons(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    pokemons,
    loading,
  };
}
