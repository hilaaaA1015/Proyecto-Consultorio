import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockPacientes } from "../../PagesDoctor/VerPacientesDoctor/DatosPrueba";
import "./ListaPacientes.css";

export const VerPacientesSecre = () => {
  const navigate = useNavigate();

  // 👇 rol (temporal, luego debe venir de login o contexto)
  const rol: "secretaria" | "doctor" = "secretaria";

  const [busqueda, setBusqueda] = useState("");
  const [filtroSexo, setFiltroSexo] = useState("");

  const pacientesFiltrados = useMemo(() => {
    return mockPacientes.filter((p) => {
      const matchText = `${p.nombre} ${p.primer_apellido}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const matchSexo = filtroSexo === "" || p.sexo === filtroSexo;

      return matchText && matchSexo;
    });
  }, [busqueda, filtroSexo]);

  return (
    <div className="list-container">
      <header className="list-header">
        <h1>Lista de Pacientes</h1>

        <div className="list-controls">
          <input
            className="search-input"
            type="text"
            placeholder="🔍 Buscar paciente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="filter-select"
            value={filtroSexo}
            onChange={(e) => setFiltroSexo(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
      </header>

      <div className="table-wrapper">
        <table className="pacientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nacimiento</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pacientesFiltrados.map((p) => (
              <tr key={p.id_usuario}>
                <td>{p.id_usuario}</td>
                <td>
                  {p.nombre} {p.primer_apellido}
                </td>
                <td>{p.nacimiento}</td>
                <td>{p.telefono}</td>

                <td>
                  
                  {/* 👩‍💼 SECRETARIA */}
                  {rol === "secretaria" && (
                    <button
                      className="btn-block"
                      onClick={() =>
                        console.log("Bloquear paciente:", p.id_usuario)
                      }
                    >
                      Bloquear
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerPacientesSecre;