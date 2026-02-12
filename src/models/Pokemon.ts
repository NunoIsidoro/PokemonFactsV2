export interface Pokemon {
  name: string;
  image: string;
}

export interface PokemonInfo {
  name: string;
  image: string;
  abilities?: string[];
  weight: number;
  height: number;
  stats: PokemonStats[];
}

export interface PokemonStats {
  name: string;
  value: number;
}
