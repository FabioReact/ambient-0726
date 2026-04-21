import type { Hero, HeroAlignment } from "../types/hero";

export const getHeroes = (letter: string): Promise<Hero[]> => {
  return fetch("http://localhost:3001/heroes?name_like=^" + letter).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  });
};

export const getHeroesByAlignment = (alignment: HeroAlignment): Promise<Hero[]> => {
  return fetch("http://localhost:3001/heroes?biography.alignment_like=^" + alignment).then(
    (response) => {
      if (response.status !== 200) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response.json();
    },
  );
};

type HeroesSearchFilters = {
  name?: string;
  alignment?: HeroAlignment;
  intelligence?: string;
  strength?: string;
  speed?: string;
  durability?: string;
  power?: string;
  combat?: string;
};

export const getHeroesByFilters = (filters: HeroesSearchFilters): Promise<Hero[]> => {
  const params = new URLSearchParams();
  params.append("name_like", filters.name || "");
  params.append("biography.alignment_like", filters.alignment || "");
  params.append("powerstats.intelligence_gte", filters.intelligence || "1");
  params.append("powerstats.speed_gte", filters.speed || "1");
  params.append("powerstats.strength_gte", filters.strength || "1");
  params.append("powerstats.durability_gte", filters.durability || "1");
  params.append("powerstats.power_gte", filters.power || "1");
  params.append("powerstats.combat_gte", filters.combat || "1");
  return fetch(`http://localhost:3001/heroes?${params.toString()}`).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  });
};
