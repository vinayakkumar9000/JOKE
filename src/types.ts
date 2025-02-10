export interface Joke {
  id: number;
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
  category: string;
  lang?: string;
}

export type JokeCategory = 'Any' | 'Programming' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas';

export type JokeLanguage = 'en' | 'de' | 'cs' | 'es' | 'fr' | 'pt';

export const LANGUAGE_NAMES: Record<JokeLanguage, string> = {
  en: 'English',
  de: 'German',
  cs: 'Czech',
  es: 'Spanish',
  fr: 'French',
  pt: 'Portuguese'
};