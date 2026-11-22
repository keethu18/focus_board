import { useState, useEffect } from "react"; // hooks: state + side effects

export default function useLocalStorage(key, initialValue) {
  // useState with a FUNCTION = "lazy initialiser": runs only on the first render
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);          // read raw string (or null)
      // If something was saved, parse it. Otherwise use sample data.
      // An empty saved array "[]" is still "saved", so sample data never overwrites it.
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;                              // corrupted JSON or storage blocked: fall back safely
    }
  });

  // Runs after every render in which `value` (or key) changed
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value)); // objects must be turned into a string
    } catch {
      /* storage full or unavailable: ignore so the app doesn't crash */
    }
  }, [key, value]);                                     // dependency array: only re-run on change

  return [value, setValue];                             // same API as useState
}