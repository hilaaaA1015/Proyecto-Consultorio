import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./VerDetallesPaciente.css";

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

  const [paciente, setPaciente] = useState<PacienteCompleto | null>(null);

  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    obtenerPaciente();
  }, [id]);

  const obtenerPaciente = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:4000/api/listapacientes/${id}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener paciente");
      }

      const data = await response.json();

      setPaciente(data);

      setObservaciones(data.observaciones_generales || "");
    } catch (error) {
      console.error("Error al obtener paciente:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/listapacientes/${id}/observaciones`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            observaciones_generales: observaciones,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar observaciones");
      }

      setPaciente({
        ...paciente!,
        observaciones_generales: observaciones,
      });

      setIsEditing(false);

    } catch (error) {
      console.error("Error al guardar observaciones:", error);
    }
  };

  if (loading) {
    return (
      <div className="detail-container">
        <p>Cargando paciente...</p>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="detail-container">
        <p>Paciente no encontrado</p>
      </div>
    );
  }

  // Mock temporal de archivos
  const archivos = [
    {
      id: 1,
      nombre: "Radiografia_Torax.pdf",
      fecha: "2023-10-01",
      tipo: "PDF"
    },
    {
      id: 2,
      nombre: "Examen_Sangre_Completo.pdf",
      fecha: "2023-09-15",
      tipo: "PDF"
    },
    {
      id: 3,
      nombre: "Receta_Anterior.jpg",
      fecha: "2023-08-20",
      tipo: "Imagen"
    },
  ];

  return (
    <div className="detail-container">

      <button
        className="btn-back"
        onClick={() => navigate(`/verlistapacientes`)}
      >
        ← Volver al Listado
      </button>

      <div className="main-grid">

        {/* COLUMNA IZQUIERDA */}
        <div className="info-column">

          {/* INFORMACIÓN PERSONAL */}
          <div className="card">

            <div className="card-header">
              <h2>Información Personal</h2>

              <span className="badge">
                ID: {paciente.id_usuario}
              </span>
            </div>

            <div className="info-grid">

              <div className="info-item">
                <span>Nombre:</span>{" "}
                {paciente.nombre}{" "}
                {paciente.segundo_nombre}{" "}
                {paciente.primer_apellido}{" "}
                {paciente.segundo_apellido}
              </div>

              <div className="info-item">
                <span>F. Nacimiento:</span>{" "}
                {paciente.nacimiento
                  ? new Date(paciente.nacimiento).toLocaleDateString()
                  : "No registrado"}
              </div>

              <div className="info-item">
                <span>Sexo:</span>{" "}
                {paciente.sexo === 'M'
                  ? 'Masculino'
                  : paciente.sexo === 'F'
                  ? 'Femenino'
                  : 'No registrado'}
              </div>

              <div className="info-item">
                <span>Teléfono:</span>{" "}
                {paciente.telefono || "No registrado"}
              </div>

              <div className="info-item">
                <span>Correo:</span>{" "}
                {paciente.correo || "No registrado"}
              </div>

              <div className="info-item">
                <span>Tipo de Sangre:</span>{" "}

                <strong style={{ color: '#d9534f' }}>
                  {paciente.tipo_sangre || "No registrado"}
                </strong>
              </div>

            </div>
          </div>

          {/* DATOS MÉDICOS */}
          <div className="card">

            <div className="card-header">
              <h2>Datos Antropométricos y Signos Vitales</h2>
            </div>

            <div className="vitals-grid">

              <div className="vital-box">
                <p className="vital-label">Peso / Talla</p>

                <p className="vital-val">
                  {paciente.peso_kg || "--"}kg /{" "}
                  {paciente.estatura_cm || "--"}cm
                </p>
              </div>

              <div className="vital-box highlight">
                <p className="vital-label">IMC</p>

                <p className="vital-val">
                  {paciente.imc || "--"}
                </p>
              </div>

              <div className="vital-box">
                <p className="vital-label">P. Arterial</p>

                <p className="vital-val">
                  {paciente.presion_arterial || "--"}
                </p>
              </div>

              <div className="vital-box">
                <p className="vital-label">F. Cardiaca</p>

                <p className="vital-val">
                  {paciente.frecuencia_cardiaca || "--"} lpm
                </p>
              </div>

              <div className="vital-box">
                <p className="vital-label">F. Respiratoria</p>

                <p className="vital-val">
                  {paciente.frecuencia_respiratoria || "--"} rpm
                </p>
              </div>

              <div className="vital-box">
                <p className="vital-label">Temp.</p>

                <p className="vital-val">
                  {paciente.temperatura || "--"}°C
                </p>
              </div>

              <div className="vital-box">
                <p className="vital-label">SPO2</p>

                <p className="vital-val">
                  {paciente.saturacion_oxigeno || "--"}%
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* OBSERVACIONES */}
        <div className="card">

          <div className="card-header">

            <h2>Observaciones Generales</h2>

            {!isEditing ? (
              <button
                className="btn-edit-inline"
                onClick={() => setIsEditing(true)}
              >
                <span>✏️</span> Editar
              </button>
            ) : (
              <button
                className="btn-save-inline"
                onClick={handleSave}
              >
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
            <p className="obs-text">
              {observaciones || "Sin observaciones"}
            </p>
          )}

        </div>

        {/* ARCHIVOS */}
        <div className="files-column">

          <div className="card">

            <div className="card-header">
              <h2>Archivos y Documentos</h2>
            </div>

            <div className="files-list">

              {archivos.map((archivo) => (

                <div
                  key={archivo.id}
                  className="file-item"
                >

                  <div className="file-icon">
                    📄
                  </div>

                  <div className="file-info">

                    <p className="file-name">
                      {archivo.nombre}
                    </p>

                    <p className="file-date">
                      {archivo.fecha} • {archivo.tipo}
                    </p>

                  </div>

                  <button className="btn-view">
                    Ver
                  </button>

                </div>
              ))}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};