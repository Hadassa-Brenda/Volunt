const STORAGE_KEY = "volunt-favorites";
export function getFavoriteIds(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]").map(String)}catch{return []}}
export function saveFavoriteIds(ids){const value=[...new Set(ids.map(String))];localStorage.setItem(STORAGE_KEY,JSON.stringify(value));window.dispatchEvent(new CustomEvent("volunt:favorites",{detail:value}));return value}
export function toggleFavoriteId(id){const key=String(id);const current=getFavoriteIds();return saveFavoriteIds(current.includes(key)?current.filter(item=>item!==key):[...current,key])}
