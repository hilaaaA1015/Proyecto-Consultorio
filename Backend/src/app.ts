import express from "express";
import cors from "cors";
export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // front
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // <--- ESTO ES VITAL
    credentials: true
  })
);

app.use(express.json());

import patientsRoutes from "./routes/PacienteRoutes/registrarpaciente.routes.js";
app.use("/api/patients", patientsRoutes);
app.get("/api/patients", (_, res) => {
  res.json({ status: "ok" });
});
console.log("rutas registradas");

import authRoutes from "./routes/Auth.routes.js";
app.use("/api/auth", authRoutes);
app.get("/api/auth", (_, res) => {
  res.json({ status: "Funcionando..." });
});

import doctorRouter from "./routes/DoctorRoutes/VerPerfilDoc.js";
app.use("/api/doctorperfil", doctorRouter);

import pacienteRoutes from "./routes/DoctorRoutes/ListaPaciente.js";
app.use("/api/listapacientes", pacienteRoutes);
