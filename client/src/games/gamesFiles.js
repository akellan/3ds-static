export function fetchGamesFilesList() {
  return fetch("http://localhost:3000/files").catch(console.error);
}
