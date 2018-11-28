const port = 3000;
const serverUri = `http://${document.location.hostname}:${port}`;

export async function fetchGamesFilesList() {
  const response = await fetch(`${serverUri}/files`);
  const files = await response.json();

  return files.map(filename => `http://${document.location.hostname}:${port}/${encodeURIComponent(filename)}`);
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.set("game", file);

  return await fetch(`${serverUri}/upload`, { method: "post", body: formData });
}
