import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/discostore.db`);

export const getAll = () => {
  const query = db.prepare("SELECT * FROM albumes ORDER BY anio");
  return query.all();
};

export const getBySlug = (slug) => {
  const query = db.prepare("SELECT * FROM albumes WHERE slug = ?");
  return query.get(slug);
};

export const getByGenero = (genero) => {
  const query = db.prepare(
    "SELECT slug FROM albumes WHERE LOWER(genero) = LOWER(?) ORDER BY anio"
  );
  return query.all(genero);
};

export const search = (text) => {
  const query = db.prepare(/* SQL */ `
    SELECT * FROM albumes
    WHERE LOWER(titulo) LIKE LOWER(?)
       OR LOWER(artista) LIKE LOWER(?)
       OR LOWER(genero) LIKE LOWER(?)
       OR LOWER(sello) LIKE LOWER(?)
       OR LOWER(resumen) LIKE LOWER(?)
       OR LOWER(descripcion) LIKE LOWER(?)
    ORDER BY anio
  `);
  const param = `%${text}%`;
  return query.all(param, param, param, param, param, param);
};

export const create = (album) => {
  const insert = db.prepare(/* SQL */ `
    INSERT INTO albumes (
      titulo, artista, genero, anio, sello,
      pistas, imagen, slug, resumen, descripcion
    ) VALUES (
      :titulo, :artista, :genero, :anio, :sello,
      :pistas, :imagen, :slug, :resumen, :descripcion
    )
  `);
  insert.run(album);
  return getBySlug(album.slug);
};

export const update = (slug, album) => {
  const stmt = db.prepare(/* SQL */ `
    UPDATE albumes SET
      titulo = :titulo,
      artista = :artista,
      genero = :genero,
      anio = :anio,
      sello = :sello,
      pistas = :pistas,
      imagen = :imagen,
      resumen = :resumen,
      descripcion = :descripcion
    WHERE slug = :slug
  `);
  stmt.run({ ...album, slug });
  return getBySlug(slug);
};

export const remove = (slug) => {
  const stmt = db.prepare("DELETE FROM albumes WHERE slug = ?");
  const result = stmt.run(slug);
  return result.changes > 0;
};
