export const body = document.body;
document.title = "Country Info";
body.style.cssText = "background-color:#f0f0f0;font-family:Arial,sans-serif;margin:0; padding-top:40px;";

const master = document.createElement('div');
master.style.display = 'none';
body.appendChild(master);

function make(tag, elementOptions = {}) {
  
    const dummy = document.createElement(tag);
  
    if (elementOptions.cssText)
        dummy.style.cssText = elementOptions.cssText;

    if (elementOptions.text)
        dummy.textContent = elementOptions.text;
  
    if (elementOptions.proprieties)
        Object.assign(dummy, elementOptions.proprieties);
  
    master.appendChild(dummy);
  
    return dummy;
}

export function clone(elementToClone, elementOptions = {}, isDeep = true) {
  
    const copy = elementToClone.cloneNode(isDeep);
  
    if (elementOptions.cssText) 
        copy.style.cssText = elementOptions.cssText;
  
    if (elementOptions.text)
    copy.textContent = elementOptions.text;
  
    if (elementOptions.proprieties)
    Object.assign(copy, elementOptions.proprieties);
  
    return copy;
}

const templateDiv = make('div');
const templateHeader = make('header');
const templateInput = make('input', { proprieties: { type: 'text' } });
export const templateButton = make('button');
const templateUl = make('ul');
export const templateP = make('p');
export const templateTitle2 = make('h2');
export const templateImage = make('img');
export const templateLi = make('li');

export const headDiv = clone(templateDiv, { cssText: 'height:100px;' });
body.appendChild(headDiv);

export const mainHead = clone(templateHeader, { text: 'Country Info', cssText: 'font-size:50px;text-align:center;margin:0;' });
headDiv.appendChild(mainHead);

export const favorite2Div = clone(templateDiv, { cssText: 'height:40px; display:flex; justify-content:center;' });
body.appendChild(favorite2Div);

export const favoriteDivWrapper = clone(templateDiv, { cssText: 'display: flex; gap:10px;' });
favorite2Div.appendChild(favoriteDivWrapper);

export const searchDiv = clone(templateDiv, { cssText: 'height:80px; display:flex; justify-content:center; align-items:center; gap:10px;' });
body.appendChild(searchDiv);

export const searchInput = clone(templateInput, { proprieties: { placeholder: 'Full country name:' }, cssText: 'width:400px; height:36px; padding:0 12px; border-radius:10px;' });
searchDiv.appendChild(searchInput);

export const searchButton = clone(templateButton, { text: 'Search', cssText: 'height:36px; padding:0 16px; background-color:#007bff; border:none; color:white; border-radius:10px; cursor:pointer;' });
searchDiv.appendChild(searchButton);

export const recentDiv = clone(templateDiv, { cssText: 'height:40px; display:flex; justify-content:center;' });
body.appendChild(recentDiv);

export const recentDivWrapper = clone(templateDiv, { cssText: 'display: flex; gap:10px;' });
recentDiv.appendChild(recentDivWrapper);

export const searchResultDiv = clone(templateDiv, { cssText: 'display:none; justify-content:center; padding:24px;' });
body.appendChild(searchResultDiv);

export const searchResultWrapper = clone(templateDiv, { cssText: 'display:grid;grid-template-columns: 1fr 300px;gap:24px;background:white;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,.1);padding:16px;align-items:start;'});
searchResultDiv.appendChild(searchResultWrapper);

export const infoDiv = clone(templateDiv, { cssText: 'grid-column: 1;display:flex;flex-direction:column;justify-content:center;gap:8px;' });
searchResultWrapper.appendChild(infoDiv);

export const flagDiv = clone(templateDiv, { cssText: 'grid-column: 2;width:300px;display:flex;justify-content:center;align-items:center;' });
searchResultWrapper.appendChild(flagDiv);

export const favoriteDiv = clone(templateDiv, { cssText: 'grid-column: 1 / -1;display:flex; align-items:stretch;' })
searchResultWrapper.appendChild(favoriteDiv)

export const apiResultDiv = clone(templateDiv, { cssText: 'padding:16px 24px;' });
body.appendChild(apiResultDiv);

export const apiList = clone(templateUl, { cssText: 'padding-left:0; margin:0; list-style:none;' });
apiResultDiv.appendChild(apiList);
