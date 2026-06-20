import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./headerpasiente.css";

export default function HeaderPasiente() {
  return (
    <header className="patient-header">

      <Link to="/homepasiente" className="patient-header__brand">
        <img
          src="/imagenes/logo_regina.png"
          alt="Logo consultorio"
          className="patient-header__logo"
        />

        <span className="patient-header__title">
          Consultorio Médico General
        </span>
      </Link>

      <nav className="patient-header__nav">

        <NavLink
          to="/homepasiente"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Inicio
        </NavLink>

        <NavLink
          to="/crearcita"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Agendar Cita
        </NavLink>

        <NavLink
          to="/calendariopasiente"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Calendario
        </NavLink>

        <NavLink
          to="/expedientepasiente"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Mi Expediente
        </NavLink>

        <NavLink
          to="/perfilpasiente"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          Mi Perfil
        </NavLink>

      </nav>

      <Link to="/" className="patient-header__logout">
        Cerrar Sesión
      </Link>

    </header>
  );
}