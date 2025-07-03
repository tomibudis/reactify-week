'use client';

import React, { useState } from 'react';

import { FilterDays } from '@/constants/filter-days';
import { FilterDaysDropdown } from '@/components/FilterDaysDropdown';
import WeeklyCardDisplay from '@/components/WeeklyCardDisplay';

export default function Homepage() {
  const [filterBy, setFilterBy] = useState<FilterDays>(FilterDays.All);

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <FilterDaysDropdown filterBy={filterBy} onChangeFilter={setFilterBy} />
      </div>

      <WeeklyCardDisplay />
    </>
  );
}
