import React, { useState, useMemo } from "react";
import "./ListaPacientes.css";

export default function VerPacientesSecre() {

  const [pacientes, setPacientes] = useState([
    {
      id_usuario: 1,
      nombre: "Juan",
      primer_apellido: "Pérez",
      nacimiento: "2001-05-10",
      telefono: "8888-1111",
      sexo: "M",
    },
    {
      id_usuario: 2,
      nombre: "María",
      primer_apellido: "López",
      nacimiento: "1999-02-20",
      telefono: "8888-2222",
      sexo: "F",
    },
    {
      id_usuario: 3,
      nombre: "Carlos",
      primer_apellido: "Ruiz",
      nacimiento: "2000-08-15",
      telefono: "8888-3333",
      sexo: "M",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [filtroSexo, setFiltroSexo] = useState("");

  const eliminarPaciente = (id: number) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este paciente?"
    );

    if (confirmar) {
      setPacientes(
        pacientes.filter((p) => p.id_usuario !== id)
      );
    }
  };

  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter((p) => {
      const matchText = `${p.nombre} ${p.primer_apellido}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const matchSexo =
        filtroSexo === "" || p.sexo === filtroSexo;

      return matchText && matchSexo;
    });
  }, [busqueda, filtroSexo, pacientes]);

  return (
    <div className="list-container">

      <header className="list-header">
        <h1>Pacientes Registrados</h1>

        <div className="list-controls">

          <input
            type="text"
            className="search-input"
            placeholder="Buscar paciente..."
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

                <td className="bold-text">
                  {p.nombre} {p.primer_apellido}
                </td>

                <td>{p.nacimiento}</td>

                <td>{p.telefono}</td>

                <td>
                  <button
                    className="btn-delete"
                    onClick={() =>
                      eliminarPaciente(p.id_usuario)
                    }
                  >
                    Eliminar
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}