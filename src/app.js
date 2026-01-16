import { loadCountryList, renderRecentPills } from "./backend/search.js";
import { initEventListeners } from "./backend/event-listeners.js";

loadCountryList();
renderRecentPills();

initEventListeners();