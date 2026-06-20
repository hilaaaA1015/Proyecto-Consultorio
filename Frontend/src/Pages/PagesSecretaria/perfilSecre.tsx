import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./perfilSecre.css";

export const PerfilSecre = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    nomperfil: "secre_001",
    nombre: "María",
    apellido: "García",
    telefono: "+505 8888-0000",
    correo: "secretaria@clinica.com",
    turno: "Mañana",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-dashboard">

      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="card avatar-card">
          <div className="profile-avatar-big">SG</div>
          <h2>{formData.nombre} {formData.apellido}</h2>
          <p className="specialty-label">Secretaría Médica</p>

          <div className="sidebar-actions">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)}>
                Editar Perfil
              </button>
            ) : (
              <>
                <button onClick={() => setIsEditing(false)}>Guardar</button>
                <button onClick={() => setIsEditing(false)}>Cancelar</button>
              </>
            )}
          </div>
        </div>

        <div className="card security-card">
          <h3>Seguridad</h3>
          <button onClick={() => navigate("/cambiar-password")}>
            Cambiar Contraseña
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="profile-main-content">

        <section className="card form-section">
          <h3>Credenciales</h3>

          <input
            name="nomperfil"
            value={formData.nomperfil}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Usuario"
          />

          <input
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Correo"
          />
        </section>

        <section className="card form-section">
          <h3>Datos de Secretaria</h3>

          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Nombre"
          />

          <input
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Apellido"
          />

          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Teléfono"
          />

          <input
            name="turno"
            value={formData.turno}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Turno"
          />
        </section>

      </main>
    </div>
  );
};