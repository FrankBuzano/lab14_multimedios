import { z } from "zod";

const slug = z
  .string()
  .trim()
  .nonempty("El slug no puede estar vacio")
  .min(2, "El slug debe tener al menos 2 caracteres")
  .max(80, "El slug no puede tener mas de 80 caracteres")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "El slug debe ser kebab-case (minusculas, numeros y guiones)"
  );

const baseAlbum = z.object({
  titulo: z.string().trim().nonempty("El titulo es obligatorio").max(120),
  artista: z.string().trim().nonempty("El artista es obligatorio").max(120),
  genero: z.string().trim().nonempty("El genero es obligatorio").max(60),
  anio: z
    .number()
    .int("El anio debe ser un entero")
    .min(1900, "El anio debe ser >= 1900")
    .max(2100, "El anio debe ser <= 2100"),
  sello: z.string().trim().max(80).optional().default(""),
  pistas: z
    .number()
    .int("Las pistas deben ser un entero")
    .min(1, "Debe tener al menos 1 pista")
    .max(200, "Demasiadas pistas"),
  imagen: z.string().trim().max(300).optional().default(""),
  resumen: z.string().trim().max(300).optional().default(""),
  descripcion: z.string().trim().max(2000).optional().default(""),
});

export const createSchema = baseAlbum.extend({ slug });

export const updateSchema = baseAlbum;

export const slugParamSchema = z.object({ slug });
