import { Router } from "express";

import  centroRoute  from "./centro.routes.js";
import departamentoRoute from "./departamento.routes.js";
import municipioRoute from "./municipio.routes.js";
import escuelaRoute from "./escuela.routes.js";
import escuelaCentroRoute from "./escuela_centro.routes.js";

export const dbRoute = Router();

dbRoute.use("/centro", centroRoute);
dbRoute.use("/departamento", departamentoRoute);
dbRoute.use("/municipio", municipioRoute);
dbRoute.use("/escuela", escuelaRoute);
dbRoute.use("/escuela-centro", escuelaCentroRoute);