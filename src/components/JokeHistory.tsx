import React from 'react';
import { History } from 'lucide-react';
import { Joke } from '../types';

interface JokeHistoryProps {
  jokes: Joke[];
  onSelect: (joke: Joke) => void;
}

export function JokeHistory({ jokes, onSelect }: JokeHistoryProps) {
  if (jokes.length === 0) {
    return null;
  }

  return (
    <div className="history-box bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <History size={20} />
        <h2 className="text-lg font-semibold">Recent Jokes</h2>
      </div>
      <div className="space-y-4">
        {jokes.map((joke, index) => (
          <button
            key={`${joke.id}-${index}`}
            onClick={() => onSelect(joke)}
            className="w-full text-left p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <p className="text-sm truncate">
              {joke.type === 'single' ? joke.joke : joke.setup}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}