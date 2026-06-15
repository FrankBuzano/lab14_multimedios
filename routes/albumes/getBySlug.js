import * as album from "../../data/albumes.js";

export const getBySlug = (req, res) => {
  const found = album.getBySlug(req.params.slug);

  if (!found) {
    return res.status(404).json({ error: "Album no encontrado" });
  }

  res.json(found);
};
