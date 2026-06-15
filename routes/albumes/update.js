import * as album from "../../data/albumes.js";
import { updateSchema } from "./album.schema.js";

const DEFAULT_ERROR = "Datos invalidos";

export const update = (req, res) => {
  const parsed = updateSchema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? DEFAULT_ERROR;
    return res.status(400).json({ error });
  }

  const { slug } = req.params;

  if (!album.getBySlug(slug)) {
    return res.status(404).json({ error: "Album no encontrado" });
  }

  const actualizado = album.update(slug, parsed.data);
  res.status(200).json(actualizado);
};
