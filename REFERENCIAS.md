# Referencias

## Material del curso

- **Slides de Node.js** presentacion del curso.

- **Slides de Express** presentacion del curso.

- **Proyecto previo `tarea2_multimedios`** usado como base estructural (rutas, capa de datos, manejo de imagenes).

## Documentacion oficial

- **Express 5.x** — https://expressjs.com/en/5x/api.html
  Cambio de sintaxis de wildcards (`*` requiere nombre, por ejemplo `*splat`) por la actualizacion a `path-to-regexp@8`. `res.status`, `res.location`, `res.redirect` y `res.json`.

- **Node.js — Modulo `node:sqlite`** — https://nodejs.org/api/sqlite.html
  `DatabaseSync`, metodos `prepare`, `run`, `get`, `all`, manejo de parametros nombrados y `result.changes` para detectar filas afectadas en `DELETE`.

- **Node.js — `process.env` y `--env-file`** — https://nodejs.org/api/cli.html#--env-fileconfig
  Carga de variables de entorno desde un archivo `.env` sin dependencias externas.

- **Node.js — Import attributes** — https://nodejs.org/api/esm.html#import-attributes
  Para importar `data.json` con `with { type: "json" }`.

- **Zod 4** — https://zod.dev/
  `z.object`, `z.string`, `z.number`, modificadores `trim`, `nonempty`, `min`, `max`, `int`, `regex`, `optional`, `default`, `extend`, y uso de `safeParse` para validacion sin lanzar excepciones.

- **SQLite** — https://www.sqlite.org/docs.html
  Sintaxis SQL usada: `CREATE TABLE`, `PRIMARY KEY AUTOINCREMENT`, `UNIQUE`, `LIKE`, `LOWER()`, `UPDATE ... WHERE`, `DELETE FROM ... WHERE`.

## Especificacion HTTP

- **RFC 9110 — HTTP Semantics** — https://www.rfc-editor.org/rfc/rfc9110.html
  Codigos de estado utilizados: `200 OK`, `201 Created`, `204 No Content`, `302 Found`, `400 Bad Request`, `404 Not Found`, `409 Conflict`. Uso de la cabecera `Location` en respuestas `201`.

## Datos de los albumes

Informacion de los albumes (titulo, artista, sello, anio, numero de pistas, resumen) tomada de los articulos correspondientes de Wikipedia.

- **Thriller (Michael Jackson)** — https://en.wikipedia.org/wiki/Thriller_(album)
- **Wishbone (Conan Gray)** — https://en.wikipedia.org/wiki/Wishbone_(Conan_Gray_album)
- **Meteora (Linkin Park)** — https://en.wikipedia.org/wiki/Meteora_(album)
- **AM (Arctic Monkeys)** — https://en.wikipedia.org/wiki/AM_(Arctic_Monkeys_album)
- **Clancy (Twenty One Pilots)** — https://en.wikipedia.org/wiki/Clancy_(album)
- **Short n' Sweet (Sabrina Carpenter)** — https://en.wikipedia.org/wiki/Short_n%27_Sweet

## Imagenes de las portadas

Las URLs almacenadas en el campo `imagen` apuntan a recursos publicos de terceros y se usan unicamente para fines academicos. El servidor solo emite un redirect 302 al recurso original, no aloja ni redistribuye la imagen.

- **Apple Music / iTunes CDN** (`is1-ssl.mzstatic.com`) — portadas de Thriller, Meteora, Clancy y Short n' Sweet.
- **Genius CDN** (`t2.genius.com`) — portadas de Wishbone y AM.
