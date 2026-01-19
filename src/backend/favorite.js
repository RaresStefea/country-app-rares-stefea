import { clone, templateButton, favoriteDivWrapper } from "../frontend.js";
import { searchByName } from "./search.js";

const storageKey = "favoriteCountries";
const maxStorage = 5;


export function getFavoriteCountries() {
  try {
    const obj = localStorage.getItem(storageKey);
    if (!obj)
       return [];

    const array = JSON.parse(obj);
    return Array.isArray(array) ? array : [];
  } catch (err) {
    console.error("Error reading favorites:", err);
    return [];
  }
}

export function saveFavoriteCountry(name) {
  try {
    if (!name) 
      return;

    const trimmed = name.trim();

    if (!trimmed) 
      return;

    let favorites = getFavoriteCountries();

    favorites = favorites.filter(
      c => c.toLowerCase() !== trimmed.toLowerCase()
    );

    favorites.unshift(trimmed);

    if (favorites.length > maxStorage) {
      favorites = favorites.slice(0, maxStorage);
    }

    localStorage.setItem(storageKey, JSON.stringify(favorites));
  } catch (err) {
    console.error("Error saving favorite:", err);
  }
}

export function removeFavoriteCountry(name) {
  try {
    if (!name) 
      return;

    const trimmed = name.trim();

    if (!trimmed)
       return;

    let favorites = getFavoriteCountries();

    favorites = favorites.filter(
      c => c.toLowerCase() !== trimmed.toLowerCase()
    );

    localStorage.setItem(storageKey, JSON.stringify(favorites));
  } catch (err) {
    console.error("Error removing favorite:", err);
  }
}

export function renderFavoritePills() {
  try {

    favoriteDivWrapper.innerHTML = "";

    const favorites = getFavoriteCountries();

    favorites.forEach(name => {
      try {
        const pill = clone(
          templateButton,
          {
            text: name,
            cssText: `margin:4px;padding:6px 12px;border-radius:30px;border:1px solid #fbe701;background:white;color:#fbe701;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.1); transition:0.2s;`
          },false);

        pill.onclick = () => {
          try {
            searchByName(name);
          } catch (err) {
            console.error("Error searching from favorite pill:", err);
          }
        };

        favoriteDivWrapper.appendChild(pill);
      } catch (err) {
        console.error("Error rendering a favorite pill:", err);
      }
    });
  } catch (err) {
    console.error("Error rendering favorite pills:", err);
  }
}
