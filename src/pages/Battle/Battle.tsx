import { useState } from "react";
import SelectHero from "./SelectHero";
import { fight } from "../../utils/battle";
import type { Hero } from "../../types/hero";

const Battle = () => {
  const [firstHero, setFirstHero] = useState<Hero | null>(null);
  const [secondHero, setSecondHero] = useState<Hero | null>(null);
  const [winner, setWinner] = useState<Hero | null>(null);

  const onBattleHandler = () => {
    if (firstHero && secondHero) {
      const result = fight(firstHero, secondHero);
      setWinner(result);
    }
  };

  return (
    <section className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-center">Battle Page</h1>
      {winner && <p>Winner is {winner.name}</p>}
      <div className="flex justify-center gap-4">
        <SelectHero
          label="first"
          onSelectHero={(hero) => {
            setFirstHero(hero);
          }}
        />
        {firstHero && secondHero && (
          <button
            onClick={onBattleHandler}
            className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
          >
            Battle
          </button>
        )}
        <SelectHero
          label="second"
          onSelectHero={(hero) => {
            setSecondHero(hero);
          }}
        />
      </div>
    </section>
  );
};

export default Battle;
