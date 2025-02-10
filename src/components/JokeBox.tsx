import React from 'react';
import { Copy, Share2 } from 'lucide-react';
import { Joke } from '../types';
import { LANGUAGE_NAMES } from '../types';

interface JokeBoxProps {
  joke: Joke | null;
  loading: boolean;
}

export function JokeBox({ joke, loading }: JokeBoxProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    if (!joke) return;
    
    const text = joke.type === 'single' 
      ? joke.joke! 
      : `${joke.setup}\n${joke.delivery}`;
      
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="joke-box min-h-[200px] bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!joke) {
    return (
      <div className="joke-box min-h-[200px] bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Click "Get New Joke" to start!</p>
      </div>
    );
  }

  return (
    <div className="joke-box bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={copyToClipboard}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
          title="Copy to clipboard"
        >
          {copied ? <Share2 size={20} /> : <Copy size={20} />}
          {copied && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
              Copied!
            </div>
          )}
        </button>
      </div>
      
      <div className="mt-4">
        {joke.type === 'single' ? (
          <p className="text-lg">{joke.joke}</p>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-medium">{joke.setup}</p>
            <p className="text-lg italic">{joke.delivery}</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>Category: {joke.category}</span>
        {joke.lang && <span>• Language: {LANGUAGE_NAMES[joke.lang as keyof typeof LANGUAGE_NAMES]}</span>}
      </div>
    </div>
  );
}