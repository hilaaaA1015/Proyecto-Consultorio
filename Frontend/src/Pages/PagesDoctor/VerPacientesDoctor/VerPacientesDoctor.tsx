import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./VerPacientesDoctor.css";

interface Paciente {
  id_usuario: number;
  nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  nacimiento: string;
  telefono: string;
  sexo: string;
}

export const PacientesList = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroSexo, setFiltroSexo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerPacientes();
  }, [busqueda, filtroSexo]);

  const obtenerPacientes = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (busqueda) {
        params.append("busqueda", busqueda);
      }

      if (filtroSexo) {
        params.append("sexo", filtroSexo);
      }

      const response = await fetch(
        `http://localhost:4000/api/listapacientes?${params.toString()}`
      );

      const data = await response.json();

      setPacientes(data);
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-container">
      <header className="list-header">
        <h1>Directorio de Pacientes</h1>
        <div className="list-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="filter-select"
            value={filtroSexo}
            onChange={(e) => setFiltroSexo(e.target.value)}
          >
            <option value="">Todos los sexos</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
      </header>
      {loading && <p>Cargando pacientes...</p>}
      <div className="table-wrapper">
        <table className="pacientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Nacimiento</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id_usuario}>
                <td>{p.id_usuario}</td>
                <td className="bold-text">{p.nombre} {p.primer_apellido}</td>
                <td>{p.nacimiento}</td>
                <td>{p.telefono}</td>
                <td>
                  <button
                    className="btn-details"
                    onClick={() => navigate(`/detallepaciente/${p.id_usuario}`)}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};