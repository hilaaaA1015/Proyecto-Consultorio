import React from "react";
import "./homedoctor.css"
import LayoutDoctor from "../../layoutInternos/LayoutDoctor/layoutdoctor";
import AgendaMedicaModule from "../../Components/AgendaMedicaModule/AgendaMedicaModule";


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
    const total = citasHoy.length;
    const realizadas = citasHoy.filter(c => c.estado === "Realizada").length;
    const pendientes = citasHoy.filter(c => c.estado === "Pendiente" || c.estado === "Confirmada").length;
    const canceladas = citasHoy.filter(c => c.estado === "Cancelada" || c.estado === "No asistió").length;
    return (
        <>
            <>
            <div>
                <div className="dashboard-container">

                    
             

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
                    {/* 🔹 AGENDA MÉDICA */}

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