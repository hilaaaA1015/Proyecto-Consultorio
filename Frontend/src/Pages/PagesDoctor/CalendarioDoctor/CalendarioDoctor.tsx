import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, EventProps } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarioDoctor.css";

const localizer = momentLocalizer(moment);

// 🔹 Tipo de cita (según tu BD)
interface Cita {
    id: number;
    paciente: string;
    fecha: string; // YYYY-MM-DD
    hora: string;  // HH:mm:ss
    estado: string;
}

// 🔹 Tipo de evento del calendario
interface EventoCalendario {
    title: string;
    start: Date;
    end: Date;
    resource: Cita;
}

const CalendarioDoctor: React.FC = () => {
    const [eventos, setEventos] = useState<EventoCalendario[]>([]);

    useEffect(() => {
        // 🔸 Simulación de datos (luego lo cambias por fetch)
        const citas: Cita[] = [
            {
                id: 1,
                paciente: "Juan Pérez",
                fecha: "2026-04-03",
                hora: "09:00:00",
                estado: "Pendiente",
            },
            {
                id: 2,
                paciente: "María López",
                fecha: "2026-04-03",
                hora: "11:00:00",
                estado: "Confirmada",
            },
            {
                id: 3,
                paciente: "Carlos Ruiz",
                fecha: "2026-04-04",
                hora: "10:30:00",
                estado: "Cancelada",
            },
            {
                id: 4,
                paciente: "Ana Torres",
                fecha: "2026-04-04",
                hora: "14:00:00",
                estado: "Realizada",
            },
        ];

        // 🔸 Convertir citas → eventos
        const eventosFormateados: EventoCalendario[] = citas.map((cita) => {
            const inicio = new Date(`${cita.fecha}T${cita.hora}`);
            const fin = new Date(inicio.getTime() + 30 * 60000); // 30 min

            return {
                title: `${cita.paciente}`,
                start: inicio,
                end: fin,
                resource: cita,
            };
        });

        setEventos(eventosFormateados);
    }, []);

    // 🎨 Colores por estado
    const eventStyleGetter = (event: EventoCalendario) => {
        const estado = event.resource.estado;

        let backgroundColor = "#0ea37f"; // default

        switch (estado) {
            case "Pendiente":
                backgroundColor = "#facc15";
                break;
            case "Confirmada":
                backgroundColor = "#22c55e";
                break;
            case "Cancelada":
                backgroundColor = "#ef4444";
                break;
            case "Realizada":
                backgroundColor = "#3b82f6";
                break;
        }

        return {
            style: {
                backgroundColor,
                borderRadius: "8px",
                color: "white",
                border: "none",
                padding: "5px",
                fontSize: "0.85rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            },
        };
    };

    const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);
    // 🖱️ Click en evento
    const handleSelectEvent = (event: EventoCalendario) => {
        setCitaSeleccionada(event.resource);
    };

    return (
        <div className="calendario-container">
            <h2 className="titulo">Calendario de Citas</h2>

            <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "75vh" }}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                views={["month","day"]}
                defaultView="month"
            />
            {citaSeleccionada && (
                <div className="modal-overlay" onClick={() => setCitaSeleccionada(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Detalle de la Cita</h3>

                        <p><strong>Paciente:</strong> {citaSeleccionada.paciente}</p>
                        <p><strong>Estado:</strong> {citaSeleccionada.estado}</p>
                        <p><strong>Fecha:</strong> {citaSeleccionada.fecha}</p>
                        <p><strong>Hora:</strong> {citaSeleccionada.hora}</p>

                        <button onClick={() => setCitaSeleccionada(null)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarioDoctor;