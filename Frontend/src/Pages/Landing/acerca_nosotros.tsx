import React from "react";
import "./acerca_nosotros.css";
import Footer from "../../Components/Footer/footer";

export default function AcercaNosotros(){
    return(
       <>
       <div className="acerca-container">

      <section className="acerca-hero">
        <h1>Acerca de Nuestro Consultorio</h1>
        <p>
          Nos dedicamos a brindar atención médica integral, humana y de calidad.
          Nuestro compromiso es cuidar tu salud y la de tu familia con
          profesionalismo, confianza y cercanía.
        </p>
      </section>

      <section className="acerca-info">
        <div className="acerca-card">
          <h2>Nuestra Misión</h2>
          <p>
            Ofrecer servicios médicos accesibles y de calidad, priorizando el
            bienestar de nuestros pacientes mediante diagnósticos oportunos,
            tratamientos efectivos y una atención humana.
          </p>
        </div>

        <div className="acerca-card">
          <h2>Nuestra Visión</h2>
          <p>
            Ser un consultorio médico reconocido por su compromiso con la salud
            de la comunidad, destacando por la confianza, profesionalismo y
            excelencia en la atención.
          </p>
        </div>

        <div className="acerca-card">
          <h2>Nuestros Valores</h2>
          <ul>
            <li>Atención humana y respetuosa</li>
            <li>Compromiso con la salud del paciente</li>
            <li>Profesionalismo y ética médica</li>
            <li>Responsabilidad y confianza</li>
          </ul>
        </div>
      </section>

      <section className="acerca-stats">
        <div className="stat">
          <h3>+15</h3>
          <p>Años de experiencia</p>
        </div>

        <div className="stat">
          <h3>+10,000</h3>
          <p>Pacientes atendidos</p>
        </div>

        <div className="stat">
          <h3>100%</h3>
          <p>Compromiso con tu salud</p>
        </div>
      </section>

      <section className="acerca-extra">
        <h2>Comprometidos con tu bienestar</h2>
        <p>
          Creemos en la importancia de la medicina preventiva y en la relación
          cercana entre médico y paciente. Nuestro objetivo es acompañarte en
          cada etapa de tu salud, brindando confianza, orientación y
          tratamientos adecuados para mejorar tu calidad de vida.
        </p>
      </section>
      
    </div>
    <Footer/>
    </>
    )
}