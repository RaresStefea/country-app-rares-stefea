export const body = document.body;
document.title = "Country Info";
body.style.cssText = "background-color:#f0f0f0;font-family:Arial,sans-serif;margin:0;";

export const headDiv = document.createElement('div');
headDiv.style.cssText = "height:100px;";
body.appendChild(headDiv);

export const mainHead = document.createElement('header');
mainHead.textContent = "Country Info";
mainHead.style.cssText = "font-size:50px;text-align:center;margin:0;";
headDiv.appendChild(mainHead);

export const searchDiv = document.createElement('div');
searchDiv.style.cssText = "height:80px; display:flex; justify-content:center; align-items:center; gap:10px;";
body.appendChild(searchDiv);

export const searchInput = document.createElement('input');
searchInput.type = "text";
searchInput.placeholder = "Full country name:";
searchInput.style.cssText = "width:400px; height:36px; padding:0 12px; border-radius:10px;";
searchDiv.appendChild(searchInput);

export const searchButton = document.createElement('button');
searchButton.textContent = "Search";
searchButton.style.cssText = "height:36px; padding:0 16px; background-color:#007bff; border:none; color:white; border-radius:10px; cursor:pointer;";
searchDiv.appendChild(searchButton);

export const searchResultDiv = document.createElement('div');
searchResultDiv.style.cssText = "display:none; justify-content:center; padding:24px;";
body.appendChild(searchResultDiv);

export const searchResultWrapper = document.createElement('div');
searchResultWrapper.style.cssText = "display:flex; gap:24px; background:white; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,.1); padding:16px;";
searchResultDiv.appendChild(searchResultWrapper);

export const infoDiv = document.createElement('div');
infoDiv.style.cssText = "flex:1; display:flex; flex-direction:column; justify-content:center; gap:8px;";
searchResultWrapper.appendChild(infoDiv);

export const flagDiv = document.createElement('div');
flagDiv.style.cssText = "width:300px; display:flex; justify-content:center; align-items:center;";
searchResultWrapper.appendChild(flagDiv);

export const apiResultDiv = document.createElement('div');
apiResultDiv.style.cssText = "padding:16px 24px;";
body.appendChild(apiResultDiv);

export const apiList = document.createElement('ul');
apiList.style.cssText = "padding-left:0; margin:0; list-style:none;";
apiResultDiv.appendChild(apiList);
