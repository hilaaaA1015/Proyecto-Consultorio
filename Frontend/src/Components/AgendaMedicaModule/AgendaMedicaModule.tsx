import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addMinutes,
  isBefore,
  isWeekend,
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

const HORARIOS = ["08:00","08:45","09:30","10:15","11:00","11:45","12:30"];

type EstadoCita = "Pendiente" | "Confirmada" | "Completada" | "Cancelada";

export interface Cita {
  id: string;
  title: string;
  start: Date;
  end: Date;
  paciente: string;
  servicio: string;
  estado: EstadoCita;
}

interface Props {
  citasExternas?: Cita[];
  onCrearCita?: (cita: Cita) => void;
}

const AgendaMedicaModule: React.FC<Props> = ({
  citasExternas = [],
  onCrearCita,
}) => {
  const [citas, setCitas] = useState<Cita[]>(citasExternas);
  const [fechaActual, setFechaActual] = useState(new Date());

  const [form, setForm] = useState({
    paciente: "",
    servicio: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
  });

  // 📅 seleccionar día
  const handleSelectSlot = ({ start }: { start: Date }) => {
    if (isWeekend(start)) return alert("No fines de semana");

    setForm({
      ...form,
      fecha: format(start, "yyyy-MM-dd"),
    });
  };

  // ➕ agregar cita
  const agregarCita = (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(`${form.fecha}T${form.horaInicio}`);
    const end = addMinutes(start, 35);

    if (isBefore(start, new Date())) return alert("Fecha inválida");

    const existe = citas.find(
      (c) =>
        format(c.start, "yyyy-MM-dd") === form.fecha &&
        format(c.start, "HH:mm") === form.horaInicio
    );

    if (existe) return alert("Horario ocupado");

    const nueva: Cita = {
      id: Date.now().toString(),
      title: `${form.paciente} - ${form.servicio}`,
      start,
      end,
      paciente: form.paciente,
      servicio: form.servicio,
      estado: "Pendiente",
    };

    setCitas([...citas, nueva]);
    onCrearCita && onCrearCita(nueva);

    setForm({
      paciente: "",
      servicio: "",
      fecha: "",
      horaInicio: "",
      horaFin: "",
    });
  };

  // 🎨 colores por estado
  const eventStyleGetter = (event: Cita) => {
    const colores = {
      Pendiente: "#f59e0b",
      Confirmada: "#2563eb",
      Completada: "#16a34a",
      Cancelada: "#dc2626",
    };

    return {
      style: {
        backgroundColor: colores[event.estado],
        borderRadius: "8px",
        color: "white",
        border: "none",
      },
    };
  };

  return (
    <div className="agendaModuleRoot">

      <div className="agendaLayout">

        {/* CALENDARIO */}
        <div className="agendaCalendar">
          <Calendar
            localizer={localizer}
            events={citas}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            eventPropGetter={eventStyleGetter}
            date={fechaActual}
            onNavigate={setFechaActual}
            views={["month", "week", "day"]}
            style={{ height: 550 }}
            culture="es"
          />
        </div>

        {/* FORM */}
        <div className="agendaForm">
          <h3>Nueva Cita</h3>

          <form onSubmit={agregarCita}>
            <input
              placeholder="Paciente"
              value={form.paciente}
              onChange={(e) =>
                setForm({ ...form, paciente: e.target.value })
              }
              required
            />

            <select
              value={form.servicio}
              onChange={(e) =>
                setForm({ ...form, servicio: e.target.value })
              }
              required
            >
              <option value="">Servicio</option>
              <option>Consulta médica</option>
              <option>Chequeo</option>
            </select>

            <input type="date" value={form.fecha} readOnly />

            <select
              value={form.horaInicio}
              onChange={(e) => {
                const inicio = e.target.value;
                const temp = new Date();
                const [h, m] = inicio.split(":");
                temp.setHours(+h, +m);

                setForm({
                  ...form,
                  horaInicio: inicio,
                  horaFin: format(addMinutes(temp, 35), "HH:mm"),
                });
              }}
              required
            >
              <option value="">Hora</option>
              {HORARIOS.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>

            <input type="time" value={form.horaFin} readOnly />

            <button type="submit">Agendar</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AgendaMedicaModule;