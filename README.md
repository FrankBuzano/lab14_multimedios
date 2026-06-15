# Laboratorio 14 de Multimedios

## Descripcion

API REST construida con **Node.js + Express + SQLite** que administra el catalogo de albumes de una tienda de musica. Permite listar, consultar, filtrar por genero, buscar, crear, actualizar y eliminar albumes, ademas de redirigir a la imagen asociada a cada album.

## Requisitos

- **Node.js 22+** (este proyecto usa el modulo nativo `node:sqlite` y la flag `--env-file`).
- **pnpm 10+**

## Instalacion

1. Clonar el repositorio:

   ```bash
   git clone <url-del-repo>
   cd lab14_multimedios
   ```

2. Instalar dependencias:

   ```bash
   pnpm install
   ```

3. Configurar variables de entorno:

   ```bash
   cp .env.example .env
   ```

   Variables disponibles:

   | Variable | Default | Descripcion |
   |---|---|---|
   | `HOST` | `localhost` | Host donde escucha el servidor |
   | `PORT` | `4321` | Puerto donde escucha el servidor |

## Poblar la base de datos

La base de datos es un archivo SQLite (`data/discostore.db`) que se genera localmente a partir de un script de seed.

```bash
pnpm db:create
```

Esto ejecuta `data/createdb.js`, que:

1. Lee el script `data/CREATE.SQL` para crear (o re-crear) la tabla `albumes`.
2. Inserta los registros definidos en `data/data.json` (7 albumes).

> Es **obligatorio** poblar la BD antes de levantar el servidor.

## Ejecutar el servidor

Modo desarrollo (con `nodemon`):

```bash
pnpm dev
```

Modo produccion:

```bash
pnpm start
```

El servidor queda escuchando en:

```
http://localhost:4321/
```

## Endpoints

| Metodo | Ruta | Descripcion |
|---|---|---|
| `GET` | `/` | Informacion del API y lista de endpoints |
| `GET` | `/albumes` | Lista de slugs de todos los albumes |
| `GET` | `/albumes?include=full` | Lista completa con todos los campos |
| `GET` | `/album/:slug` | Detalle de un album por slug |
| `GET` | `/genero/:genero` | Slugs de los albumes de un genero (case-insensitive) |
| `GET` | `/search/:text` | Busqueda por texto en titulo, artista, genero, sello, resumen y descripcion |
| `POST` | `/albumes` | Crea un album (cuerpo JSON validado con Zod). Devuelve `Location` con la ruta del recurso |
| `PUT` | `/album/:slug` | Actualiza un album existente (cuerpo JSON validado con Zod) |
| `DELETE` | `/album/:slug` | Elimina un album |
| `GET` | `/imagenes/*` | Redirect 302 a la URL de la imagen del album (`/imagenes/thriller.avif`) |

### Codigos de estado

| Codigo | Cuando ocurre |
|---|---|
| `200 OK` | Lectura exitosa o `PUT` exitoso |
| `201 Created` | `POST` creo un recurso. Incluye cabecera `Location` |
| `204 No Content` | `DELETE` exitoso. Sin cuerpo en la respuesta |
| `302 Found` | Redirect (solo en `/imagenes/*`) |
| `400 Bad Request` | La validacion del cuerpo o parametro con Zod fallo |
| `404 Not Found` | El recurso a leer, actualizar o eliminar no existe |
| `409 Conflict` | `POST` intenta crear un album cuyo `slug` ya existe |

### Estructura de un album

```json
{
  "titulo": "Thriller",
  "artista": "Michael Jackson",
  "genero": "Pop",
  "anio": 1982,
  "sello": "Epic",
  "pistas": 9,
  "imagen": "thriller.avif",
  "slug": "thriller",
  "resumen": "El album mas vendido de la historia.",
  "descripcion": "Album de Michael Jackson que redefinio la musica pop de los anos 80."
}
```

### Ejemplos de uso

```bash
# Listar slugs
curl http://localhost:4321/albumes

# Listar con detalles completos
curl http://localhost:4321/albumes?include=full

# Detalle de un album
curl http://localhost:4321/album/thriller

# Albumes de un genero
curl http://localhost:4321/genero/Rock

# Busqueda
curl http://localhost:4321/search/pink

# Imagen (devuelve 302 a la URL externa)
curl -I http://localhost:4321/imagenes/thriller.avif

# Crear un album (201 Created)
curl -i -X POST http://localhost:4321/albumes \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "OK Computer",
    "artista": "Radiohead",
    "genero": "Rock Alternativo",
    "anio": 1997,
    "sello": "Parlophone",
    "pistas": 12,
    "imagen": "ok-computer.jpg",
    "slug": "ok-computer",
    "resumen": "Tercer album de Radiohead.",
    "descripcion": "Disco que llevo al rock alternativo a la era digital."
  }'

# Actualizar un album (200 OK)
curl -X PUT http://localhost:4321/album/ok-computer \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "OK Computer (Remaster)",
    "artista": "Radiohead",
    "genero": "Rock Alternativo",
    "anio": 1997,
    "sello": "Parlophone",
    "pistas": 12,
    "imagen": "ok-r.jpg",
    "resumen": "Remaster.",
    "descripcion": "Remaster del clasico."
  }'

# Eliminar un album (204 No Content)
curl -X DELETE http://localhost:4321/album/ok-computer
```

