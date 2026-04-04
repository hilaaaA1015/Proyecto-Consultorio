import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPacientes, Paciente } from './DatosPrueba';
import "./VerPacientesDoctor.css";

export const PacientesList = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [filtroSexo, setFiltroSexo] = useState('');

  const pacientesFiltrados = useMemo(() => {
    return mockPacientes.filter((p) => {
      const matchText = `${p.nombre} ${p.primer_apellido}`.toLowerCase().includes(busqueda.toLowerCase());
      const matchSexo = filtroSexo === '' || p.sexo === filtroSexo;
      return matchText && matchSexo;
    });
  }, [busqueda, filtroSexo]);

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
            {pacientesFiltrados.map((p) => (
              <tr key={p.id_usuario}>
                <td>{p.id_usuario}</td>
                <td className="bold-text">{p.nombre} {p.primer_apellido}</td>
                <td>{p.nacimiento}</td>
                <td>{p.telefono}</td>
                <td>
                  <button 
                    className="btn-details"
                    onClick={() => navigate(`/detallepaciente`)}
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