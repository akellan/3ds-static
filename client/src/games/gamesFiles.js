const port = 3000;

export async function fetchGamesFilesList() {
  const response = await fetch(`http://localhost:${port}/files`);
  const files = await response.json();

  return files.map(
    filename => `http://${document.location.hostname}:${port}/${filename}`
  );
}
