import React, { useState } from "react";
import "./homesecretaria.css";
import AgendaMedicaModule from "../../Components/AgendaMedicaModule/AgendaMedicaModule";



export default function HomeSecretaria() {
  const [vista, setVista] = useState("dashboard");

  return (
    <div className="clinicShell">

      {/* 🔝 NAVBAR */}
      <div className="clinicTopbar">
        <div className="clinicBrandBox">
          <img src="/imagenes/Regina-04(este_es) 2.png" alt="logo" className="clinicLogo" />
          <span className="clinicTitle">Consultorio Médico</span>
        </div>

        <div className="clinicNavActions">
          <button
            className={vista === "dashboard" ? "activeBtn" : ""}
            onClick={() => setVista("dashboard")}
          >
            Inicio
          </button>

          <button
            className={vista === "calendar" ? "activeBtn" : ""}
            onClick={() => setVista("calendar")}
          >
            Calendario
          </button>

          <button
            className={vista === "patients" ? "activeBtn" : ""}
            onClick={() => setVista("patients")}
          >
            Pacientes
          </button>
        </div>
      </div>

      {/* 📦 CONTENIDO */}
      <div className="clinicContent">

        {/* 🏠 DASHBOARD */}
        {vista === "dashboard" && (
          <>
            <div className="clinicStatsGrid">
              <div className="clinicStatCard green">
                4 <span>Citas hoy</span>
              </div>

              <div className="clinicStatCard blue">
                0 <span>Realizadas</span>
              </div>

              <div className="clinicStatCard orange">
                3 <span>Pendientes</span>
              </div>

              <div className="clinicStatCard red">
                1 <span>Canceladas</span>
              </div>
            </div>

            <div className="clinicTableCard">
              <h3 className="sectionTitle">Citas del día</h3>

              <table className="clinicTable">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>08:00</td>
                    <td>Juan Pérez</td>
                    <td>Chequeo</td>
                    <td>
                      <span className="badge warning">Pendiente</span>
                    </td>
                    <td>
                      <button className="actionBtn success">Atender</button>
                      <button className="actionBtn danger">Cancelar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* 📅 CALENDARIO (TU COMPONENTE 🔥) */}
        {vista === "calendar" && (
          <div className="clinicModuleWrapper">
            <AgendaMedicaModule />
          </div>
        )}

        {/* 👥 PACIENTES */}
        {vista === "patients" && (
          <div className="clinicTableCard">
            <h3 className="sectionTitle">Pacientes</h3>

            <table className="clinicTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Teléfono</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>María López</td>
                  <td>25</td>
                  <td>8888-8888</td>
                  <td>
                    <button className="actionBtn primary">Ver</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}