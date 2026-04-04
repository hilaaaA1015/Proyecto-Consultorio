import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilDoctor.css';

export const PerfilDoctor = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    nomperfil: 'dr_martinez_2024',
    nombre: 'Roberto',
    apellido: 'Martínez',
    especialidad: 'Cardiología Clínica',
    telefono: '+505 2222-1234',
    correo: 'roberto.mtz@clinica.com',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-dashboard">
      {/* --- COLUMNA IZQUIERDA: RESUMEN Y SEGURIDAD --- */}
      <aside className="profile-sidebar">
        <div className="card avatar-card">
          <div className="profile-avatar-big">RM</div>
          <h2>Dr. {formData.apellido}</h2>
          <p className="specialty-label">{formData.especialidad}</p>
          
          <div className="sidebar-actions">
            {!isEditing ? (
              <button className="btn-primary-alt" onClick={() => setIsEditing(true)}>Editar Perfil</button>
            ) : (
              <>
                <button className="btn-save" onClick={() => setIsEditing(false)}>Guardar</button>
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancelar</button>
              </>
            )}
          </div>
        </div>

        <div className="card security-card">
          <h3>Seguridad</h3>
          <p className="security-text">Gestione el acceso a su cuenta de usuario.</p>
          <button className="btn-password-link" onClick={() => navigate('/cambiar-password')}>
             Cambiar Contraseña
          </button>
        </div>
      </aside>

      {/* --- COLUMNA DERECHA: FORMULARIOS EN GRID --- */}
      <main className="profile-main-content">
        
        {/* Bloque 1: Cuenta */}
        <section className="card form-section">
          <div className="section-header">
            <span className="icon">🔑</span>
            <h3>Credenciales de Acceso</h3>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Nombre de Usuario</label>
              <input 
                name="nomperfil" 
                value={formData.nomperfil} 
                onChange={handleChange}
                disabled={!isEditing} 
              />
            </div>
            <div className="input-group">
              <label>Correo Institucional</label>
              <input 
                name="correo" 
                value={formData.correo} 
                onChange={handleChange}
                disabled={!isEditing} 
              />
            </div>
          </div>
        </section>

        {/* Bloque 2: Datos Personales */}
        <section className="card form-section">
          <div className="section-header">
            <span className="icon">👨‍⚕️</span>
            <h3>Detalles Profesionales</h3>
          </div>
          <div className="input-grid">
            <div className="input-group">
              <label>Nombre(s)</label>
              <input name="nombre" value={formData.nombre} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="input-group">
              <label>Apellido(s)</label>
              <input name="apellido" value={formData.apellido} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="input-group">
              <label>Especialidad Médica</label>
              <input name="especialidad" value={formData.especialidad} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="input-group">
              <label>Teléfono de Contacto</label>
              <input name="telefono" value={formData.telefono} onChange={handleChange} disabled={!isEditing} />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};