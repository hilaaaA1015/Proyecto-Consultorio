import React from "react";
import "./headerdoctor.css"
import { Link } from "react-router-dom";


export default function HeaderDoctor() {
  return (
    <header className="header">
      {/* LOGO + TÍTULO */}
      <Link to="/homedoctor" className="header__left">
        <img
          src="/imagenes/Regina-04(este_es) 2.png"
          alt="Logo consultorio"
          className="header__logo"
        />
        <span className="header__title">Consultorio Médico General</span>
      </Link>

      {/* MENÚ */}
      <nav className="header__nav">
        <Link to="/ModuleCalendar">Calendario</Link>
        <Link to="/verlistapacientes">Pacientes</Link>
        <Link to="/verperfildoctor"> Mi Perfil</Link>
      </nav>

      {/* BOTÓN */}
      <Link to="/login" className="header__loginBtn">
        Cerrar Sesión
      </Link>
    </header>
  );
}
