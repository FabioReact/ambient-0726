import { useState } from "react";

// Pourquoi créer un custom hook?
// - soit parce que je vais re-utiliser la logique de ce hook dans plusieurs composant
// - centraliser la logique propre à une fonctionnalité à un seul endroit

const useCounter = () => {
  const initialValue = 1;
  const [counter, setCounter] = useState(initialValue);

  const increment = () => setCounter((c) => c + 1);
  const decrement = () => setCounter((c) => c - 1);
  const reset = () => setCounter(initialValue);

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};

export { useCounter };
