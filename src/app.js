import { loadCountryList, renderRecentPills } from "./backend/search.js";
import { initEventListeners } from "./backend/event-listeners.js";
import { renderFavoritePills } from "./backend/favorite.js";

loadCountryList();
renderRecentPills();
renderFavoritePills();

initEventListeners();