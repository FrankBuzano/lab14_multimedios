import { env } from "node:process";
import { app } from "./app.js";

const HOST = env.HOST ?? "localhost";
const PORT = Number(env.PORT ?? 4321);

app.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}/`);
});
