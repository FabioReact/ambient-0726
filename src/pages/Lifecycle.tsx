import { useEffect } from 'react';
import { useCounter } from '../hooks/useCounter';


// useEffect va nous servir à nous accrocher à des moments précis du cycle de vie d'un composant React
// Avec un tableau de dépendances vide, useEffect s'exécutera uniquement après le premier rendu du composant
// Si j'ai une valeur dans le tableau de dépendances, useEffect s'exécutera après le premier rendu du composant, et à chaque fois que la valeur de cette dépendance change
// Tout les fonctions dabs le corps d'un composant doivent être pure, c'est à dire qu'elles ne doivent pas avoir d'effets de bord (ex: faire une requete API, ou modifier une variable en dehors de la fonction). useEffect nous permet d'avoir des fonctions avec des effets de bord, en les exécutant à des moments précis du cycle de vie du composant

const Lifecycle = () => {
  const { counter, increment, decrement, reset } = useCounter();

  useEffect(() => {
    console.log("Va s'executer uniquement après le premier rendu du composant - []");
    return () => {
      console.log("Va s'executer uniquement avant que le composant ne disparaisse de l'UI - []");
    };
  }, []);

  useEffect(() => {
    console.log(
      `Va s'executer après le premier rendu du composant, et si la valeur de counter change - [counter = ${counter}]`,
    );
    return () => {
      console.log(
        `Va s'executer uniquement avant que le composant ne disparaisse de l'UI - [counter = ${counter}]`,
      );
    };
  }, [counter]);

  return (
    <section>
      <h1>Learn useEffect</h1>
      <p>Counter value: {counter}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </section>
  );
};

export default Lifecycle;
