import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilDoctor.css';

interface DoctorProfile {
  nomperfil: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  correo: string;
}

export const PerfilDoctor = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<DoctorProfile>({
    nomperfil: '',
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    correo: '',
  });

  const [originalData, setOriginalData] = useState<DoctorProfile>({
    nomperfil: '',
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    correo: '',
  });

  // 🔐 Validar sesión y cargar perfil
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    cargarPerfil();
  }, [navigate]);

  const cargarPerfil = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:4000/api/doctorperfil/perfil',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }

      // 👇 IMPORTANTE
      setFormData(data.user || data);
      setOriginalData(data.user || data);

    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:4000/api/doctorperfil/perfil',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setOriginalData(formData);
      setIsEditing(false);

      alert('Perfil actualizado correctamente');

    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Error al actualizar perfil');
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-dashboard">
        <div className="card">
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-dashboard">

      {/* SIDEBAR */}
      <aside className="profile-sidebar">

        <div className="card avatar-card">

          <div className="profile-avatar-big">
            {formData.nombre?.charAt(0)}
            {formData.apellido?.charAt(0)}
          </div>

          <h2>
            Dr. {formData.nombre} {formData.apellido}
          </h2>

          <p className="specialty-label">
            {formData.especialidad || 'Sin especialidad'}
          </p>

          <div className="sidebar-actions">

            {!isEditing ? (
              <button
                className="btn-primary-alt"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </button>
            ) : (
              <>
                <button
                  className="btn-save"
                  onClick={handleSave}
                >
                  Guardar
                </button>

                <button
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </>
            )}

          </div>
        </div>

        <div className="card security-card">
          <h3>Seguridad</h3>

          <p className="security-text">
            Gestione el acceso a su cuenta de usuario.
          </p>

          <button
            className="btn-password-link"
            onClick={() => navigate('/cambiar-password')}
          >
            Cambiar Contraseña
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <main className="profile-main-content">

        {/* CREDENCIALES */}
        <section className="card form-section">

          <div className="section-header">
            <span className="icon">🔑</span>
            <h3>Credenciales de Acceso</h3>
          </div>

          <div className="input-row">

            <div className="input-group">
              <label>Nombre de Usuario</label>

              <input
                type="text"
                name="nomperfil"
                value={formData.nomperfil}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="input-group">
              <label>Correo Institucional</label>

              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

          </div>

        </section>

        {/* DATOS PROFESIONALES */}
        <section className="card form-section">

          <div className="section-header">
            <span className="icon">👨‍⚕️</span>
            <h3>Detalles Profesionales</h3>
          </div>

          <div className="input-grid">

            <div className="input-group">
              <label>Nombre(s)</label>

              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="input-group">
              <label>Apellido(s)</label>

              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="input-group">
              <label>Especialidad Médica</label>

              <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="input-group">
              <label>Teléfono de Contacto</label>

              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

          </div>

        </section>

      </main>
    </div>
  );
};