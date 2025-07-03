import { Character } from '@/hooks/query/use-get-all-characters.query';
import { generateTags } from '@/lib/ai';
import { cn } from '@/lib/utils';
import { Check, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CardListProps {
  data: Character[];
  savedCharacter: Character[];
  onSave: (_selectedChar: Character) => void;
  unSave: (_id: number) => void;
}
export const CardList: React.FC<CardListProps> = ({ data, savedCharacter, onSave, unSave }) => {
  const isSelectedCharacter = (character: Character) => {
    return savedCharacter.some((charData) => charData.id === character.id);
  };
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {data?.map((d, idx) => (
        <div
          key={idx}
          className={cn(
            'flex flex-col w-full max-w-[400px] min-w-[280px] flex-1 border-2  rounded-xs p-4 shadow-sm transition hover:shadow-md bg-white',
            {
              'border-green-900': isSelectedCharacter(d),
            },
          )}
        >
          <div className="bg-neutral-100 rounded-sm">
            <div className="flex justify-center items-center h-32 mb-4">
              <Image
                src={d.image}
                alt={d.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="my-4">
            <a
              href={d.url}
              className="text-sm font-semibold text-blue-600 uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              {d.name}
            </a>
            <h3 className="text-lg font-bold mt-1">{d.species}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {d.status} - {d.gender} - {d.origin.name}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            {generateTags(d).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-neutral-300 text-neutral-900 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-end mt-4 gap-3">
            {isSelectedCharacter(d) && (
              <div
                onClick={() => unSave?.(d.id)}
                className="cursor-pointer w-6 h-6 bg-red-400 hover:bg-red-800 rounded-full flex items-center justify-center text-white"
              >
                <Trash2 size={16} />
              </div>
            )}
            <div
              onClick={() => onSave(d)}
              className={cn(
                'cursor-pointer w-6 h-6 bg-neutral-400 hover:bg-green-800 rounded-full flex items-center justify-center text-white',
                {
                  'bg-green-900': isSelectedCharacter(d),
                },
              )}
            >
              {isSelectedCharacter(d) ? <Check size={16} /> : <Plus size={16} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
