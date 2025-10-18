import { Router } from "express";

import  centroRoute  from "./centro.routes.js";
import departamentoRoute from "./departamento.routes.js";
import municipioRoute from "./municipio.routes.js";
import escuelaRoute from "./escuela.routes.js";
import escuelaCentroRoute from "./escuela_centro.routes.js";
import personaRoute from "./persona.routes.js";
import correlativoRoute from "./correlativo.routes.js";
import examenRoute from "./examen.routes.js";
import preguntaTeoricaRoute from "./pregunta_teorica.routes.js";
import respuestaUsuarioRoute from "./respuesta_usuario.routes.js";
import preguntaPracticaRoute from "./pregunta_practica.routes.js";
import respuestaPracticaRoute from "./respuestaPractica.routes.js";

export const dbRoute = Router();

dbRoute.use("/centro", centroRoute);
dbRoute.use("/departamento", departamentoRoute);
dbRoute.use("/municipio", municipioRoute);
dbRoute.use("/escuela", escuelaRoute);
dbRoute.use("/escuela-centro", escuelaCentroRoute);
dbRoute.use("/persona", personaRoute);
dbRoute.use("/correlativo", correlativoRoute);
dbRoute.use("/examen", examenRoute);
dbRoute.use("/pregunta-teorica", preguntaTeoricaRoute);
dbRoute.use("/respuesta-usuario", respuestaUsuarioRoute);
dbRoute.use("/pregunta-practica", preguntaPracticaRoute);
dbRoute.Use("/respuesta-practica", respuestaPracticaRoute);

