import { useState, useEffect } from 'react';
import { Joke, JokeCategory, JokeLanguage } from '../types';

const STORAGE_KEY = 'joke-history';
const MAX_HISTORY = 5;

export function useJokes() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Joke[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const fetchJoke = async (category: JokeCategory, lang: JokeLanguage = 'en') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${category}?safe-mode&lang=${lang}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'Failed to fetch joke');
      }
      
      const joke: Joke = {
        id: data.id,
        type: data.type,
        category: data.category,
        lang: data.lang,
        ...(data.type === 'single' 
          ? { joke: data.joke } 
          : { setup: data.setup, delivery: data.delivery })
      };
      
      setCurrentJoke(joke);
      setHistory(prev => {
        const newHistory = [joke, ...prev].slice(0, MAX_HISTORY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    } catch (err) {
      console.error('Error fetching joke:', err);
      setError('Oops! Couldn\'t load a joke. Try again!');
      setCurrentJoke(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    currentJoke,
    loading,
    error,
    history,
    fetchJoke,
    setCurrentJoke
  };
}