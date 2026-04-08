import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMinutes } from 'date-fns';
import { es } from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './crearcita.css';

const locales = { 'es': es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// 🔥 HORARIOS FIJOS
const HORARIOS = [
  "08:00",
  "08:45",
  "09:30",
  "10:15",
  "11:00",
  "11:45",
  "12:30"
];

interface Cita {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

const CrearCitaPaciente: React.FC = () => {

  const [citas, setCitas] = useState<Cita[]>([]);
  const [fechaActual, setFechaActual] = useState(new Date());

  const [nuevaCita, setNuevaCita] = useState({
    paciente: '',
    servicio: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
  });

  // 🔥 CLICK EN CALENDARIO
  const handleSelectSlot = ({ start }: { start: Date; end: Date }) => {
    const inicio = new Date(start);

    const dia = inicio.getDay();
    if (dia === 0 || dia === 6) {
      alert("No se puede agendar fines de semana");
      return;
    }

    setNuevaCita({
      ...nuevaCita,
      fecha: format(inicio, 'yyyy-MM-dd'),
    });
  };

  const agregarCita = (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(`${nuevaCita.fecha}T${nuevaCita.horaInicio}`);
    const end = addMinutes(start, 35);

    const ahora = new Date();

    // 🚫 pasado
    if (start < ahora) {
      alert("No puedes agendar en el pasado");
      return;
    }

    // 🚫 fines de semana
    const dia = start.getDay();
    if (dia === 0 || dia === 6) {
      alert("Solo lunes a viernes");
      return;
    }

    // 🚫 validar horario fijo
    if (!HORARIOS.includes(nuevaCita.horaInicio)) {
      alert("Selecciona un horario válido");
      return;
    }

    // 🚫 EVITAR CHOQUES
    const existe = citas.find(cita => {
  return (
    format(cita.start, 'yyyy-MM-dd') === nuevaCita.fecha &&
    format(cita.start, 'HH:mm') === nuevaCita.horaInicio
  );
});

if (existe) {
  alert(
    `⚠️ Ya existe una cita en ese horario (${format(existe.start, 'HH:mm')}).
Por favor selecciona otro turno disponible.`
  );
  return;
}

    const nueva: Cita = {
      id: Date.now().toString(),
      title: `${nuevaCita.servicio}`,
      start,
      end,
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
      <h1>Agendar Cita</h1>

      <div className="layout">

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
              placeholder="Nombre"
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

            {/* 🔥 SELECT DE HORAS FIJAS */}
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
              <option value="">Seleccionar hora inicio</option>
              {HORARIOS.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            <input type="time" value={nuevaCita.horaFin} readOnly />

            <button type="submit">Agendar</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CrearCitaPaciente;