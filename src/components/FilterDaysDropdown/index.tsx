'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter, Calendar } from 'lucide-react';
import { FilterDays, OPTIONS } from '@/constants/filter-days';

interface FilterDaysProps {
  filterBy: FilterDays;
  onChangeFilter?: (selectedFilter?: FilterDays) => void;
}
export const FilterDaysDropdown: React.FC<FilterDaysProps> = ({ onChangeFilter, filterBy }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-white shadow-sm hover:shadow-md transition-shadow capitalize"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter by {filterBy ? filterBy : 'Day'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select day</DropdownMenuLabel>

          {OPTIONS?.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                onChangeFilter?.(option.value);
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
