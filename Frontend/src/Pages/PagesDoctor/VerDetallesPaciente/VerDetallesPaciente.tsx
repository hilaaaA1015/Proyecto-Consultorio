import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./VerDetallesPaciente.css";

// Interfaz temporal mientras no hay backend
interface PacienteCompleto {
  id_usuario: number;
  nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  nacimiento: string;
  sexo: string;
  telefono: string;
  correo: string;
  tipo_sangre: string;
  estatura_cm: number;
  peso_kg: number;
  imc: number;
  presion_arterial: string;
  frecuencia_cardiaca: number;
  frecuencia_respiratoria: number;
  temperatura: number;
  saturacion_oxigeno: number;
  observaciones_generales: string;
}

export const PacienteDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Estados para la edición de observaciones
  const [isEditing, setIsEditing] = useState(false);
  const [observaciones, setObservaciones] = useState(
    "Paciente con historial de hipertensión leve en la familia. Realiza ejercicio ocasional."
  );

  const handleSave = () => {
    // Aquí es donde en el futuro harías el fetch(PATCH) a tu backend de Node.js/Prisma
    console.log("Guardando en la DB:", observaciones);
    setIsEditing(false);
  };

  const handleSaveVitals = () => {
  console.log("Guardando signos vitales:", vitals);

  // Aquí luego haces el PATCH al backend

  setIsEditingVitals(false);
};

  // Datos de ejemplo
  const paciente: PacienteCompleto = {
    id_usuario: Number(id),
    nombre: "Juan",
    segundo_nombre: "Alberto",
    primer_apellido: "Pérez",
    segundo_apellido: "Rodríguez",
    nacimiento: "1990-05-15",
    sexo: "M",
    telefono: "+505 8888-8888",
    correo: "juan.perez@email.com",
    tipo_sangre: "O+",
    estatura_cm: 175,
    peso_kg: 80,
    imc: 26.12,
    presion_arterial: "120/80",
    frecuencia_cardiaca: 72,
    frecuencia_respiratoria: 18,
    temperatura: 36.6,
    saturacion_oxigeno: 98,
    observaciones_generales: "Paciente con historial de hipertensión leve en la familia. Realiza ejercicio ocasional."
  };

  // Mock de archivos subidos
  const archivos = [
    { id: 1, nombre: "Radiografia_Torax.pdf", fecha: "2023-10-01", tipo: "PDF" },
    { id: 2, nombre: "Examen_Sangre_Completo.pdf", fecha: "2023-09-15", tipo: "PDF" },
    { id: 3, nombre: "Receta_Anterior.jpg", fecha: "2023-08-20", tipo: "Imagen" },
  ];

  const [isEditingVitals, setIsEditingVitals] = useState(false);

const [vitals, setVitals] = useState({
  peso_kg: paciente?.peso_kg || 80,
  estatura_cm: paciente?.estatura_cm || 175,
  imc: paciente?.imc || 26.12,
  presion_arterial: paciente?.presion_arterial || "120/80",
  frecuencia_cardiaca: paciente?.frecuencia_cardiaca || 72,
  temperatura: paciente?.temperatura || 36.6,
  saturacion_oxigeno: paciente?.saturacion_oxigeno || 98,
});

  return (
    <div className="detail-container">
      <button className="btn-back" onClick={() => navigate(`/verlistapacientes`)}>
        ← Volver al Listado
      </button>

      <div className="main-grid">
        {/* COLUMNA IZQUIERDA: Información Personal y Clínica */}
        <div className="info-column">
          <div className="card">
            <div className="card-header">
              <h2>Información Personal</h2>
              <span className="badge">ID: {paciente.id_usuario}</span>
            </div>
            <div className="info-grid">
              <div className="info-item"><span>Nombre:</span> {paciente.nombre} {paciente.segundo_nombre} {paciente.primer_apellido} {paciente.segundo_apellido}</div>
              <div className="info-item"><span>F. Nacimiento:</span> {paciente.nacimiento}</div>
              <div className="info-item"><span>Sexo:</span> {paciente.sexo === 'M' ? 'Masculino' : 'Femenino'}</div>
              <div className="info-item"><span>Teléfono:</span> {paciente.telefono}</div>
              <div className="info-item"><span>Correo:</span> {paciente.correo}</div>
              <div className="info-item"><span>Tipo de Sangre:</span> <strong style={{ color: '#d9534f' }}>{paciente.tipo_sangre}</strong></div>
            </div>
          </div>

          <div className="card">
  <div className="card-header">
    <h2>Datos Antropométricos y Signos Vitales</h2>

    {!isEditingVitals ? (
      <button
        className="btn-edit-inline"
        onClick={() => setIsEditingVitals(true)}
      >
        ✏️ Editar
      </button>
    ) : (
      <button
        className="btn-save-inline"
        onClick={handleSaveVitals}
      >
        💾 Guardar
      </button>
    )}
  </div>

  <div className="vitals-grid">

    <div className="vital-box">
      <p className="vital-label">Peso</p>

      {isEditingVitals ? (
        <input
          type="number"
          value={vitals.peso_kg}
          onChange={(e) =>
            setVitals({
              ...vitals,
              peso_kg: Number(e.target.value),
            })
          }
        />
      ) : (
        <p className="vital-val">{vitals.peso_kg} kg</p>
      )}
    </div>

    <div className="vital-box">
      <p className="vital-label">Talla</p>

      {isEditingVitals ? (
        <input
          type="number"
          value={vitals.estatura_cm}
          onChange={(e) =>
            setVitals({
              ...vitals,
              estatura_cm: Number(e.target.value),
            })
          }
        />
      ) : (
        <p className="vital-val">{vitals.estatura_cm} cm</p>
      )}
    </div>

    <div className="vital-box highlight">
      <p className="vital-label">IMC</p>

      {isEditingVitals ? (
        <input
          type="number"
          step="0.01"
          value={vitals.imc}
          onChange={(e) =>
            setVitals({
              ...vitals,
              imc: Number(e.target.value),
            })
          }
        />
      ) : (
        <p className="vital-val">{vitals.imc}</p>
      )}
    </div>

    <div className="vital-box">
      <p className="vital-label">P. Arterial</p>

      {isEditingVitals ? (
        <input
          type="text"
          value={vitals.presion_arterial}
          onChange={(e) =>
            setVitals({
              ...vitals,
              presion_arterial: e.target.value,
            })
          }
        />
      ) : (
        <p className="vital-val">{vitals.presion_arterial}</p>
      )}
    </div>

    <div className="vital-box">
      <p className="vital-label">F. Cardiaca</p>

      {isEditingVitals ? (
        <input
          type="number"
          value={vitals.frecuencia_cardiaca}
          onChange={(e) =>
            setVitals({
              ...vitals,
              frecuencia_cardiaca: Number(e.target.value),
            })
          }
        />
      ) : (
        <p className="vital-val">
          {vitals.frecuencia_cardiaca} lpm
        </p>
      )}
    </div>

    <div className="vital-box">
      <p className="vital-label">Temp.</p>

      {isEditingVitals ? (
        <input
          type="number"
          step="0.1"
          value={vitals.temperatura}
          onChange={(e) =>
            setVitals({
              ...vitals,
              temperatura: Number(e.target.value),
            })
          }
        />
      ) : (
        <p className="vital-val">{vitals.temperatura}°C</p>
      )}
    </div>

    <div className="vital-box">
      <p className="vital-label">SPO2</p>

      {isEditingVitals ? (
        <input
          type="number"
          value={vitals.saturacion_oxigeno}
          onChange={(e) =>
            setVitals({
              ...vitals,
              saturacion_oxigeno: Number(e.target.value),
            })
          }
        />
      ) : (
        <p className="vital-val">
          {vitals.saturacion_oxigeno}%
        </p>
      )}
    </div>

  </div>
</div>
        </div>

        {/* SECCIÓN DE OBSERVACIONES */}
        <div className="card">
          <div className="card-header">
            <h2>Observaciones Generales</h2>
            {!isEditing ? (
              <button className="btn-edit-inline" onClick={() => setIsEditing(true)}>
                <span>✏️</span> Editar
              </button>
            ) : (
              <button className="btn-save-inline" onClick={handleSave}>
                <span>💾</span> Guardar
              </button>
            )}
          </div>

          {isEditing ? (
            <textarea
              className="edit-observations-area"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={5}
              autoFocus
            />
          ) : (
            <p className="obs-text">{observaciones}</p>
          )}
        </div>

        {/* Archivos y Expediente */}
        <div className="files-column">
          <div className="card">
            <div className="card-header">
              <h2>Archivos y Documentos</h2>
              {/* <button className="btn-upload">+ Subir</button> */}
            </div>
            <div className="files-list">
              {archivos.map(archivo => (
                <div key={archivo.id} className="file-item">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <p className="file-name">{archivo.nombre}</p>
                    <p className="file-date">{archivo.fecha} • {archivo.tipo}</p>
                  </div>
                  <button className="btn-view">Ver</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};