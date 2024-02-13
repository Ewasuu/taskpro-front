"use client";
import { useState, useEffect } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Obtén del local storage o usa un valor inicial si no hay nada en el local storage
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  // Guarda en el local storage cuando el valor cambia
  useEffect(() => {
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      const serializedValue = JSON.stringify(storedValue);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
