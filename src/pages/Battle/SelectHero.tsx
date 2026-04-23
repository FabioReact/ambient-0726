import IsLoading from "@components/IsLoading/IsLoading";
import HeroCard from "@components/HeroCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { getHeroesByFilters } from "../../api/heroes";
import type { Hero } from "../../types/hero";
import { schema } from "./schema";

type SearchFormValues = z.infer<typeof schema>;

type SelectHeroProps = {
  onSelectHero: (hero: Hero) => void;
  label: string;
};

const SelectHero = ({ onSelectHero, label }: SelectHeroProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(schema),
  });
  const [hero, setHero] = useState<string>("");
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const { isLoading, data: heroes } = useQuery({
    queryKey: ["getHeroes", { name: hero }],
    queryFn: () => getHeroesByFilters({ name: hero }),
    enabled: Boolean(hero),
  });

  const onSubmitHandler: SubmitHandler<SearchFormValues> = (data) => {
    setHero(data.hero);
  };

  const onClickHandler = (hero: Hero) => {
    setSelectedHero(hero);
    onSelectHero(hero);
  };

  return (
    <>
      <IsLoading loading={isLoading}>
        {heroes && !selectedHero && (
          <div className="flex gap-2 items-start">
            {heroes.map((hero) => (
              <button
                key={hero.id}
                className="bg-gray-100 p-4 rounded shadow cursor-pointer hover:bg-gray-50"
                onClick={() => onClickHandler(hero)}
              >
                <span>{hero.id}</span> - <span className="">{hero.name}</span>
              </button>
            ))}
          </div>
        )}
      </IsLoading>
      {!hero && (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-72">
          <fieldset className="relative grow w-full mb-4">
            <label htmlFor={`${label}hero`} className="leading-7 text-sm text-gray-600">
              Select {label} Hero
            </label>
            <input
              type="text"
              id={`${label}hero`}
              {...register("hero")}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-500 text-xs absolute">{errors?.hero?.message}</p>
          </fieldset>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer">
            Search
          </button>
        </form>
      )}
      {selectedHero && <HeroCard hero={selectedHero} />}
    </>
  );
};

export default SelectHero;
