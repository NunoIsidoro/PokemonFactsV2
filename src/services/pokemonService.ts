import { Pokemon, PokemonInfo } from "../models/Pokemon";

const PokeApiURL = "https://pokeapi.co/api/v2/pokemon?limit=100ffset=0";
const PokemonURL = "https://pokeapi.co/api/v2/pokemon/";

export async function getListPokemons(): Promise<Pokemon[]> {
  try {
    const response = await fetch(PokeApiURL);
    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        return {
          name: details.name,
          image: details.sprites.front_default,
        };
      }),
    );
    return detailedPokemons;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPokemon(name: string): Promise<PokemonInfo | null> {
  try {
    const response = await fetch(`${PokemonURL}${name}`);
    const data = await response.json();

    return {
      name: data.name,
      weight: data.weight,
      height: data.height,
      image: data.sprites.front_default,
      abilities: data.abilities.map((ability: any) => ability.ability.name),
      stats: data.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
