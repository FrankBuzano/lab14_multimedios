import { z } from "zod";

const schema = z.object({
  text: z
    .string()
    .trim()
    .nonempty("La busqueda no puede estar vacia")
    .min(3, "La busqueda debe tener al menos 3 caracteres")
    .max(50, "La busqueda no puede tener mas de 50 caracteres")
    .transform((value) => value.toLowerCase()),
});

export default schema;
