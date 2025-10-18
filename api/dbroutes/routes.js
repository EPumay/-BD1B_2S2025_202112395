import { Router } from "express";

import  centroRoute  from "./centro.routes.js";

export const dbRoute = Router();

dbRoute.use("/centro", centroRoute);