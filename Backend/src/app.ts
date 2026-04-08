import express from "express";
import cors from "cors";
export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // front
  })
);

app.use(express.json());

import patientsRoutes  from "./routes/PacienteRoutes/registrarpaciente.routes";
app.use("/api/patients", patientsRoutes);
app.get("/api/patients", (_, res) => {
  res.json({ status: "ok" });
});
console.log("rutas registradas");

import authRoutes  from "./routes/Auth.routes";
app.use("/api/auth", authRoutes);
app.get("/api/auth", (_, res) => {
  res.json({ status: "Funcionando..." });
});

import { citaRouter } from "./routes/Cita.routes";
app.use("/api/citas", citaRouter);
app.get("/api/citas", (_, res) => {
  res.json({ status: "Funcionando..." });
});

import { usuarioGeneralRouter } from "./routes/UsuarioGeneral.routes";
app.use("/api/users", usuarioGeneralRouter);
app.get("/api/users", (_, res) => {
  res.json({ status: "Funcionando..." });
});

import { SecretGuardaPacientRouter } from "./routes/SecretGuardaPacient.routes";
app.use("/api/secretaria", SecretGuardaPacientRouter);
app.get("/api/secretaria", (_, res) => {
  res.json({ status: "Funcionando..." });
});

import citasPagoRouter from './routes/citasPago.routes';
app.use(cors());
app.use(express.json());
app.use('/api/citas-pago', citasPagoRouter);
app.get("/api/citas-pago", (_, res) => {
  res.json({ status: "Funcionando..." });
});