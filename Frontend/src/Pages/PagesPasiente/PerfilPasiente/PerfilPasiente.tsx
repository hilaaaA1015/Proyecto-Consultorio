import React from "react";
import "./PerfilPasiente.css";

export default function PerfilPasiente() {
  return (
    <div className="patient-profile-page">

      <section className="profile-hero">
        <div className="profile-hero-icon">
          <span>♙</span>
        </div>

        <h1>Mi Perfil</h1>
        <p>Consulta y actualiza tu información personal y médica.</p>
      </section>

      <section className="profile-summary">
        <div className="profile-summary-card">
          <div className="summary-circle">
            <span>♙</span>
          </div>

          <div>
            <h3>Datos personales</h3>
            <p>Información básica y de contacto</p>
          </div>

          <span className="summary-arrow">›</span>
        </div>

        <div className="profile-summary-card">
          <div className="summary-circle">
            <span>⌁</span>
          </div>

          <div>
            <h3>Información médica</h3>
            <p>Datos clínicos y antecedentes</p>
          </div>

          <span className="summary-arrow">›</span>
        </div>

        <div className="profile-summary-card">
          <div className="summary-circle">
            <span>☎</span>
          </div>

          <div>
            <h3>Contacto de emergencia</h3>
            <p>Información de contacto</p>
          </div>

          <span className="summary-arrow">›</span>
        </div>
      </section>

      <section className="profile-main-layout">

        <aside className="patient-info-card">
          <div className="patient-avatar">
            MR
          </div>

          <h2>Marcos Rivas</h2>
          <p className="patient-role">Paciente registrado</p>

          <div className="patient-status">
            <span></span>
            Activo
          </div>

          <div className="patient-divider"></div>

          <div className="patient-info-list">

            <div className="patient-info-item">
              <div className="info-icon">✉</div>
              <div>
                <span>Correo</span>
                <strong>marcos@email.com</strong>
              </div>
            </div>

            <div className="patient-info-item">
              <div className="info-icon">☎</div>
              <div>
                <span>Teléfono</span>
                <strong>8888-8888</strong>
              </div>
            </div>

            <div className="patient-info-item">
              <div className="info-icon">◌</div>
              <div>
                <span>Tipo de sangre</span>
                <strong>O+</strong>
              </div>
            </div>

            <div className="patient-info-item">
              <div className="info-icon">♙</div>
              <div>
                <span>Sexo</span>
                <strong>Masculino</strong>
              </div>
            </div>

          </div>

          <button type="button" className="password-button">
            🔒 Cambiar contraseña
          </button>
        </aside>

        <div className="profile-forms-area">

          <section className="profile-form-card">
            <div className="form-section-title">
              <div className="title-icon">♙</div>
              <h2>Información Personal</h2>
            </div>

            <div className="profile-form-grid">

              <div className="profile-field">
                <label>Primer Nombre</label>
                <input type="text" defaultValue="Marcos" />
              </div>

              <div className="profile-field">
                <label>Segundo Nombre</label>
                <input type="text" placeholder="Segundo nombre" />
              </div>

              <div className="profile-field">
                <label>Primer Apellido</label>
                <input type="text" defaultValue="Rivas" />
              </div>

              <div className="profile-field">
                <label>Segundo Apellido</label>
                <input type="text" placeholder="Segundo apellido" />
              </div>

              <div className="profile-field">
                <label>Correo Electrónico</label>
                <input type="email" defaultValue="marcos@email.com" />
              </div>

              <div className="profile-field">
                <label>Teléfono</label>
                <input type="text" defaultValue="8888-8888" />
              </div>

              <div className="profile-field">
                <label>Fecha de Nacimiento</label>
                <input type="date" />
              </div>

              <div className="profile-field">
                <label>Sexo</label>
                <select defaultValue="Masculino">
                  <option>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>

            </div>
          </section>

          <section className="profile-form-card medical-card">
            <div className="form-section-title">
              <div className="title-icon">✚</div>
              <h2>Información Médica</h2>
            </div>

            <div className="profile-form-grid">

              <div className="profile-field">
                <label>Tipo de Sangre</label>
                <select defaultValue="O+">
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="profile-field">
                <label>Alergias</label>
                <input type="text" defaultValue="Ninguna" />
              </div>

              <div className="profile-field">
                <label>Enfermedades Crónicas</label>
                <input
                  type="text"
                  placeholder="Ejemplo: Asma, diabetes, hipertensión"
                />
              </div>

              <div className="profile-field">
                <label>Contacto de Emergencia</label>
                <input
                  type="text"
                  placeholder="Nombre y teléfono"
                />
              </div>

              <div className="profile-field">
                <label>Medicamentos Actuales</label>
                <input
                  type="text"
                  placeholder="Lista de medicamentos que consumes actualmente"
                />
              </div>

              <div className="profile-field">
                <label>Observaciones Médicas</label>
                <input
                  type="text"
                  placeholder="Información adicional relevante para tu atención"
                />
              </div>

            </div>
          </section>

          <div className="profile-actions">
            <button type="button" className="cancel-button">
              Cancelar
            </button>

            <button type="button" className="save-button">
              💾 Guardar Cambios
            </button>
          </div>

          <div className="profile-note">
            <div className="note-circle">i</div>
            <p>
              Tu información está segura y es utilizada únicamente para mejorar tu atención médica.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}