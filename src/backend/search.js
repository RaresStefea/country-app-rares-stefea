import { apiList, searchResultDiv, infoDiv, flagDiv, recentDivWrapper, clone, templateP, templateTitle2, templateImage, templateLi, templateButton, favoriteDiv } from "../frontend.js";
import { getRecentCountries, saveRecentCountry } from "./recent-storing.js";
import { getFavoriteCountries, saveFavoriteCountry, removeFavoriteCountry, renderFavoritePills } from "./favorite.js";

export const listEndpoint = "https://restcountries.com/v3.1/independent";

export function renderRecentPills() {
  try {
    recentDivWrapper.innerHTML = "";
    const recent = getRecentCountries() ?? [];

    recent.forEach(name => {
      const pill = clone(
        templateButton,
        {
          text: `${name}`,
          cssText: "margin:4px; padding:6px 12px; border-radius:30px; border:1px solid grey; background:white; box-shadow:0 4px 12px rgba(0,0,0,.1); cursor:pointer;"
        },false);
      recentDivWrapper.appendChild(pill);
    });
  } catch (err) {
    console.error("Error rendering recent pills:", err);
  }
}

export function loadCountryList() {
  fetch(listEndpoint)
    .then(r => {
      if (!r.ok) throw new Error("Failed to load country list");
      return r.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error("Invalid API response");

      data.forEach(country => {
        const li = clone(
          templateLi,
          {
            text: `Country: ${country.name?.common ?? "Unknown"} | Capital: ${country.capital?.[0] ?? "N/A"} | Region: ${country.region ?? "N/A"}`,
            cssText: "margin:0 0 12px 0; text-align:center; color:#333;"
          },
          false
        );
        apiList.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error loading country list:", err);
      apiList.innerHTML = "Failed to load country list.";
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
        infoDiv.innerHTML = "Country not found.";
        flagDiv.innerHTML = "";
        return Promise.reject(new Error("Country not found"));
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data) || !data[0]) {
        throw new Error("Invalid API response");
      }

      const country = data[0];

      searchResultDiv.style.display = "flex";
      infoDiv.innerHTML = "";
      flagDiv.innerHTML = "";
      favoriteDiv.innerHTML = "";

      infoDiv.appendChild(
        clone(templateTitle2, {
          text: `${country.name.common}`,
          cssText: "margin:0; font-size:28px;"
        })
      );

      infoDiv.appendChild(
        clone(templateP, {
          text: `Capital: ${Object.values(country.capital ?? {}).join(", ") ?? "N/A"}`,
          cssText: "margin:2px 0; line-height:1.2;"
        })
      );

      infoDiv.appendChild(
        clone(templateP, {
          text: `Population: ${new Intl.NumberFormat().format(country.population ?? 0)}`,
          cssText: "margin:2px 0; line-height:1.2;"
        })
      );

      infoDiv.appendChild(
        clone(templateP, {
          text: `Languages: ${Object.values(country.languages ?? {}).join(", ") ?? "N/A"}`,
          cssText: "margin:2px 0; line-height:1.2;"
        })
      );

      infoDiv.appendChild(
        clone(templateP, {
          text: `Currencies: ${Object.values(country.currencies ?? {}).map(c => c.name).join(", ") ?? "N/A"}`,
          cssText: "margin:2px 0; line-height:1.2;"
        })
      );

      const maps = document.createElement("p");
      const link = document.createElement("a");
      link.href = country.maps?.googleMaps || "#";
      link.textContent = "Maps";
      link.target = "_blank";
      maps.appendChild(link);
      infoDiv.appendChild(maps);

      const isFav = getFavoriteCountries().includes(country.name.common);

      const favoritePressed = clone(templateButton, {
        text: "Favorite",
        cssText: "width:100%;height:25px;padding:0 16px;background-color:#fbe701;border:none;color:white;border-radius:10px;cursor:pointer;transition:all 0.25s ease;"
      });

      const favoriteUnpressed = clone(templateButton, {
        text: "Favorite",
        cssText: "width:100%;height:25px;padding:0 16px;background-color:white;border:2px solid #fbe701;color:#fbe701;border-radius:10px;cursor:pointer;transition:all 0.25s ease;"
      });

      favoritePressed.style.display = isFav ? "block" : "none";
      favoriteUnpressed.style.display = isFav ? "none" : "block";

      favoriteUnpressed.onclick = () => {
        try {
          saveFavoriteCountry(country.name.common);
          favoriteUnpressed.style.display = "none";
          favoritePressed.style.display = "block";
          renderFavoritePills();
        } catch (err) {
          console.error("Error saving favorite:", err);
        }
      };

      favoritePressed.onclick = () => {
        try {
          removeFavoriteCountry(country.name.common);
          favoritePressed.style.display = "none";
          favoriteUnpressed.style.display = "block";
          renderFavoritePills();
        } catch (err) {
          console.error("Error removing favorite:", err);
        }
      };

      favoriteDiv.appendChild(favoritePressed);
      favoriteDiv.appendChild(favoriteUnpressed);

      if (country.flags?.svg) {
        const img = clone(templateImage, {
          proprieties: { src: country.flags.svg },
          cssText: "max-width:100%; object-fit:contain; border-radius:8px;"
        });
        flagDiv.appendChild(img);
      }

      try {
        saveRecentCountry(country.name.common);
        renderRecentPills();
      } catch (err) {
        console.error("Error saving recent country:", err);
      }
    })
    .catch(err => {
      console.error("Search error:", err);
      infoDiv.innerHTML = "Search unsuccesful please try something else.";
    });
}
