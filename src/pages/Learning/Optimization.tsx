import { useState, memo, type PropsWithChildren, useCallback, useMemo } from "react";

// const cache: Record<number, number> = {};

// const cachedFibonacci = (n: number): number => {
//   if (n <= 0) return 0;
//   if (n === 1) return 1;
//   if (cache[n]) return cache[n];
//   const result = cachedFibonacci(n - 5) + cachedFibonacci(n - 3) + cachedFibonacci(n - 1);
//   cache[n] = result;
//   return result;
// };

const fibonacci = (n: number): number => {
  // si n = 1
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 5) + fibonacci(n - 3) + fibonacci(n - 1);
};

// memo va faire une comparaison superficielle des propriétés. Si elles ont les mêmes valeurs alors le composant ne sera pas re-rendu (on renvoie sa version memoisée)
// string, number, boolean -> types primitifs
// function, array, objects -> type references

const Title = memo(({ content }: { content: string }) => {
  console.log("Rendu du composant Title");
  return <h1 className="text-3xl font-bold text-center">{content}</h1>;
});

const Button = memo(({ onClick, children }: PropsWithChildren<{ onClick: () => void }>) => {
  console.log("Rendu du bouton", children);
  return (
    <button
      className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
});

const Optimization = () => {
  const [counter, setCounter] = useState(10);
  //   console.time("fibonacci");
  // const result = cachedFibonacci(nb);
  //   console.timeEnd("fibonacci");
  const result = useMemo(() => fibonacci(30), []);

  const increment = useCallback(() => {
    setCounter((c) => c + 1);
  }, []);

  return (
    <section>
      <Title content="Optimization" />
      <p>Result of fibonacci(30): {result}</p>
      <p>Result of {counter}:</p>
      <Button onClick={increment}>Increment</Button>
    </section>
  );
};

export default Optimization;
