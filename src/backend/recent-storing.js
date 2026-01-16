const storageKey = "recentCountries";
const maxStorage = 5;

export function getRecentCountries() {
  try {
    const obj = localStorage.getItem(storageKey);
    const array = JSON.parse(obj);
    return Array.isArray(array) ? array : [];
  } catch {
    return [];
  }
}

export function saveRecentCountry(name) {
  if (!name) return;
  const trimmed = name.trim();
  if (!trimmed) return;

  let list = getRecentCountries();
  list = list.filter(c => c.toLowerCase() !== trimmed.toLowerCase());
  list.unshift(trimmed);

  if (list.length > maxStorage)
     list = list.slice(0, maxStorage);

  localStorage.setItem(storageKey, JSON.stringify(list));
}