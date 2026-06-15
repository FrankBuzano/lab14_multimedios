import * as album from "../../data/albumes.js";

export const getByGenero = (req, res) => {
  const slugs = album.getByGenero(req.params.genero).map((a) => a.slug);
  res.json(slugs);
};
