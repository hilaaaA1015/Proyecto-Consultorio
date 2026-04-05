import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homepasiente.css";

interface Cita {
  id: number;
  doctor: string;
  especialidad: string;
  fecha: string;
  hora: string;
}

export default function HomePasiente() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [proximasCitas, setProximasCitas] = useState<Cita[]>([]);

  // 🔐 Validar sesión + obtener perfil
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPerfil = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data.user);
        console.log("Respuesta perfil:", data);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };

    fetchPerfil();
  }, [navigate]);

  // 📅 (Opcional) traer citas reales
  // useEffect(() => {
  //   const fetchCitas = async () => {
  //     const token = localStorage.getItem("token");

  //     try {
  //       const res = await fetch("http://localhost:4000/api/citas/mis-citas", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const data = await res.json();
  //       console.log("Respuesta perfil:", data);
  //       // ⚠️ Ajusta esto según tu backend real
  //       setProximasCitas(data || []);
  //     } catch (error) {
  //       console.error("Error al obtener citas:", error);

  //       // fallback (temporal)
  //       setProximasCitas([
  //         {
  //           id: 1,
  //           doctor: "Dr. Henry",
  //           especialidad: "Médico General",
  //           fecha: "2025-03-20",
  //           hora: "10:30 AM",
  //         },
  //       ]);
  //     }
  //   };

  //   fetchCitas();
  // }, []);
  

  return (
    <div className="home-container">

      {/* 🔥 HEADER */}

      <header className="home-header">
        <h1>
          ¡Bienvenido, {user?.username || "Usuario"}! 👋
        </h1>
        <p className="home-subtitle">
          Esto es lo que sucede con tu salud hoy.
        </p>
      </header>

      <div className="dashboard-wrapper">
        <div className="home-grid">

          {/* 📅 CITAS */}
          <section className="home-card">
            <h3 className="home-card-title">Próximas Citas</h3>

            {proximasCitas.length === 0 ? (
              <p>No tienes citas programadas</p>
            ) : (
              proximasCitas.map((cita) => (
                <div key={cita.id} className="appointment-item">
                  <div className="date-badge">
                    <span className="date-day">
                      {cita.fecha.split("-")[2]}
                    </span>
                    <span className="date-month">Mes</span>
                  </div>

                  <div>
                    <p className="appointment-doctor">{cita.doctor}</p>
                    <p className="appointment-detail">
                      {cita.especialidad} • {cita.hora}
                    </p>
                  </div>
                </div>
              ))
            )}

            <button className="button-secondary">
              Ver historial completo
            </button>
          </section>

          {/* 📊 MÉTRICAS */}
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

          {/* ⚡ ACCIONES */}
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