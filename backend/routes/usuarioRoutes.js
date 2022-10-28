import express from "express";

import {
  autenticar,
  registrar,
  confirmar,
} from "../controllers/usuarioController.js";

//autenticacion,  Registro y confirmacion de usuarios

const router = express.Router();

router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);

export default router;
