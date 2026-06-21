import React from "react";
import "./hero.css";

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

          <button className="primary-btn">Agendar cita →</button>
        </div>

       
      </section>

      {/* SERVICIOS */}
      <section>
        <h2>Nuestros servicios</h2>

        <div className="services-grid">
          <div className="service-card">
            <span className="icon">🩺</span>
            <h3>Consulta médica</h3>
            <p>Diagnóstico y tratamiento para diferentes condiciones.</p>
          </div>

          <div className="service-card">
            <span className="icon">📋</span>
            <h3>Control de salud</h3>
            <p>Seguimiento médico para tu bienestar.</p>
          </div>

          <div className="service-card">
            <span className="icon">💊</span>
            <h3>Orientación médica</h3>
            <p>Recomendaciones profesionales.</p>
          </div>
        </div>
      </section>

      {/* CONDICIONES */}
      <section>
        <h2>Podemos ayudarte si presentas</h2>

        <p className="conditions-sub">
          Evaluamos y tratamos problemas de salud comunes.
        </p>

        <div className="slider">
  <div className="slide-track">

    <div className="condition-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
    alt="Fiebre"
  />

  <h3>Fiebre o gripe</h3>

  <p>Tratamiento para infecciones respiratorias.</p>
</div>

<div className="condition-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
    alt="Dolor de cabeza"
  />

  <h3>Dolor de cabeza</h3>

  <p>Evaluación médica.</p>
</div>

<div className="condition-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
    alt="Alergias"
  />

  <h3>Alergias</h3>

  <p>Tratamiento para alergias.</p>
</div>

<div className="condition-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
    alt="Chequeos"
  />

  <h3>Chequeos preventivos</h3>

  <p>Consultas preventivas.</p>
</div>

    {/* duplicados para loop infinito */}
    <div className="condition-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
    alt="Fiebre"
  />

  <h3>Fiebre o gripe</h3>

  <p>Tratamiento para infecciones respiratorias.</p>
</div>

<div className="condition-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
    alt="Dolor de cabeza"
  />

  <h3>Dolor de cabeza</h3>

  <p>Evaluación médica.</p>
</div>

<div className="condition-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/4320/4320337.png"
    alt="Alergias"
  />

  <h3>Alergias</h3>

  <p>Tratamiento para alergias.</p>
</div>

<div className="condition-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
    alt="Chequeos"
  />

  <h3>Chequeos preventivos</h3>

  <p>Consultas preventivas.</p>
</div>

  </div>
</div>
      </section>

      {/* PASOS */}
      <section>
        <h2>¿Cómo agendar tu cita?</h2>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Crear cuenta</h3>
            <p>Regístrate.</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Elegir horario</h3>
            <p>Selecciona fecha.</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Confirmar</h3>
            <p>Listo.</p>
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section>
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
      <section>
        <h2>Opiniones</h2>

        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"Muy fácil de usar y excelente atención."</p>
            <span>- María López</span>
          </div>

          <div className="testimonial">
            <p>"Muy profesionales."</p>
            <span>- José Ramírez</span>
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section>
        <h2>Ubicación</h2>

        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.1272599661762!2d-86.29905376297117!3d12.145707705677776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f71579c24023e45%3A0x60492df4920b1055!2sClinica%20m%C3%A9dica%20y%20laborator%C3%ADo!5e0!3m2!1ses-419!2sni!4v1773380601346!5m2!1ses-419!2sni"
          width="100%"
          height="350"
        ></iframe>
      </section>

    </div>
  );
}