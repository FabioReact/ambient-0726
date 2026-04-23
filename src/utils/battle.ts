import type { Hero } from "../types/hero";


const getAttack = (hero: Hero) => {
  return (+hero.powerstats.combat * +hero.powerstats.power * +hero.powerstats.strength) / 100;
};

const getDefense = (hero: Hero) => {
  return (
    (+hero.powerstats.intelligence * +hero.powerstats.durability * +hero.powerstats.speed) / 10
  );
};

export const fight = (heroOne: Hero, heroTwo: Hero) => {
  const attack1 = getAttack(heroOne);
  let defense1 = getDefense(heroOne);
  const attack2 = getAttack(heroTwo);
  let defense2 = getDefense(heroTwo);
  while (defense1 > 0 && defense2 > 0) {
    defense1 -= attack2;
    defense2 -= attack1;
  }
  return defense1 > defense2 ? heroOne : heroTwo;
};