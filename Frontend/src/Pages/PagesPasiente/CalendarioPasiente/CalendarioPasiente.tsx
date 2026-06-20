import React from "react";
import { Link } from "react-router-dom";
import "./CalendarioPasiente.css";

type EstadoCita = "Confirmada" | "Pendiente";

interface Cita {
  dia: number;
  mes: string;
  especialidad: string;
  doctor: string;
  hora: string;
  estado: EstadoCita;
}

const citas: Cita[] = [
  {
    dia: 11,
    mes: "Jun",
    especialidad: "Medicina General",
    doctor: "Dr. Carlos Martínez",
    hora: "09:00 AM",
    estado: "Confirmada",
  },
  {
    dia: 17,
    mes: "Jun",
    especialidad: "Cardiología",
    doctor: "Dra. María López",
    hora: "02:00 PM",
    estado: "Pendiente",
  },
  {
    dia: 26,
    mes: "Jun",
    especialidad: "Dermatología",
    doctor: "Dr. Juan Pérez",
    hora: "11:00 AM",
    estado: "Confirmada",
  },
];

const diasDelMes = Array.from({ length: 30 }, (_, index) => index + 1);

export default function CalendarioPasiente() {
  const tieneCita = (dia: number) => {
    return citas.some((cita) => cita.dia === dia);
  };

  const esHoy = (dia: number) => dia === 12;

  return (
    <div className="calendar-page">
      <section className="calendar-hero">
        <div className="calendar-hero-icon">
          <span>▣</span>
        </div>

        <div>
          <h1>Calendario de Citas</h1>
          <p>Consulta las citas que tienes programadas durante el mes.</p>
        </div>
      </section>

      <section className="calendar-summary">
        <div className="summary-item summary-green">
          <span className="summary-icon">▣</span>
          <strong>3</strong>
          <p>citas este mes</p>
        </div>

        <div className="summary-item summary-green">
          <span className="summary-icon">✓</span>
          <strong>2</strong>
          <p>confirmadas</p>
        </div>

        <div className="summary-item summary-yellow">
          <span className="summary-icon">◷</span>
          <strong>1</strong>
          <p>pendiente</p>
        </div>
      </section>

      <section className="calendar-content">
        <div className="calendar-card-large">
          <div className="calendar-card-header">
            <button type="button" className="calendar-nav-btn">
              <span>←</span>
              Anterior
            </button>

            <h2>Junio 2026</h2>

            <button type="button" className="calendar-nav-btn">
              Siguiente
              <span>→</span>
            </button>
          </div>

          <div className="week-days">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>

          <div className="month-grid">
            {diasDelMes.map((dia) => {
              const active = tieneCita(dia);
              const today = esHoy(dia);

              return (
                <div
                  key={dia}
                  className={[
                    "month-day",
                    active ? "day-with-appointment" : "",
                    today ? "day-today" : "",
                  ].join(" ")}
                >
                  <strong>{dia}</strong>

                  {active && <small>Cita</small>}
                  {today && <small>Hoy</small>}
                </div>
              );
            })}
          </div>

          <div className="calendar-legend">
            <div>
              <span className="legend-box legend-appointment"></span>
              Día con cita
            </div>

            <div>
              <span className="legend-box legend-today"></span>
              Hoy
            </div>

            <div>
              <span className="legend-box legend-empty"></span>
              Sin citas
            </div>
          </div>
        </div>

        <aside className="appointments-panel">
          <div className="appointments-title">
            <span>▣</span>
            <h2>Próximas citas</h2>
          </div>

          <div className="appointments-list">
            {citas.map((cita) => (
              <article className="appointment-card" key={cita.dia}>
                <div className="appointment-date-box">
                  <strong>{cita.dia}</strong>
                  <span>{cita.mes}</span>
                </div>

                <div className="appointment-info">
                  <h3>{cita.especialidad}</h3>
                  <p>{cita.doctor}</p>
                  <strong className="appointment-time">◷ {cita.hora}</strong>
                </div>

                <span
                  className={
                    cita.estado === "Confirmada"
                      ? "appointment-status confirmed"
                      : "appointment-status pending"
                  }
                >
                  {cita.estado}
                </span>
              </article>
            ))}
          </div>

          <Link to="/crearcita" className="view-all-appointments">
            <span>▣</span>
            Ver todas mis citas
            <span>›</span>
          </Link>
        </aside>
      </section>

      <section className="calendar-note">
        <div className="note-icon">i</div>
        <p>
          Las citas pueden ser modificadas o canceladas desde la sección{" "}
          <strong>“Agendar Cita”</strong>.
        </p>
      </section>
    </div>
  );
}