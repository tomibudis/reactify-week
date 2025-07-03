'use client';

import React from 'react';
import _ from 'lodash';
import Image from 'next/image';
import type { Character } from '@/hooks/query/get-all-characters.query';

import { FilterDays } from '@/constants/filter-days';
import { useQueryGetAllCharacters } from '@/hooks/query/use-get-all-characters.query';
import { formatDate } from '@/lib/date-format';
import { useCharacterState } from '@/hooks/use-character-state';
import { Check, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

interface CharacterCardProps {
  filterBy?: FilterDays;
  className?: string;
}

export const WeeklyCardDisplay: React.FC<CharacterCardProps> = ({ filterBy, className }) => {
  const { data: allCharactersData, isLoading: isLoadingCharacters } = useQueryGetAllCharacters();
  const { onAdd, onDelete, data: savedCharData } = useCharacterState();

  const grouped = React.useMemo(() => {
    if (!allCharactersData?.results) return {};

    let filteredResults = allCharactersData.results;

    if (filterBy && filterBy !== FilterDays.All) {
      const dayIndex = [
        FilterDays.Sunday,
        FilterDays.Monday,
        FilterDays.Tuesday,
        FilterDays.Wednesday,
        FilterDays.Thursday,
        FilterDays.Friday,
        FilterDays.Saturday,
      ].indexOf(filterBy);

      if (dayIndex !== -1) {
        filteredResults = filteredResults.filter((char: Character) => {
          const charDate = new Date(char.created);
          return charDate.getDay() === dayIndex;
        });
      }
    }

    return _.groupBy(filteredResults, (char: Character) => char.created.slice(0, 10));
  }, [allCharactersData, filterBy]);

  const isSelectedCharacter = (character: Character) => {
    return savedCharData.some((charData) => charData.id === character.id);
  };
  return (
    <div className={cn('space-y-12', className)}>
      {!isLoadingCharacters && Object.keys(grouped).length === 0 && (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="text-gray-500 text-lg text-center">
            No characters found for the selected filter. <br />
            Please try to another day filter
          </span>
        </div>
      )}

      {isLoadingCharacters && <Spinner />}

      {!isLoadingCharacters && (
        <>
          {Object.entries(grouped).map(([date, characters]) => (
            <div className="space-y-6" key={date}>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{formatDate(date)}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {(characters as Character[]).map((char) => (
                  <div
                    key={char.id}
                    className={cn(
                      'flex flex-col w-full max-w-[400px] min-w-[280px] flex-1 border-2  rounded-xs p-4 shadow-sm transition hover:shadow-md bg-white',
                      {
                        'border-green-900': isSelectedCharacter(char),
                      },
                    )}
                  >
                    <div className="bg-neutral-100 rounded-sm">
                      <div className="flex justify-center items-center h-32 mb-4">
                        <Image
                          src={char.image}
                          alt={char.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-full object-cover"
                        />
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
                    <div className="flex justify-end mt-4 gap-3">
                      {isSelectedCharacter(char) && (
                        <div
                          onClick={() => onDelete?.(char.id)}
                          className="cursor-pointer w-6 h-6 bg-red-400 hover:bg-red-800 rounded-full flex items-center justify-center text-white"
                        >
                          <Trash2 size={16} />
                        </div>
                      )}
                      <div
                        onClick={() => onAdd(char)}
                        className={cn(
                          'cursor-pointer w-6 h-6 bg-neutral-400 hover:bg-green-800 rounded-full flex items-center justify-center text-white',
                          {
                            'bg-green-900': isSelectedCharacter(char),
                          },
                        )}
                      >
                        {isSelectedCharacter(char) ? <Check size={16} /> : <Plus size={16} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WeeklyCardDisplay;
