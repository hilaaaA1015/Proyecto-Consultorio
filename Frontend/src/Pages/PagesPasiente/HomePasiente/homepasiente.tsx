import React from "react";
import { Link } from "react-router-dom";

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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>¡Bienvenido, Axel! 👋</h1>
        <p style={styles.subtitle}>Esto es lo que sucede con tu salud hoy.</p>
      </header>

      {/* Grid del Dashboard */}
      <div style={styles.grid}>

        {/* SECCIÓN 1: PRÓXIMAS CITAS */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Próximas Citas</h3>
          {proximasCitas.length > 0 ? (
            proximasCitas.map((cita) => (
              <div key={cita.id} style={styles.appointmentItem}>
                <div style={styles.dateBadge}>
                  <span style={styles.dateDay}>{cita.fecha.split('-')[2]}</span>
                  <span style={styles.dateMonth}>Marzo</span>
                </div>
                <div>
                  <p style={styles.appointmentDoctor}>{cita.doctor}</p>
                  <p style={styles.appointmentDetail}>{cita.especialidad} • {cita.hora}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No tienes citas programadas.</p>
          )}
          <button style={styles.buttonSecondary}>Ver historial completo</button>
        </section>

        {/* SECCIÓN 2: MÉTRICAS RÁPIDAS */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Últimas métricas</h3>
          <div style={styles.metricsGrid}>
            <div style={styles.metric}>
              <span style={{ fontSize: '1.5rem' }}>❤️</span>
              <p style={styles.metricLabel}>Ritmo Cardíaco</p>
              <p style={styles.metricValue}>72 <small>bpm</small></p>
            </div>
            <div style={styles.metric}>
              <span style={{ fontSize: '1.5rem' }}>🩸</span>
              <p style={styles.metricLabel}>Glucosa</p>
              <p style={styles.metricValue}>95 <small>mg/dL</small></p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: ACCIONES RÁPIDAS */}
        <section style={{ ...styles.card, gridColumn: "1 / -1" }}>
          <h3 style={styles.cardTitle}>¿Qué necesitas hacer?</h3>
          <div style={styles.actionButtons}>
            <Link to="/crearcita" className="hero_btn">
              Agendar Cita
            </Link>
            <Link to="/" className="hero_btn">
              Solicitar receta
            </Link>
            {/* <Link to="/" className="hero_btn">
              Ver expediente
            </Link> */}
          </div>
        </section>

      </div>
    </div>
  );
}

// Estilos rápidos (puedes pasarlos a CSS/Tailwind)
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px", fontFamily: "sans-serif", color: "#333" },
  header: { marginBottom: "30px" },
  subtitle: { color: "#666", fontSize: "1.1rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "1px solid #eee"
  },
  cardTitle: { marginTop: 0, marginBottom: "15px", fontSize: "1.2rem", color: "#2c3e50" },
  appointmentItem: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" },
  dateBadge: {
    backgroundColor: "#e3f2fd",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    minWidth: "50px"
  },
  dateDay: { display: "block", fontSize: "1.2rem", fontWeight: "bold", color: "#1976d2" },
  dateMonth: { fontSize: "0.7rem", color: "#1976d2" },
  appointmentDoctor: { margin: 0, fontWeight: "bold" },
  appointmentDetail: { margin: 0, fontSize: "0.9rem", color: "#666" },
  metricsGrid: { display: "flex", gap: "20px" },
  metric: { textAlign: "center", flex: 1, padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "8px" },
  metricLabel: { fontSize: "0.8rem", color: "#666", margin: "5px 0" },
  metricValue: { fontSize: "1.3rem", fontWeight: "bold", margin: 0 },
  actionButtons: { display: "flex", gap: "10px", flexWrap: "wrap" },
  buttonPrimary: {
    padding: "10px 20px", backgroundColor: "#0ea37f", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer"
  },
  buttonSecondary: {
    marginTop: "10px", width: "100%", padding: "8px", backgroundColor: "transparent", border: "1px solid #1976d2", color: "#1976d2", borderRadius: "6px", cursor: "pointer"
  }
};