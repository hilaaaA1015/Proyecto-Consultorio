import React from "react";
import { Link } from "react-router-dom";
import "./header.css";


export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__left">
        <img
          src="/imagenes/logo_regina.png"
          alt="Logo consultorio"
          className="header__logo"
        />
        <span className="header__title">Consultorio Médico General</span>
      </Link>

      {/* MENÚ */}
      <nav className="header__nav">
        <Link to="/about">Acerca de nosotros</Link>
        <div className="header__dropdown">
          <button className="dropdown__btn">Servicios ▾</button>
          <div className="dropdown__menu">
            <Link to="/login">Consulta General</Link>
            <Link to="/login">Exámenes Médicos</Link>
          </div>
        </div>


        <Link to="/contactos">Contactos</Link>
      </nav>

      {/* BOTÓN */}
      <Link to="/login" className="header__loginBtn">
        Iniciar Sesión
      </Link>
    </header>
  );
}
