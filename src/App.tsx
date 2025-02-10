import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { JokeBox } from './components/JokeBox';
import { JokeHistory } from './components/JokeHistory';
import { useJokes } from './hooks/useJokes';
import { useDarkMode } from './hooks/useDarkMode';
import { JokeCategory, JokeLanguage, LANGUAGE_NAMES } from './types';

const CATEGORIES: JokeCategory[] = ['Any', 'Programming', 'Dark', 'Pun', 'Spooky', 'Christmas'];
const LANGUAGES = Object.entries(LANGUAGE_NAMES) as [JokeLanguage, string][];

function App() {
  const { currentJoke, loading, error, history, fetchJoke, setCurrentJoke } = useJokes();
  const [darkMode, setDarkMode] = useDarkMode();
  const [category, setCategory] = React.useState<JokeCategory>('Any');
  const [language, setLanguage] = React.useState<JokeLanguage>('en');

  React.useEffect(() => {
    fetchJoke(category, language);
  }, [category, language]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Random Joke Generator
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as JokeCategory)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as JokeLanguage)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
            >
              {LANGUAGES.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <button
              onClick={() => fetchJoke(category, language)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Get New Joke
            </button>
          </div>

          {error ? (
            <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>
          ) : (
            <JokeBox joke={currentJoke} loading={loading} />
          )}

          <div className="mt-8">
            <JokeHistory jokes={history} onSelect={setCurrentJoke} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;