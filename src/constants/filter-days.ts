/* eslint-disable no-unused-vars */
export enum FilterDays {
  All = 'all',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export const OPTIONS: { label: string; value: FilterDays }[] = [
  { label: 'All', value: FilterDays.All },
  { label: 'Monday', value: FilterDays.Monday },
  { label: 'Tuesday', value: FilterDays.Tuesday },
  { label: 'Wednesday', value: FilterDays.Wednesday },
  { label: 'Thursday', value: FilterDays.Thursday },
  { label: 'Friday', value: FilterDays.Friday },
  { label: 'Saturday', value: FilterDays.Saturday },
  { label: 'Sunday', value: FilterDays.Sunday },
];
