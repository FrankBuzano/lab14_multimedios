import * as album from "../../data/albumes.js";
import schema from "./search.schema.js";

const DEFAULT_ERROR = "Busqueda invalida";

export const search = (req, res) => {
  const parsed = schema.safeParse(req.params);

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? DEFAULT_ERROR;
    return res.status(400).json({ error });
  }

  const results = album.search(parsed.data.text);
  res.json(results);
};
