import { Character } from '@/hooks/query/use-get-all-characters.query';

export function generateTags(char: Character): string[] {
  const tags: string[] = [];

  // Status tags
  if (char.status === 'Dead') tags.push('Dead');
  if (char.status === 'Alive') tags.push('Alive');
  if (char.status === 'unknown') tags.push('Status Unknown');

  // Species tags
  if (char.species === 'Human') tags.push('Human');
  else if (char.species) tags.push(char.species);

  // Gender tags
  if (char.gender === 'Male') tags.push('Male');
  else if (char.gender === 'Female') tags.push('Female');
  else if (char.gender && char.gender !== 'unknown') tags.push(char.gender);

  // Origin tags
  if (char.origin?.name) {
    if (char.origin.name.includes('Earth')) tags.push('From Earth');
    else if (char.origin.name !== 'unknown') tags.push(`From ${char.origin.name}`);
  }

  // Main cast or recurring
  if (/Rick/i.test(char.name)) tags.push('Rick');
  if (/Morty/i.test(char.name)) tags.push('Morty');
  if (/Summer/i.test(char.name)) tags.push('Summer');
  if (/Beth/i.test(char.name)) tags.push('Beth');
  if (/Jerry/i.test(char.name)) tags.push('Jerry');
  if (/Rick|Morty|Summer|Beth|Jerry/i.test(char.name)) tags.push('Main Cast');

  // Episode count tags (if available)
  if (Array.isArray(char.episode)) {
    if (char.episode.length > 20) tags.push('Frequent Character');
    else if (char.episode.length > 5) tags.push('Recurring Character');
    else if (char.episode.length > 0) tags.push('Minor Character');
  }

  // Add unique tags only
  return Array.from(new Set(tags));
}

let cachedRecommendations: Character[] | null = null;

export function recommendCharacters(saved: Character[], all: Character[]): Character[] {
  if (cachedRecommendations) return cachedRecommendations;

  const savedSpecies = new Set(saved.map((c) => c.species));
  const savedStatus = new Set(saved.map((c) => c.status));
  const savedOrigin = new Set(saved.map((c) => c.origin.name));

  const recommendations = all
    .filter(
      (c) =>
        !saved.some((s) => s.id === c.id) &&
        (savedSpecies.has(c.species) ||
          savedStatus.has(c.status) ||
          savedOrigin.has(c.origin.name)),
    )
    .slice(0, 5);

  cachedRecommendations = recommendations;
  return recommendations;
}
