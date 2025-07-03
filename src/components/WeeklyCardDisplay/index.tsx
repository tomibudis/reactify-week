/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { FilterDays } from '@/constants/filter-days';

interface CharacterCardProps {
  filterByDay?: FilterDays;
  className?: string;
}

export const WeeklyCardDisplay: React.FC<CharacterCardProps> = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Monday 10 November</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Card */}
          <div className="flex flex-col w-full max-w-[400px] min-w-[280px] flex-1 border rounded-sm p-4 shadow-sm transition hover:shadow-md">
            {/* Image / Logo */}
            <div className="bg-neutral-100">
              <div className="flex justify-center items-center h-32 mb-4">
                <img src="/pure-deli-logo.png" alt="Pure Deli" className="h-16" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="my-4">
              <a href="#" className="text-sm font-semibold text-blue-600 uppercase">
                Pure Deli
              </a>
              <h3 className="text-lg font-bold mt-1">Vegan hummus wrap</h3>
              <p className="text-sm text-gray-600 mt-1">
                Hummus, dates, pesto and red bell pepper in a wrap.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Vegan
              </span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                Contains Gluten
              </span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                Contains Nuts
              </span>
            </div>

            {/* Checkmark Icon */}
            <div className="flex justify-end mt-4">
              <div className="w-6 h-6 bg-green-900 rounded-full flex items-center justify-center text-white">
                ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCardDisplay;
