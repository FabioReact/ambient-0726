// 1. Récupérer les données des super-héros depuis l'API
// fetch API
// Page "blanche" (pas de résultats), puis je fetch les heroes (afficher un spinner/loader/message de chargement), et enfin afficher les résultats
// Un hook react va toujours commencer par use... useState
// Les setState sont asynchrones
// Si la valeur future de mon état dépend de ma valeur actuelle, je dois passer par une fonction callback

import { useState } from 'react';
import type { Hero } from './types/hero';
import HeroCard from '@components/HeroCard';
import Lifecycle from './pages/Lifecycle';

const getHeroes = (letter: string): Promise<Hero[]> => {
  return fetch('http://localhost:3001/heroes?name_like=^' + letter).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  });
};

function App() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [letter, setLetter] = useState('B');
  // Simuler un cas d'erreur avec un Math.random. Si on a une erreur, l'afficher, sinon afficher le résultat

  const onSelectLetter = async (letter: string) => {
    setLetter(letter);
    setLoading(true);
    setError('');
    setHeroes([]);
    try {
      const data = await getHeroes(letter);
      setHeroes(data);
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Superhero App</h1>
      <Lifecycle />
      {/* <ul className='flex justify-center gap-2'>
        <li
          onClick={() => onSelectLetter('A')}
          className='cursor-pointer'
          style={{
            color: letter === 'A' ? 'red' : 'inherit',
          }}
        >
          A
        </li>
        <li
          onClick={() => onSelectLetter('B')}
          style={{
            color: letter === 'B' ? 'red' : 'inherit',
          }}
        >
          B
        </li>
        <li
          onClick={() => {}}
          style={{
            color: letter === 'C' ? 'red' : 'inherit',
          }}
        >
          C
        </li>
        <li>...</li>
        <li>Z</li>
      </ul>
      {loading === true ? <p>Chargement en cours...</p> : null}
      {error !== '' ? <p>{error}</p> : null}
      {!error && (
        <section className='flex justify-center flex-wrap gap-4'>
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </section>
      )} */}
    </>
  );
}

export default App;
