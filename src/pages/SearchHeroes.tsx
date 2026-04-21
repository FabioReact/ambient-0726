import { useRef, useState } from "react";
import { getHeroesByFilters } from "../api/heroes";
import { HeroAlignment } from "../types/hero";
import { useQuery } from "@tanstack/react-query";
import HeroCard from "@components/HeroCard";

const SearchHeroes = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const intelligenceRef = useRef<HTMLInputElement>(null);
  const strengthRef = useRef<HTMLInputElement>(null);
  const speedRef = useRef<HTMLInputElement>(null);
  const durabilityRef = useRef<HTMLInputElement>(null);
  const powerRef = useRef<HTMLInputElement>(null);
  const combatRef = useRef<HTMLInputElement>(null);
  const [aligment, setAlignement] = useState<HeroAlignment>(HeroAlignment.GOOD);

  const [filters, setFilters] = useState({
    name: "",
    alignment: HeroAlignment.GOOD,
    intelligence: "1",
    strength: "1",
    speed: "1",
    durability: "1",
    power: "1",
    combat: "1",
  });

  const {
    data: heroes,
    isFetching,
    isError,
  } = useQuery({
    initialData: [],
    queryKey: ["getHeroes", { ...filters }],
    queryFn: () => getHeroesByFilters(filters),
  });

  const onSelectAlignment = (selectedAlignment: HeroAlignment) => {
    setAlignement(selectedAlignment);
  };

  const onSubmitHandler = () => {
    setFilters({
      name: nameRef.current?.value || "",
      alignment: aligment,
      intelligence: intelligenceRef.current?.value || "1",
      strength: strengthRef.current?.value || "1",
      speed: speedRef.current?.value || "1",
      durability: durabilityRef.current?.value || "1",
      power: powerRef.current?.value || "1",
      combat: combatRef.current?.value || "1",
    });
  };

  return (
    <section>
      <h1>Search hero by criteria</h1>
      <fieldset className="space-y-2 w-120">
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name:
        </label>

        <input
          ref={nameRef}
          type="text"
          id="name"
          name="name"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </fieldset>
      <fieldset className="space-y-2 w-120">
        <label htmlFor="intelligence" className="block text-sm font-medium text-slate-700">
          Intelligence:
        </label>

        <input
          ref={intelligenceRef}
          type="text"
          id="intelligence"
          name="intelligence"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </fieldset>
      <select
        name="alignment"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          onSelectAlignment(event.target.value as HeroAlignment);
        }}
        className="w-120 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="">--Choose an aligment--</option>
        <option value={HeroAlignment.GOOD}>{HeroAlignment.GOOD}</option>
        <option value={HeroAlignment.BAD}>{HeroAlignment.BAD}</option>
      </select>
      <button
        onClick={onSubmitHandler}
        className="inline-flex items-center justify-center cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 active:scale-[0.98]"
      >
        Submit
      </button>
      {isFetching && <p>Chargement...</p>}
      {isError && <p>Une erreur est survenue...</p>}
      <div className={isFetching ? "opacity-50" : ""}>
        <h2>Results</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchHeroes;
