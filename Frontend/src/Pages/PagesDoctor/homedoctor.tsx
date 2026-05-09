import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homedoctor.css"
import LayoutDoctor from "../../layoutInternos/LayoutDoctor/layoutdoctor";
export default function HomeDoctor() {
    const citasHoy = [
        {
            hora: "08:00",
            paciente: "Juan Pérez",
            motivo: "Chequeo general",
            estado: "No asistió"
        },
        {
            hora: "08:40",
            paciente: "María López",
            motivo: "Dolor de cabeza",
            estado: "Confirmada"
        },
        {
            hora: "09:20",
            paciente: "Carlos Ruiz",
            motivo: "Control",
            estado: "Pendiente"
        },
        {
            hora: "10:40",
            paciente: "Ana Gómez",
            motivo: "Consulta general",
            estado: "Confirmada"
        }
    ];
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchPerfil = async () => {
            try {

                const res = await fetch(
                    "http://localhost:4000/api/doctorperfil/perfil",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();
                setUser(data.user || data);
            } catch (error) {

                console.error(
                    "Error al obtener perfil:",
                    error
                );
            }
        };
        fetchPerfil();
    }, [navigate]);

    const total = citasHoy.length;
    const realizadas = citasHoy.filter(c => c.estado === "Realizada").length;
    const pendientes = citasHoy.filter(c => c.estado === "Pendiente" || c.estado === "Confirmada").length;
    const canceladas = citasHoy.filter(c => c.estado === "Cancelada" || c.estado === "No asistió").length;
    return (
        <>
            <>
                <div>
                    <div className="dashboard-container">
                        <header className="home-header">
                            <h1>
                                ¡Bienvenido, Dr. {user?.apellido || user?.nomperfil || "Usuario"}! 👋
                            </h1>
                            <p className="home-subtitle">
                                Este es un resumen de sus citas hoy.
                            </p>
                        </header>

                        {/* 🔹 RESUMEN DEL DÍA */}
                        <div className="resumen">
                            <div className="card">
                                <h3>Citas hoy</h3>
                                <p>{total}</p>
                            </div>
                            <div className="card">
                                <h3>Realizadas</h3>
                                <p>{realizadas}</p>
                            </div>
                            <div className="card">
                                <h3>Pendientes</h3>
                                <p>{pendientes}</p>
                            </div>
                            <div className="card">
                                <h3>Canceladas</h3>
                                <p>{canceladas}</p>
                            </div>
                        </div>

                        {/* 🔹 CITAS DEL DÍA */}
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
                                                <span className={`estado ${cita.estado.toLowerCase().replace(" ", "-")}`}>
                                                    {cita.estado}
                                                </span>
                                            </td>
                                            <td>
                                                {cita.estado !== "Realizada" && (
                                                    <button className="btn completar">Marcar como realizada</button>
                                                )}
                                                {cita.estado === "Pendiente" && (
                                                    <button className="btn iniciar">Confirmar</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 🔹 ACCIONES RÁPIDAS */}
                        <div className="acciones">
                            <h2>Acciones rápidas</h2>
                            <div className="acciones-grid">
                                <button>📞 Llamar secretario</button>
                            </div>
                        </div>
                        {/* 🔹 AQUI ESTA LO QUE AGREGO HILARY */}
                    </div>
                </div>
            </>
        </>
    )
}