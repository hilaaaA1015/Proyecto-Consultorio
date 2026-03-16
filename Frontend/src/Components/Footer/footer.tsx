import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">

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

      </footer>
  );
}