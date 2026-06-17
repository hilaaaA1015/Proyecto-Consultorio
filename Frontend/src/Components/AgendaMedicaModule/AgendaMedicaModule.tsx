import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";
import { es } from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./AgendaMedicaModule.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { es },
});

const AgendaMedicaModule = () => {
  const [citasBackend, setCitasBackend] = useState<any[]>([]);
  const [fechaActual, setFechaActual] = useState(new Date());

  const [modalOpen, setModalOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<any>(null);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");

  const cargarCitas = () => {
    fetch("http://localhost:3001/api/citas")
      .then((res) => res.json())
      .then((data) => setCitasBackend(data));
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const eventos = citasBackend.map((c) => {
    const fecha = new Date(c.fecha);
    const [hh, mm] = c.hora.split(":").map(Number);

    const start = new Date(fecha);
    start.setHours(hh, mm, 0, 0);

    const end = new Date(start.getTime() + 35 * 60000);

    return {
      id: c.id_cita,
      title: `${c.motivo} (${c.estado})`,
      start,
      end,
      estado: c.estado,
    };
  });

  const eventStyleGetter = (event: any) => {
    const colors: any = {
      Pendiente: "#f59e0b",
      Confirmada: "#2563eb",
      Completada: "#16a34a",
      Cancelada: "#dc2626",
    };

    return {
      style: {
        backgroundColor: colors[event.estado],
        color: "white",
        borderRadius: "8px",
        border: "none",
      },
    };
  };

  // ======================
  // ABRIR MODAL
  // ======================
  const onSelectEvent = (event: any) => {
    setCitaSeleccionada(event);
    setEstadoSeleccionado(event.estado);
    setModalOpen(true);
  };

  // ======================
  // CAMBIAR ESTADO
  // ======================
  const cambiarEstado = async () => {
    await fetch(
      `http://localhost:3001/api/citas/${citaSeleccionada.id}/estado`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: estadoSeleccionado }),
      }
    );

    setModalOpen(false);
    setCitaSeleccionada(null);
    cargarCitas();
  };

  return (
    <div className="agendaModuleRoot">

      <div className="agendaCalendar">
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 550 }}
          culture="es"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={onSelectEvent}
          date={fechaActual}
          onNavigate={setFechaActual}
          views={["month", "week", "day"]}
        />
      </div>

      {/* ======================
          MODAL
      ====================== */}
      {modalOpen && citaSeleccionada && (
        <div className="modalOverlay">
          <div className="modalContent">

            <h3>Actualizar Cita</h3>

            <p><b>Motivo:</b> {citaSeleccionada.title}</p>

            <select
              value={estadoSeleccionado}
              onChange={(e) => setEstadoSeleccionado(e.target.value)}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>

            <div style={{ marginTop: 15 }}>
              <button onClick={cambiarEstado}>Guardar</button>
              <button
                onClick={() => setModalOpen(false)}
                style={{ marginLeft: 10 }}
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AgendaMedicaModule;