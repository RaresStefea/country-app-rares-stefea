document.title = "Country Info";

const body = document.body;
body.style.cssText = "background-color:#f0f0f0;font-family:Arial,sans-serif;margin:0;";
//test push
const headDiv = document.createElement('div');
headDiv.style.cssText = "height:100px;";
body.appendChild(headDiv);

const mainHead = document.createElement('header');
mainHead.textContent = "Country Info";
mainHead.style.cssText = "font-size:50px;text-align:center;margin:0;";
headDiv.appendChild(mainHead);

const searchDiv = document.createElement('div');
searchDiv.style.cssText = "height:80px; display:flex; justify-content:center; align-items:center; gap:10px;";
body.appendChild(searchDiv);

const searchInput = document.createElement('input');
searchInput.type = "text";
searchInput.placeholder = "Full country name:";
searchInput.style.cssText = "width:400px; height:36px; padding:0 12px; border-radius:10px;";
searchDiv.appendChild(searchInput);

const searchButton = document.createElement('button');
searchButton.textContent = "Search";
searchButton.style.cssText = "height:36px; padding:0 16px; background-color:#007bff; border:none; color:white; border-radius:10px; cursor:pointer;";
searchDiv.appendChild(searchButton);

const searchResultDiv = document.createElement('div');
searchResultDiv.style.cssText = "display:none; justify-content:center; padding:24px;";
body.appendChild(searchResultDiv);

const searchResultWrapper = document.createElement('div');
searchResultWrapper.style.cssText = "display:flex; gap:24px; background:white; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,.1); padding:16px;";
searchResultDiv.appendChild(searchResultWrapper);

const infoDiv = document.createElement('div');
infoDiv.style.cssText = "flex:1; display:flex; flex-direction:column; justify-content:center; gap:8px;";
searchResultWrapper.appendChild(infoDiv);

const flagDiv = document.createElement('div');
flagDiv.style.cssText = "width:300px; display:flex; justify-content:center; align-items:center;";
searchResultWrapper.appendChild(flagDiv);

const apiResultDiv = document.createElement('div');
apiResultDiv.style.cssText = "padding:16px 24px;";
body.appendChild(apiResultDiv);

const apiList = document.createElement('ul');
apiList.style.cssText = "padding-left:0; margin:0; list-style:none;";
apiResultDiv.appendChild(apiList);

const listEndpoint = "https://restcountries.com/v3.1/independent";

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


function searchByName(query) {
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
      img.style.cssText = "max-width:100%;  object-fit:contain; border-radius:8px;";
      flagDiv.appendChild(img);
    })
    .catch(() => {});
}



searchButton.addEventListener('click', () => searchByName(searchInput.value));

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') 
    searchByName(searchInput.value);
});
