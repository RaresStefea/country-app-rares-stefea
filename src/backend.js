import { apiList, searchResultDiv, infoDiv, flagDiv } from "./frontend.js";

export const listEndpoint = "https://restcountries.com/v3.1/independent";

export function loadCountryList() {
  fetch(listEndpoint)
    .then(r => r.json())
    .then(data => {
      data.forEach(country => {
        const li = document.createElement("li");
        li.style.cssText = "margin:0 0 12px 0; text-align:center; color:#333;";
        li.textContent = `Country: ${country.name.common} | Capital: ${country.capital?.[0] ?? "N/A"} | Region: ${country.region}`;
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

  searchResultDiv.style.display = "flex";
  infoDiv.innerHTML = "Loading...";
  flagDiv.innerHTML = "";

  const endpoint = `https://restcountries.com/v3.1/name/${encodeURIComponent(q)}?fullText=true&fields=name,capital,region,flags`;

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

      const title = document.createElement('h2');
      title.textContent = country.name.common;
      title.style.cssText = "margin:0; font-size:28px;";

      const p = document.createElement('p');
      p.textContent = `Capital: ${country.capital?.[0] ?? "N/A"} | Region: ${country.region}`;

      infoDiv.appendChild(title);
      infoDiv.appendChild(p);

      const img = document.createElement('img');
      img.src = country.flags.svg;
      img.style.cssText = "max-width:100%; object-fit:contain; border-radius:8px;";
      flagDiv.appendChild(img);
    })
    .catch(() => {});
}
