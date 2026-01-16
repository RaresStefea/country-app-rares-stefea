import { apiList, searchResultDiv, infoDiv, flagDiv, recentDivWrapper, searchButton, searchInput } from "../frontend.js";

export const listEndpoint = "https://restcountries.com/v3.1/independent";

const storageKey = "recentCountries";
const maxStorage = 5;

// split recents into different module same with favorite and with the OG search
function getRecentCountries() {
  try {
    const obj = localStorage.getItem(storageKey);
    const array = JSON.parse(obj);
    return Array.isArray(array) ? array : [];
  } catch {
    return [];
  }
}

function saveRecentCountry(name) {
  if (!name)
     return;
  
  const trimmed = name.trim();
  
  if (!trimmed) 
    return;

  let list = getRecentCountries();

  list = list.filter(c => c.toLowerCase() !== trimmed.toLowerCase());

  list.unshift(trimmed);

  if (list.length > maxStorage)
     list = list.slice(0, maxStorage);

  localStorage.setItem(storageKey, JSON.stringify(list));
}

export function renderRecentPills() {
  recentDivWrapper.innerHTML = "";

  const recent = getRecentCountries();

  recent.forEach(name => {
    const pill = document.createElement('button');
    pill.textContent = name;
    pill.style.cssText ="margin:4px; padding:6px 12px; border-radius:30px; border:1px solid grey; background: white; box-shadow:0 4px 12px rgba(0,0,0,.1);"
    recentDivWrapper.appendChild(pill);
  });
}

export function loadCountryList() {
  fetch(listEndpoint)
    .then(r => r.json())
    .then(data => {
      data.forEach(country => {
        const li = document.createElement("li");
        li.style.cssText = "margin:0 0 12px 0; text-align:center; color:#333;";
        li.textContent = `Country: ${country.name.common} | Capital: ${country.capital[0]} | Region: ${country.region}`;
        apiList.appendChild(li);
      });
    });
}

export function searchByName(query) {
  const q = (query || "").trim();

  if (!q) {
    searchResultDiv.style.display = "none";
    infoDiv.innerHTML = "";
    flagDiv.innerHTML = "";
    return;
  }
  // check 3 chars full list returns *ita*
  if (q.length < 3) {
    searchResultDiv.style.display = "flex";
    infoDiv.innerHTML = "Please enter at least 3 characters.";
    flagDiv.innerHTML = "";
    return;
  }

  searchResultDiv.style.display = "flex";
  infoDiv.innerHTML = "Loading...";
  flagDiv.innerHTML = "";

  const endpoint = `https://restcountries.com/v3.1/name/${encodeURIComponent(q)}?fields=flags,name,capital,population,languages,currencies,maps`;

  fetch(endpoint)
    .then(response => {
        if (!response.ok) {
            searchResultDiv.style.display = "flex";
            infoDiv.innerHTML = "Country not found.";
            flagDiv.innerHTML = "";
            return Promise.reject("Not found");
        }
        return response.json();
    })
    .then(data => {
        const country = data[0];

        searchResultDiv.style.display = "flex";
        infoDiv.innerHTML = "";
        flagDiv.innerHTML = "";
        //clone node instead of create element each time
        const title = document.createElement('h2');
        title.textContent = country.name.common;
        title.style.cssText = "margin:0; font-size:28px;";
        infoDiv.appendChild(title);

        const capital = document.createElement('p');
        capital.textContent = `Capital: ${Object.values(country.capital).join(", ")}`;
        infoDiv.appendChild(capital);

        const population = document.createElement('p');
        population.textContent = `Population: ${new Intl.NumberFormat().format(country.population)}`;
        infoDiv.appendChild(population);
        
        const languages = document.createElement('p');
        languages.textContent = `Languages: ${Object.values(country.languages).join(", ")}`;
        infoDiv.appendChild(languages);

        const currencies = document.createElement('p');
        currencies.textContent = `Currencies: ${Object.values(country.currencies).map(c => c.name ).join(", ")}`;
        infoDiv.appendChild(currencies);

        const maps = document.createElement('p');
        const link = document.createElement('a');
        link.href = country.maps.googleMaps;
        link.textContent = "Maps";
        maps.appendChild(link);
        infoDiv.appendChild(maps);

        const img = document.createElement('img');
        img.src = country.flags.svg;
        img.style.cssText = "max-width:100%; object-fit:contain; border-radius:8px;";
        flagDiv.appendChild(img);

    
        saveRecentCountry(country.name.common);
        renderRecentPills();

    })
    .catch(() => {});
}

searchButton.addEventListener('click', () => searchByName(searchInput.value));

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') 
    searchByName(searchInput.value);
});
