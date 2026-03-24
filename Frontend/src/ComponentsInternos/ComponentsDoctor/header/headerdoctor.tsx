import React from "react";
import "./headerdoctor.css"
import { Link } from "react-router-dom";

export default function HeaderDoctor() {
  return (
    <header className="header">
      {/* LOGO + TÍTULO */}
      <div className="header__left">
        <img
          src="/imagenes/Regina-04(este_es) 2.png"
          alt="Logo consultorio"
          className="header__logo"
        />
        <span className="header__title">Consultorio Médico General</span>
      </div>

      {/* MENÚ */}
      <nav className="header__nav">
        <Link to="/about">Calendario</Link>
        <Link to="/contactos">Pacientes</Link>
        <Link to="/notificaciones"> Mi Perfil</Link>
      </nav>

      {/* BOTÓN */}
      <Link to="/login" className="header__loginBtn">
        Cerrar Sesión
      </Link>
    </header>
  );
}
