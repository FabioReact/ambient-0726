import type { Hero } from '../types/hero';

export const getHeroes = (letter: string): Promise<Hero[]> => {
  return fetch('http://localhost:3001/heroes?name_like=^' + letter).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  });
};
