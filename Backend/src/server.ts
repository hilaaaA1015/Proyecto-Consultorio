import { app } from "./app.js";
import { ENV } from "./config/env.js";

const PORT = ENV.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



