import React from "react";
import { Link } from "react-router-dom";
import "./headersecretaria.css"

export default function HeaderSecretaria(){
    return(
         <header className="header">
              {/* LOGO + TÍTULO */}
              <div className="header__left">
                <img
                  src="/imagenes/logo_regina.png"
                  alt="Logo consultorio"
                  className="header__logo"
                />
                <span className="header__title">Consultorio Médico General</span>
              </div>
        
              {/* MENÚ */}
              <nav className="header__nav">
                <Link to="/homesecretaria/CrearNuevoPasienteVistaSecretaria">crear usuario nuevo</Link>
                <div className="header__dropdown">
                  <button className="dropdown__btn"> Pagos ▾</button>
                  <div className="dropdown__menu">
                    <Link to="/homesecretaria/vistapagocita"> Nuevo pago</Link>
                    <Link to="/servicio3">Exámenes Médicos</Link>
                  </div>
                </div>
        
                
                <Link to="/contactos">Contactos</Link>
                <Link to="/notificaciones">Notificaciones</Link>
              </nav>
        
              {/* BOTÓN */}
              <Link to="/login" className="header__loginBtn">
                Iniciar Sesión
              </Link>
            </header>
    )
}