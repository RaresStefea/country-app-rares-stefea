import { searchButton, searchInput } from "./frontend.js";
import { loadCountryList, searchByName } from "./backend.js";

loadCountryList();

searchButton.addEventListener('click', () => searchByName(searchInput.value));

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') 
    searchByName(searchInput.value);
});
