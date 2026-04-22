import { useState } from "react";
import { getHeroesByFilters } from "../api/heroes";
import { HeroAlignment } from "../types/hero";
import { useQuery } from "@tanstack/react-query";
import HeroCard from "@components/HeroCard";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().optional(),
  intelligence: z.string().optional(),
  strength: z.string().optional(),
  speed: z.string().optional(),
  durability: z.string().optional(),
  power: z.string().optional(),
  combat: z.string().optional(),
  alignment: z.enum(HeroAlignment).optional(),
});

type SearchInputs = z.infer<typeof schema>;

const SearchHeroes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchInputs>({
    resolver: zodResolver(schema),
  });

  const [filters, setFilters] = useState<SearchInputs>({
    name: "",
    alignment: HeroAlignment.GOOD,
    intelligence: "",
    strength: "",
    speed: "",
    durability: "",
    power: "",
    combat: "",
  });

  const {
    data: heroes,
    isFetching,
    isError,
  } = useQuery({
    initialData: [],
    queryKey: ["getHeroes", { ...filters }],
    queryFn: () => getHeroesByFilters(filters),
    enabled:
      Boolean(filters.name) ||
      Boolean(filters.intelligence) ||
      Boolean(filters.strength) ||
      Boolean(filters.speed) ||
      Boolean(filters.durability) ||
      Boolean(filters.power) ||
      Boolean(filters.combat),
  });

  const onSubmitHandler: SubmitHandler<SearchInputs> = (data) => {
    setFilters(data);
  };

  return (
    <section>
      <h1>Search hero by criteria</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <fieldset className="space-y-2 w-120">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name:
          </label>

          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        </fieldset>
        <fieldset className="space-y-2 w-120">
          <label htmlFor="intelligence" className="block text-sm font-medium text-slate-700">
            Intelligence:
          </label>

          <input
            type="text"
            id="intelligence"
            {...register("intelligence")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <span className="text-red-500 text-sm">{errors.intelligence?.message}</span>
        </fieldset>
        <fieldset className="space-y-2 w-120">
          <label htmlFor="strength" className="block text-sm font-medium text-slate-700">
            Strength:
          </label>

          <input
            type="text"
            id="strength"
            {...register("strength")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <span className="text-red-500 text-sm">{errors.strength?.message}</span>
        </fieldset>
        <fieldset className="space-y-2 w-120">
          <label htmlFor="speed" className="block text-sm font-medium text-slate-700">
            Speed:
          </label>

          <input
            type="text"
            id="speed"
            {...register("speed")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <span className="text-red-500 text-sm">{errors.speed?.message}</span>
        </fieldset>
        <fieldset className="space-y-2 w-120">
          <label htmlFor="durability" className="block text-sm font-medium text-slate-700">
            Durability:
          </label>

          <input
            type="text"
            id="durability"
            {...register("durability")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <span className="text-red-500 text-sm">{errors.durability?.message}</span>
        </fieldset>
        <fieldset className="space-y-2 w-120">
          <label htmlFor="power" className="block text-sm font-medium text-slate-700">
            Power:
          </label>

          <input
            type="text"
            id="power"
            {...register("power")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <span className="text-red-500 text-sm">{errors.power?.message}</span>
        </fieldset>
        <fieldset className="space-y-2 w-120">
          <label htmlFor="combat" className="block text-sm font-medium text-slate-700">
            Combat:
          </label>

          <input
            type="text"
            id="combat"
            {...register("combat")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <span className="text-red-500 text-sm">{errors.combat?.message}</span>
        </fieldset>
        <select
          {...register("alignment")}
          className="w-120 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">--Choose an aligment--</option>
          <option value={HeroAlignment.GOOD}>{HeroAlignment.GOOD}</option>
          <option value={HeroAlignment.BAD}>{HeroAlignment.BAD}</option>
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 active:scale-[0.98]"
        >
          Submit
        </button>
      </form>
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
