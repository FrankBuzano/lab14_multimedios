import request from "supertest";
import { app } from "../app.js";

const ALBUM_BASE = {
  titulo: "Album de Prueba",
  artista: "Banda de Prueba",
  genero: "Rock",
  anio: 2020,
  sello: "Sello de Prueba",
  pistas: 10,
  imagen: "",
  resumen: "",
  descripcion: "",
};

const uniqueSlug = (prefix) =>
  `test-${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

let seedSlug;
const createdSlugs = new Set();

beforeAll(async () => {
  const res = await request(app).get("/albumes");
  if (!Array.isArray(res.body) || res.body.length === 0) {
    throw new Error(
      "La base de datos no esta sembrada. Ejecuta `pnpm run db:create` antes de las pruebas."
    );
  }
  seedSlug = res.body[0];
});

afterAll(async () => {
  for (const slug of createdSlugs) {
    await request(app).delete(`/album/${slug}`);
  }
});

describe("GET /albumes", () => {
  it("200 y un arreglo que contiene un slug sembrado", async () => {
    const res = await request(app).get("/albumes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain(seedSlug);
  });
});

describe("GET /album/:slug", () => {
  it("200 y el objeto del album cuando el slug existe", async () => {
    const res = await request(app).get(`/album/${seedSlug}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ slug: seedSlug });
    expect(res.body).toHaveProperty("titulo");
    expect(res.body).toHaveProperty("artista");
  });

  it("404 en JSON cuando el slug no existe", async () => {
    const res = await request(app).get("/album/slug-que-no-existe-xyz");
    expect(res.status).toBe(404);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("error");
  });
});

describe("GET /search/:text", () => {
  it("400 en JSON cuando el texto tiene menos de 3 caracteres", async () => {
    const res = await request(app).get("/search/ab");
    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /albumes", () => {
  it("201, cabecera Location y objeto creado cuando el cuerpo es valido", async () => {
    const slug = uniqueSlug("create-ok");
    const res = await request(app)
      .post("/albumes")
      .send({ ...ALBUM_BASE, slug });

    createdSlugs.add(slug);

    expect(res.status).toBe(201);
    expect(res.headers.location).toBe(`/album/${slug}`);
    expect(res.body).toMatchObject({ slug, titulo: ALBUM_BASE.titulo });
  });

  it("400 en JSON cuando el cuerpo es invalido", async () => {
    const res = await request(app).post("/albumes").send({ slug: "x" });
    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("error");
  });

  it("409 en JSON cuando el slug ya existe", async () => {
    const res = await request(app)
      .post("/albumes")
      .send({ ...ALBUM_BASE, slug: seedSlug });
    expect(res.status).toBe(409);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("error");
  });
});

describe("PUT /album/:slug", () => {
  it("200 y objeto actualizado cuando el album existe y el cuerpo es valido", async () => {
    const slug = uniqueSlug("update-ok");
    await request(app)
      .post("/albumes")
      .send({ ...ALBUM_BASE, slug });
    createdSlugs.add(slug);

    const res = await request(app)
      .put(`/album/${slug}`)
      .send({ ...ALBUM_BASE, titulo: "Titulo Actualizado" });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      slug,
      titulo: "Titulo Actualizado",
    });
  });

  it("404 en JSON cuando el album no existe", async () => {
    const res = await request(app)
      .put("/album/slug-que-no-existe-xyz")
      .send({ ...ALBUM_BASE });
    expect(res.status).toBe(404);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("error");
  });
});

describe("DELETE /album/:slug", () => {
  it("204 sin cuerpo cuando el album existe", async () => {
    const slug = uniqueSlug("delete-ok");
    await request(app)
      .post("/albumes")
      .send({ ...ALBUM_BASE, slug });

    const res = await request(app).delete(`/album/${slug}`);
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
    expect(res.text === "" || res.text === undefined).toBe(true);
  });

  it("404 en JSON cuando el album no existe", async () => {
    const res = await request(app).delete("/album/slug-que-no-existe-xyz");
    expect(res.status).toBe(404);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toHaveProperty("error");
  });
});
