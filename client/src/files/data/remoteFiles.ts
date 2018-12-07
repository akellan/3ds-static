const port = 3000;
export const serverUri = `http://${document.location.hostname}:${port}`;

export async function uploadFile(file) {
  const formData = new FormData();
  formData.set("game", file);

  return await fetch(`${serverUri}/upload`, { method: "post", body: formData });
}
