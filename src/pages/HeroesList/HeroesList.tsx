// 1. Récupérer les données des super-héros depuis l'API
// fetch API
// Page "blanche" (pas de résultats), puis je fetch les heroes (afficher un spinner/loader/message de chargement), et enfin afficher les résultats
// Un hook react va toujours commencer par use... useState
// Les setState sont asynchrones
// Si la valeur future de mon état dépend de ma valeur actuelle, je dois passer par une fonction callback

import { useEffect, useState } from 'react';
import HeroCard from '@components/HeroCard';
import { getAlphabet } from './utils';
import { useGetHeroes } from '../../hooks/useGetHeroes';

const alphabet = getAlphabet();

function HeroesList() {
  const initialLetter = 'A';
  const [letter, setLetter] = useState(initialLetter);
  const { heroes, loading, error, refetch } = useGetHeroes();

  useEffect(() => {
    refetch(initialLetter);
    return () => {};
  }, []);

  const onSelectLetter = (l: string) => {
    setLetter(l);
    refetch(l);
  };

  return (
    <>
      <h1>Superhero App</h1>
      <ul className='flex justify-center gap-2'>
        {alphabet.map((l) => {
          return (
            <li
              onClick={() => onSelectLetter(l)}
              className='cursor-pointer'
              style={{
                color: l === letter ? 'red' : 'inherit',
              }}
            >
              {l}
            </li>
          );
        })}
      </ul>
      {loading === true ? <p>Chargement en cours...</p> : null}
      {error !== '' ? <p>{error}</p> : null}
      {!error && (
        <section className='flex justify-center flex-wrap gap-4'>
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </section>
      )}
    </>
  );
}

export default HeroesList;
