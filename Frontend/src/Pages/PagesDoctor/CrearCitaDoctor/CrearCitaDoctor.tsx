import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMinutes, isBefore, isWeekend } from 'date-fns';
import { es } from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CrearCitaDoctor.css';

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 🔥 TURNOS FIJOS (45 min = 35 consulta + 10 descanso)
const HORARIOS = [
  "08:00",
  "08:45",
  "09:30",
  "10:15",
  "11:00",
  "11:45",
  "12:30"
];

type EstadoCita = 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';

interface Cita {
  id: string;
  title: string;
  start: Date;
  end: Date;
  paciente: string;
  servicio: string;
  estado: EstadoCita;
}

const CrearCitaDoctor: React.FC = () => {

  const [citas, setCitas] = useState<Cita[]>([]);
  const [fechaActual, setFechaActual] = useState(new Date());

  const [nuevaCita, setNuevaCita] = useState({
    paciente: '',
    servicio: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
  });

  // 📅 CLICK CALENDARIO
  const handleSelectSlot = ({ start }: { start: Date; end: Date }) => {
    const inicio = new Date(start);

    if (isWeekend(inicio)) {
      alert("El doctor no trabaja fines de semana");
      return;
    }

    setNuevaCita({
      ...nuevaCita,
      fecha: format(inicio, 'yyyy-MM-dd'),
    });
  };

  const agregarCita = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevaCita.fecha || !nuevaCita.horaInicio) {
      alert("Completa los datos");
      return;
    }

    const start = new Date(`${nuevaCita.fecha}T${nuevaCita.horaInicio}`);
    const end = addMinutes(start, 35);

    // 🚫 pasado
    if (isBefore(start, new Date())) {
      alert("No puedes agendar en el pasado");
      return;
    }

    // 🚫 fines de semana
    if (isWeekend(start)) {
      alert("Solo lunes a viernes");
      return;
    }

    // 🚫 validar turno fijo
    if (!HORARIOS.includes(nuevaCita.horaInicio)) {
      alert("Selecciona un horario válido");
      return;
    }

    // 🚫 evitar choque
    const existe = citas.find(cita =>
      format(cita.start, 'yyyy-MM-dd') === nuevaCita.fecha &&
      format(cita.start, 'HH:mm') === nuevaCita.horaInicio
    );

    if (existe) {
      alert(`⚠️ Ya hay una cita a las ${format(existe.start, 'HH:mm')}`);
      return;
    }

    const nueva: Cita = {
      id: Date.now().toString(),
      title: `${nuevaCita.paciente} - ${nuevaCita.servicio}`,
      start,
      end,
      paciente: nuevaCita.paciente,
      servicio: nuevaCita.servicio,
      estado: 'Pendiente',
    };

    setCitas([...citas, nueva]);

    setNuevaCita({
      paciente: '',
      servicio: '',
      fecha: '',
      horaInicio: '',
      horaFin: '',
    });
  };

  const stats = {
    hoy: citas.filter(c => format(c.start, 'yyyy-MM-dd') === format(fechaActual, 'yyyy-MM-dd')).length,
    pendientes: citas.filter(c => c.estado === 'Pendiente').length,
    confirmadas: citas.filter(c => c.estado === 'Confirmada').length,
    completadas: citas.filter(c => c.estado === 'Completada').length,
  };

  const citasDelDia = citas.filter(c =>
    format(c.start, 'yyyy-MM-dd') === format(fechaActual, 'yyyy-MM-dd')
  );

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: '#16a34a',
      borderRadius: '8px',
      color: 'white',
      border: 'none',
    },
  });

  return (
    <div className="container">
      <h1>Agenda Médica</h1>

      <div className="top-row">

        {/* 📅 CALENDARIO */}
        <div className="calendar">
          <Calendar
            localizer={localizer}
            events={citas}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            eventPropGetter={eventStyleGetter}
            style={{ height: 600 }}

            date={fechaActual}
            onNavigate={(date) => setFechaActual(date)}

            defaultView="month"
            views={['month', 'week', 'day']}

            messages={{
              next: "Siguiente",
              previous: "Anterior",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              agenda: "Agenda",
            }}
            culture="es"
          />
        </div>

        {/* 📝 FORMULARIO */}
        <div className="formulario">
          <h3>Nueva Cita</h3>

          <form onSubmit={agregarCita}>
            <input
              type="text"
              placeholder="Paciente"
              value={nuevaCita.paciente}
              onChange={(e) => setNuevaCita({...nuevaCita, paciente: e.target.value})}
              required
            />

            <select
              value={nuevaCita.servicio}
              onChange={(e) => setNuevaCita({...nuevaCita, servicio: e.target.value})}
              required
            >
              <option value="">Servicio</option>
              <option>Consulta médica</option>
              <option>Control de salud</option>
              <option>Chequeo</option>
            </select>

            <input
              type="date"
              value={nuevaCita.fecha}
              min={format(new Date(), 'yyyy-MM-dd')}
              readOnly
            />

            {/* 🔥 HORARIOS FIJOS */}
            <select
              value={nuevaCita.horaInicio}
              onChange={(e) => {
                const inicio = e.target.value;

                const [h, m] = inicio.split(':');
                const temp = new Date();
                temp.setHours(parseInt(h), parseInt(m));

                const fin = addMinutes(temp, 35);

                setNuevaCita({
                  ...nuevaCita,
                  horaInicio: inicio,
                  horaFin: format(fin, 'HH:mm'),
                });
              }}
              required
            >
              <option value="">Seleccionar hora</option>
              {HORARIOS.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            <input type="time" value={nuevaCita.horaFin} readOnly />

            <div className="form-buttons">
              <button type="submit">Agendar</button>
              <button type="button" onClick={() =>
                setNuevaCita({ paciente:'', servicio:'', fecha:'', horaInicio:'', horaFin:'' })
              }>
                Limpiar
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* 📊 ESTADÍSTICAS */}
      <div className="bottom-cards">

        <div className="card">
          <h3>Estadísticas</h3>
          <p>Citas hoy <span>{stats.hoy}</span></p>
          <p>Pendientes <span>{stats.pendientes}</span></p>
          <p>Confirmadas <span>{stats.confirmadas}</span></p>
          <p>Completadas <span>{stats.completadas}</span></p>
        </div>

        <div className="card">
          <h3>Citas del día</h3>
          {citasDelDia.length === 0 ? (
            <p>No hay citas</p>
          ) : (
            citasDelDia.map(cita => (
              <div key={cita.id}>
                <strong>{cita.paciente}</strong>
                <p>{cita.servicio}</p>
                <small>{format(cita.start, 'HH:mm')} - {format(cita.end, 'HH:mm')}</small>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default CrearCitaDoctor;