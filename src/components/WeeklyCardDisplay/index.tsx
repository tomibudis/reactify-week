'use client';

import React from 'react';
import _ from 'lodash';
import type { Character } from '@/hooks/query/use-get-all-characters.query';

import { FilterDays } from '@/constants/filter-days';
import { useQueryGetAllCharacters } from '@/hooks/query/use-get-all-characters.query';
import { formatDate } from '@/lib/date-format';
import { useCharacterState } from '@/hooks/use-character-state';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import { recommendCharacters } from '@/lib/ai';
import { CardList } from '@/components/WeeklyCardDisplay/CardList';

interface CharacterCardProps {
  filterBy?: FilterDays;
  className?: string;
}

export const WeeklyCardDisplay: React.FC<CharacterCardProps> = ({ filterBy, className }) => {
  const { data: allCharactersData, isLoading: isLoadingCharacters } = useQueryGetAllCharacters();
  const { data: savedCharData, onSave, unSave } = useCharacterState();

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

  const recommendedCharacters = allCharactersData
    ? recommendCharacters(savedCharData, allCharactersData.results || [])
    : [];

  return (
    <div className={cn('space-y-12', className)}>
      {!!recommendedCharacters?.length && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              AI-Powered Character Recommendations
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <CardList
            data={recommendedCharacters}
            savedCharacter={savedCharData}
            onSave={onSave}
            unSave={unSave}
          />
        </>
      )}

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
              <CardList
                data={characters as Character[]}
                savedCharacter={savedCharData}
                onSave={onSave}
                unSave={unSave}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WeeklyCardDisplay;
