import React from "react";
import { Link } from "react-router-dom";
import "./homesecretaria.css";

export default function HomeSecretaria() {

  const citasHoy = [
    {
      hora: "08:00",
      paciente: "Juan Pérez",
      motivo: "Chequeo general",
      estado: "Pendiente"
    },
    {
      hora: "09:00",
      paciente: "María López",
      motivo: "Consulta",
      estado: "Confirmada"
    }
  ];

  const total = citasHoy.length;

  return (
    <div className="dashboard-container">

      {/* RESUMEN */}
      <div className="resumen">

        <div className="card">
          <h3>Citas hoy</h3>
          <p>{total}</p>
        </div>

        <div className="card">
          <h3>Pacientes</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Pendientes</h3>
          <p>5</p>
        </div>

        <div className="card">
          <h3>Pagos</h3>
          <p>12</p>
        </div>

      </div>

      {/* TABLA */}
      <div className="citas">

        <h2>Citas del día</h2>

        <table>
          <thead>
  <tr>
    <th>Hora</th>
    <th>Paciente</th>
    <th>Motivo</th>
    <th>Estado</th>
    <th>Acciones</th>
  </tr>
</thead>

<tbody>
  {citasHoy.map((cita, index) => (
    <tr key={index}>
      <td>{cita.hora}</td>
      <td>{cita.paciente}</td>
      <td>{cita.motivo}</td>

      <td>
        <span className={`estado ${cita.estado.toLowerCase()}`}>
          {cita.estado}
        </span>
      </td>

      <td>
        <Link
          to="/homesecretaria/vistapagocita"
          className="btn-pago"
        >
          Realizar pago
        </Link>
      </td>
    </tr>
  ))}
</tbody>
        </table>

      </div>

      {/* ACCIONES */}
      <div className="acciones">

        <h2>Acciones rápidas</h2>

        <div className="acciones-grid">


    <Link to="/crearusuariopasientevista">
        <button>👤 Registrar paciente</button>
    </Link>


</div>

      </div>

    </div>
  );
}

