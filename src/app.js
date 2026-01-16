import { searchButton, searchInput } from "./frontend.js";
import { loadCountryList, searchByName, renderRecentPills } from "./backend.js";

loadCountryList();
renderRecentPills();

searchButton.addEventListener('click', () => searchByName(searchInput.value));

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') 
    searchByName(searchInput.value);
});
