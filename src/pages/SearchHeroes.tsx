import { useState } from 'react';
import { getHeroesByAlignment } from '../api/heroes';
import { HeroAlignment } from '../types/hero';
import { useQuery } from '@tanstack/react-query';
import HeroCard from '@components/HeroCard';

const SearchHeroes = () => {
  const [aligment, setAlignement] = useState<HeroAlignment>(HeroAlignment.GOOD);

  const {
    data: heroes,
    isFetching,
    isError,
  } = useQuery({
    initialData: [],
    queryKey: ['getHeroes', { aligment }],
    queryFn: () => getHeroesByAlignment(aligment),
  });

  const onSelectAlignment = (selectedAlignment: HeroAlignment) => {
    setAlignement(selectedAlignment);
  };

  return (
    <section>
      <h1>Search hero by criteria</h1>
      <select
        name='alignment'
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          onSelectAlignment(event.target.value as HeroAlignment);
        }}
      >
        <option value=''>--Choose an aligment--</option>
        <option value={HeroAlignment.GOOD}>{HeroAlignment.GOOD}</option>
        <option value={HeroAlignment.BAD}>{HeroAlignment.BAD}</option>
      </select>
      {isFetching && <p>Chargement...</p>}
      {isError && <p>Une erreur est survenue...</p>}
      <div className={isFetching ? 'opacity-50' : ''}>
        <h2>Results</h2>
        <div className='flex flex-wrap justify-center gap-4'>
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchHeroes;
