import * as album from "../../data/albumes.js";

export const getAll = (req, res) => {
  const isFull = req.query.include === "full";
  const data = album.getAll();
  const contents = isFull ? data : data.map((a) => a.slug);
  res.json(contents);
};
