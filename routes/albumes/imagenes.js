import * as album from "../../data/albumes.js";

export const imagenes = (req, res) => {
  const segments = req.params.splat;
  const path = Array.isArray(segments) ? segments.join("/") : String(segments ?? "");
  const slug = path.replace(/\.[^/.]+$/, "");

  if (!slug) {
    return res.status(404).json({ error: "Imagen no encontrada" });
  }

  const found = album.getBySlug(slug);

  if (!found || !found.imagen) {
    return res.status(404).json({ error: "Imagen no encontrada" });
  }

  res.redirect(302, found.imagen);
};
