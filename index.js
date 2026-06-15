import express from "express";
import { env } from "node:process";
import { getAll } from "./routes/albumes/getAll.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";
import { search } from "./routes/albumes/search.js";
import { create } from "./routes/albumes/create.js";
import { update } from "./routes/albumes/update.js";
import { remove } from "./routes/albumes/remove.js";
import { imagenes } from "./routes/albumes/imagenes.js";

const app = express();

app.use(express.json());

const HOST = env.HOST ?? "localhost";
const PORT = Number(env.PORT ?? 4321);

app.get("/", (req, res) => {
  res.json({
    nombre: "API DiscoStore",
    version: "1.0.0",
    descripcion:
      "API REST para administrar el catalogo de albumes de una tienda de musica.",
    endpoints: [
      { metodo: "GET", ruta: "/albumes", descripcion: "Lista de slugs (usar ?include=full para detalles completos)" },
      { metodo: "GET", ruta: "/album/:slug", descripcion: "Detalle de un album por su slug" },
      { metodo: "GET", ruta: "/genero/:genero", descripcion: "Slugs de los albumes de un genero" },
      { metodo: "GET", ruta: "/search/:text", descripcion: "Busqueda por texto en titulo, artista, genero, sello, resumen y descripcion" },
      { metodo: "POST", ruta: "/albumes", descripcion: "Crea un album" },
      { metodo: "PUT", ruta: "/album/:slug", descripcion: "Actualiza un album" },
      { metodo: "DELETE", ruta: "/album/:slug", descripcion: "Elimina un album" },
      { metodo: "GET", ruta: "/imagenes/:slug", descripcion: "Redirect a la imagen del album" },
    ],
  });
});

app.get("/albumes", getAll);
app.post("/albumes", create);
app.get("/album/:slug", getBySlug);
app.put("/album/:slug", update);
app.delete("/album/:slug", remove);
app.get("/genero/:genero", getByGenero);
app.get("/search/:text", search);
app.get("/imagenes/*splat", imagenes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}/`);
});
