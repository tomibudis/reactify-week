import { Character } from '@/hooks/query/use-get-all-characters.query';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'saved-characters';

export const useCharacterState = () => {
  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const onSave = (character: Character) => {
    setData((prev) => {
      if (prev.some((c) => c.id === character.id)) return prev;
      return [...prev, character];
    });
  };

  const unSave = (id: number) => {
    setData((prev) => prev.filter((c) => c.id !== id));
  };

  return { data, onSave, unSave };
};
