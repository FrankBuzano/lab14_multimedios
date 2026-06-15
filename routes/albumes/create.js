import * as album from "../../data/albumes.js";
import { createSchema } from "./album.schema.js";

const DEFAULT_ERROR = "Datos invalidos";

export const create = (req, res) => {
  const parsed = createSchema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? DEFAULT_ERROR;
    return res.status(400).json({ error });
  }

  const nuevo = parsed.data;

  if (album.getBySlug(nuevo.slug)) {
    return res.status(409).json({ error: "Ya existe un album con ese slug" });
  }

  const creado = album.create(nuevo);
  res.status(201).location(`/album/${creado.slug}`).json(creado);
};
