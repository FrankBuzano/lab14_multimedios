import * as album from "../../data/albumes.js";

export const remove = (req, res) => {
  const { slug } = req.params;

  if (!album.getBySlug(slug)) {
    return res.status(404).json({ error: "Album no encontrado" });
  }

  album.remove(slug);
  res.status(204).end();
};
