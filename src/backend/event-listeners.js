import { searchButton, searchInput } from "../frontend.js";
import { searchByName } from "./search.js";

export function initEventListeners() {
  searchButton.addEventListener('click', () => {
    searchByName(searchInput.value);
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') 
      searchByName(searchInput.value);
  });
}