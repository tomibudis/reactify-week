/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import _ from 'lodash';
import type { Character } from '@/hooks/query/get-all-characters.query';

import { FilterDays } from '@/constants/filter-days';
import { useQueryGetAllCharacters } from '@/hooks/query/get-all-characters.query';

interface CharacterCardProps {
  filterByDay?: FilterDays;
  className?: string;
}

export const WeeklyCardDisplay: React.FC<CharacterCardProps> = () => {
  const { data: allCharactersData } = useQueryGetAllCharacters();

  const grouped = React.useMemo(() => {
    if (!allCharactersData?.results) return {};
    return _.groupBy(allCharactersData.results, (char: Character) => char.created.slice(0, 10));
  }, [allCharactersData]);

  return (
    <div className="space-y-12">
      {Object.entries(grouped).map(([date, characters]) => (
        <div className="space-y-6" key={date}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{date}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {(characters as Character[]).map((char) => (
              <div
                key={char.id}
                className="flex flex-col w-full max-w-[400px] min-w-[280px] flex-1 border rounded-sm p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="bg-neutral-100">
                  <div className="flex justify-center items-center h-32 mb-4">
                    <img src={char.image} alt={char.name} className="h-16" />
                  </div>
                </div>
                <div className="my-4">
                  <a
                    href={char.url}
                    className="text-sm font-semibold text-blue-600 uppercase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {char.name}
                  </a>
                  <h3 className="text-lg font-bold mt-1">{char.species}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {char.status} - {char.gender} - {char.origin.name}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {char.species}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {char.status}
                  </span>
                </div>
                <div className="flex justify-end mt-4">
                  <div className="w-6 h-6 bg-green-900 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyCardDisplay;
