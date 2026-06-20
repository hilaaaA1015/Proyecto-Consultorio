import React from "react";
import { Link } from "react-router-dom";
import "./homepasiente.css";

const proximasCitas = [
  {
    dia: "20",
    mes: "Jun",
    doctor: "Dr. Carlos Martínez",
    especialidad: "Medicina General",
    hora: "09:00 AM",
    estado: "Confirmada",
  },
  {
    dia: "25",
    mes: "Jun",
    doctor: "Dra. María López",
    especialidad: "Cardiología",
    hora: "02:30 PM",
    estado: "Pendiente",
  },
];

export default function HomePasiente() {
  return (
    <div className="patient-home-page">

      <section className="patient-home-hero">
        <div className="patient-home-hero-icon">
          <span>♙</span>
        </div>

        <div>
          <h1>¡Bienvenido, Marcos!</h1>
          <p>
            Gestiona tus citas, expediente médico y perfil personal desde este panel.
          </p>
        </div>
      </section>

      <section className="patient-home-stats">
        <div className="patient-stat-card">
          <div className="patient-stat-icon">▣</div>
          <div>
            <span>Próximas citas</span>
            <h2>2</h2>
            <p>Citas programadas</p>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon">▤</div>
          <div>
            <span>Exámenes registrados</span>
            <h2>5</h2>
            <p>Historial de exámenes</p>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon">♙</div>
          <div>
            <span>Estado del perfil</span>
            <h2>Completo</h2>
            <p>Información actualizada</p>
          </div>
        </div>

        <div className="patient-stat-card">
          <div className="patient-stat-icon">◷</div>
          <div>
            <span>Última actualización</span>
            <h2>Hoy</h2>
            <p>Información reciente</p>
          </div>
        </div>
      </section>

      <section className="patient-home-main-grid">

        <div className="patient-appointments-card">
          <div className="patient-card-header">
            <div className="patient-card-title">
              <span>▣</span>
              <h2>Próximas Citas</h2>
            </div>

            <Link to="/calendariopasiente" className="patient-card-link">
              Ver todas
              <span>›</span>
            </Link>
          </div>

          <div className="patient-appointments-list">
            {proximasCitas.map((cita) => (
              <article className="patient-appointment-item" key={cita.dia}>
                <div className="patient-appointment-date">
                  <strong>{cita.dia}</strong>
                  <span>{cita.mes}</span>
                </div>

                <div className="patient-appointment-info">
                  <h3>{cita.doctor}</h3>
                  <p>{cita.especialidad}</p>
                  <span>◷ {cita.hora}</span>
                </div>

                <div
                  className={
                    cita.estado === "Confirmada"
                      ? "patient-appointment-status confirmed"
                      : "patient-appointment-status pending"
                  }
                >
                  {cita.estado}
                </div>
              </article>
            ))}
          </div>

          <Link to="/calendariopasiente" className="patient-outline-button">
            Ver historial completo
            <span>›</span>
          </Link>
        </div>

        <div className="patient-summary-card">
          <div className="patient-card-title">
            <span>♙</span>
            <h2>Resumen del Paciente</h2>
          </div>

          <div className="patient-summary-grid">
            <div className="patient-summary-item">
              <div className="summary-mini-icon">▣</div>
              <div>
                <h3>1</h3>
                <p>Próxima cita programada</p>
              </div>
            </div>

            <div className="patient-summary-item">
              <div className="summary-mini-icon">▤</div>
              <div>
                <h3>5</h3>
                <p>Exámenes registrados</p>
              </div>
            </div>

            <div className="patient-summary-item">
              <div className="summary-mini-icon">◇</div>
              <div>
                <h3>Completo</h3>
                <p>Perfil completo</p>
              </div>
            </div>

            <div className="patient-summary-item">
              <div className="summary-mini-icon">♡</div>
              <div>
                <h3>Activo</h3>
                <p>Paciente activo</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="patient-actions-card">
        <div className="patient-card-title">
          <span>↯</span>
          <h2>Acciones rápidas</h2>
        </div>

        <div className="patient-actions-grid">
          <Link to="/crearcita" className="patient-action-button">
            <span>▣</span>
            Agendar Cita
          </Link>

          <Link to="/calendariopasiente" className="patient-action-button">
            <span>▣</span>
            Ver Calendario
          </Link>

          <Link to="/expedientepasiente" className="patient-action-button">
            <span>▤</span>
            Mi Expediente
          </Link>

          <Link to="/perfilpasiente" className="patient-action-button">
            <span>♙</span>
            Mi Perfil
          </Link>
        </div>
      </section>

      <section className="patient-home-note">
        <div className="note-icon">i</div>
        <p>
          Recuerda mantener tu información personal y médica actualizada para una mejor atención.
        </p>
      </section>

    </div>
  );
}