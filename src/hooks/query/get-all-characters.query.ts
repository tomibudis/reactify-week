import { useQuery } from '@tanstack/react-query';

// Types for Rick and Morty API
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface GetAllCharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export const useQueryGetAllCharacters = () => {
  const resultQuery = useQuery<GetAllCharactersResponse>({
    queryKey: ['get-all-characters'],
    queryFn: async () => {
      const res = await fetch('https://rickandmortyapi.com/api/character');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
  });

  return resultQuery;
};
