import { useState } from "react";
import { getHeroes } from "../api/heroes";
import type { Hero } from "../types/hero";

// Il faut que ça commence que ça commence par use
// Si j'utilise un autre hook de la libraire react (useState, useEffect, useReducer, useMemo...)

const useGetHeroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refetch = async (letter: string) => {
    setLoading(true);
    setError("");
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

  return {
    heroes,
    loading,
    error,
    refetch,
  };
};

export { useGetHeroes };
