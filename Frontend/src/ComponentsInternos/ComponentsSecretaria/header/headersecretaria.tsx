import React from "react";
import { Link } from "react-router-dom";
import "./headersecretaria.css"
import imagen from "../../public/Imagenes/logo_regina.png"

export default function HeaderSecretaria(){
    return(
         <header className="header">
              {/* LOGO + TÍTULO */}

              <div className="header__left">
                <img
                  src="../../public/Imagenes/logo_regina.png"
                  alt="Logo consultorio"
                  className="header__logo"
                />
                <span className="header__title">Consultorio Médico General</span>
              </div>
        
              {/* MENÚ */}
              <nav className="header__nav">
                

         
                <Link to="/ModuleCalendarSecre">Calendario</Link>
                <Link to="/homesecretaria/pacientes">Pacientes</Link>
                <Link to="/PerfilSecre">Mi Perfil</Link>
                
                
              </nav>
        
              {/* BOTÓN */}
              <Link to="/login" className="header__loginBtn">
                Cerrar Sesión
              </Link>
            </header>
    )
}