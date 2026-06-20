import React from "react";
import "./ExpedientePasiente.css";

const documentos = [
  {
    nombre: "Hemograma Completo.pdf",
    tipo: "PDF",
    fecha: "15/06/2026",
    categoria: "Examen de laboratorio",
    estado: "Revisado",
  },
  {
    nombre: "Radiografia_Torax.jpg",
    tipo: "Imagen",
    fecha: "10/06/2026",
    categoria: "Imagen médica",
    estado: "Pendiente",
  },
  {
    nombre: "Receta_Medica.pdf",
    tipo: "PDF",
    fecha: "01/06/2026",
    categoria: "Receta",
    estado: "Revisado",
  },
];

export default function ExpedientePasiente() {
  return (
    <div className="record-container">
      <section className="record-header">
        <h1>Mi Expediente Médico</h1>
        <p>
          Consulta, organiza y sube tus documentos médicos como exámenes,
          recetas, imágenes y archivos PDF.
        </p>
      </section>

      <section className="record-stats">
        <div className="record-stat-card">
          <h2>12</h2>
          <span>Documentos</span>
        </div>

        <div className="record-stat-card">
          <h2>5</h2>
          <span>Exámenes</span>
        </div>

        <div className="record-stat-card">
          <h2>3</h2>
          <span>Recetas</span>
        </div>

        <div className="record-stat-card">
          <h2>4</h2>
          <span>Imágenes</span>
        </div>
      </section>

      <div className="record-layout">
        <section className="upload-card">
          <h2>Subir nuevo documento</h2>
          <p>
            Puedes adjuntar archivos relacionados con tu historial médico.
          </p>

          <div className="upload-area">
            <div className="upload-icon">↑</div>

            <h3>Selecciona un archivo</h3>

            <p>
              Formatos permitidos: PDF, JPG, JPEG y PNG
            </p>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          <div className="upload-form">
            <label>Nombre del documento</label>
            <input
              type="text"
              placeholder="Ejemplo: Examen de sangre"
            />

            <label>Categoría</label>
            <select>
              <option>Seleccione una categoría</option>
              <option>Examen de laboratorio</option>
              <option>Imagen médica</option>
              <option>Receta</option>
              <option>Otro documento</option>
            </select>

            <button type="button">
              Guardar Documento
            </button>
          </div>
        </section>

        <section className="documents-card">
          <div className="documents-header">
            <div>
              <h2>Historial de documentos</h2>
              <p>Archivos médicos registrados en tu expediente.</p>
            </div>
          </div>

          <div className="documents-table">
            <table>
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Categoría</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {documentos.map((documento, index) => (
                  <tr key={index}>
                    <td>{documento.nombre}</td>
                    <td>{documento.categoria}</td>
                    <td>{documento.tipo}</td>
                    <td>{documento.fecha}</td>
                    <td>
                      <span
                        className={
                          documento.estado === "Revisado"
                            ? "status reviewed"
                            : "status pending"
                        }
                      >
                        {documento.estado}
                      </span>
                    </td>
                    <td>
                      <button type="button" className="view-button">
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}