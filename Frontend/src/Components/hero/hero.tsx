import React from "react";
import "./hero.css";
// import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div className="landing">

      {/* HERO */}
      <section className="hero">

        <div className="hero-left">
          <h1>Atención médica confiable para ti y tu familia</h1>

          <p>
            Agenda tu consulta médica general de forma rápida y sencilla.
            Nuestro equipo está listo para ayudarte a cuidar tu salud.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Agendar cita</button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c"
            alt="doctor"
          />
        </div>

      </section>

      {/* SERVICIOS */}
      <section className="services">

        <h2>Nuestros servicios</h2>

        <div className="services-grid">

          <div className="service-card">
            <span className="icon">🩺</span>
            <h3>Consulta médica</h3>
            <p>
              Diagnóstico y tratamiento para diferentes condiciones de salud.
            </p>
          </div>

          <div className="service-card">
            <span className="icon">📋</span>
            <h3>Control de salud</h3>
            <p>
              Seguimiento médico para mantener tu bienestar y prevenir enfermedades.
            </p>
          </div>

          <div className="service-card">
            <span className="icon">💊</span>
            <h3>Orientación médica</h3>
            <p>
              Recomendaciones profesionales para mejorar tu calidad de vida.
            </p>
          </div>

        </div>

      </section>

        {/* Valor */}
        <section className="conditions">

  <h2>Podemos ayudarte si presentas</h2>

  <p className="conditions-sub">
    Nuestro consultorio ofrece atención médica para evaluar, diagnosticar
    y tratar diferentes problemas de salud comunes.
  </p>

  <div className="conditions-grid">

    <div className="condition-card">
      <h3>🤒 Fiebre o gripe</h3>
      <p>
        Diagnóstico y tratamiento para infecciones respiratorias,
        resfriados y síntomas gripales.
      </p>
    </div>

    <div className="condition-card">
      <h3>🤕 Dolor de cabeza</h3>
      <p>
        Evaluación médica para identificar la causa y brindarte el
        tratamiento adecuado.
      </p>
    </div>

    <div className="condition-card">
      <h3>🤧 Alergias</h3>
      <p>
        Tratamiento para alergias estacionales, irritaciones y
        problemas respiratorios.
      </p>
    </div>

    <div className="condition-card">
      <h3>🩺 Chequeos médicos</h3>
      <p>
        Consultas preventivas para cuidar tu salud y detectar
        problemas a tiempo.
      </p>
    </div>

  </div>

</section>

      {/* COMO FUNCIONA */}

      <section className="how">

        <h2>¿Cómo agendar tu cita?</h2>

        <div className="steps">

          <div className="step">
            <div className="step-number">1</div>
            <h3>Crear cuenta</h3>
            <p>Regístrate en nuestra plataforma.</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Seleccionar horario</h3>
            <p>Elige el día y la hora disponible.</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Confirmar cita</h3>
            <p>Recibe tu consulta médica.</p>
          </div>

        </div>

      </section>

      {/* DOCTORES */}

      <section className="doctors">

        <h2>Nuestro equipo médico</h2>

        <div className="doctor-grid">

          <div className="doctor-card">
            <img src="/Imagenes/doctorImagen_2-removebg-preview.png" alt="" />
            <h3>Dr. Henry Hernandez</h3>
            <p>Médico General</p>
          </div>

        </div>

      </section>

      {/* TESTIMONIOS */}

      <section className="testimonials">

        <h2>Opiniones de nuestros pacientes</h2>

        <div className="testimonial-grid">

          <div className="testimonial">
            <p>
              "El sistema para agendar citas es muy fácil de usar y la atención fue excelente."
            </p>
            <span>- María López</span>
          </div>

          <div className="testimonial">
            <p>
              "Muy profesionales y el doctor explicó todo con mucha claridad."
            </p>
            <span>- José Ramírez</span>
          </div>

        </div>

      </section>

      {/* UBICACION */}

      <section className="location">

        <h2>Nuestra ubicación</h2>

        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.1272599661762!2d-86.29905376297117!3d12.145707705677776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f71579c24023e45%3A0x60492df4920b1055!2sClinica%20m%C3%A9dica%20y%20laborator%C3%ADo!5e0!3m2!1ses-419!2sni!4v1773380601346!5m2!1ses-419!2sni"
          width="100%"
          height="350"
          style={{ border: 0 }}
        ></iframe>

      </section>

      {/* CONTACTO */}
        
      
      {/* FOOTER */}

      {/* <footer className="footer">

        <div className="footer-top">

          <div>
            <h3>Consultorio Medico</h3>
            <h3>General Regina</h3>
            <p>Atención médica general confiable.</p>
          </div>

          <div>
            <h4>Horario</h4>
            <p>Lunes - Viernes</p>
            <p>8:00 AM - 1:00 PM</p>
          </div>

          <div>
            <h4>Contactos</h4>
            <p>+505 8390-0983</p>
            <p>consultoriomedicoregina20@gmail.com</p>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Clínica Salud+. Todos los derechos reservados.
        </div>

      </footer> */}

    </div>
  );
}