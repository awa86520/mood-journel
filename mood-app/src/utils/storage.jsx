const STORAGE_KEY = 'mood_journal_entries';

export const saveEntry = (entries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getEntries = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};