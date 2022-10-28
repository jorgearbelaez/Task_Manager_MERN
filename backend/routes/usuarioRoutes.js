import express from "express";

import { registrar } from "../controllers/usuarioController.js";

//autenticacion,  Registro y confirmacion de usuarios

const router = express.Router();

router.post("/", registrar);

export default router;
