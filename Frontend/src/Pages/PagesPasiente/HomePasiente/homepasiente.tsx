import React from "react";
import { Link } from "react-router-dom";
import "./homepasiente.css";

interface Cita {
  id: number;
  doctor: string;
  especialidad: string;
  fecha: string;
  hora: string;
}

export default function HomePasiente() {
  // Datos de ejemplo (Esto vendría de una API o Props)
  const proximasCitas: Cita[] = [
    { id: 1, doctor: "Dr. Henry", especialidad: "Medico General", fecha: "2025-03-20", hora: "10:30 AM" },
  ];

  return (
    <div className="home-container">

      <header className="home-header">
        <h1>¡Bienvenido, Axel! 👋</h1>
        <p className="home-subtitle">Esto es lo que sucede con tu salud hoy.</p>
      </header>
      <div className="dashboard-wrapper">
        <div className="home-grid">

          <section className="home-card">
            <h3 className="home-card-title">Próximas Citas</h3>

            {proximasCitas.map((cita) => (
              <div key={cita.id} className="appointment-item">
                <div className="date-badge">
                  <span className="date-day">{cita.fecha.split('-')[2]}</span>
                  <span className="date-month">Marzo</span>
                </div>
                <div>
                  <p className="appointment-doctor">{cita.doctor}</p>
                  <p className="appointment-detail">
                    {cita.especialidad} • {cita.hora}
                  </p>
                </div>
              </div>
            ))}

            <button className="button-secondary">
              Ver historial completo
            </button>
          </section>

          <section className="home-card">
            <h3 className="home-card-title">Últimas métricas</h3>

            <div className="metrics-grid">
              <div className="metric">
                <span>❤️</span>
                <p className="metric-label">Ritmo Cardíaco</p>
                <p className="metric-value">72 bpm</p>
              </div>

              <div className="metric">
                <span>🩸</span>
                <p className="metric-label">Glucosa</p>
                <p className="metric-value">95 mg/dL</p>
              </div>
            </div>
          </section>

          <section className="home-card full-width">
            <h3 className="home-card-title">¿Qué necesitas hacer?</h3>

            <div className="action-buttons">
              <Link to="/crearcita" className="hero_btn">
                Agendar Cita
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
