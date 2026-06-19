import React from "react";
import { Link } from "react-router-dom";
import "./headersecretaria.css"

export default function HeaderSecretaria(){
    return(
         <header className="header">
              {/* LOGO + TÍTULO */}
             <Link to="/homesecretaria" className="header__left">
                     <img
                       src="/imagenes/Regina-04(este_es) 2.png"
                       alt="Logo consultorio"
                       className="header__logo"
                     />
                     <span className="header__title">Consultorio Médico General</span>
                   </Link>
        
              {/* MENÚ */}
              <nav className="header__nav">
                

         
                <Link to="/ModuleCalendarSecre">Calendario</Link>
                <Link to="/verlistapacientessecre">Pacientes</Link>
                <Link to="/PerfilSecre">Mi Perfil</Link>
                
                
              </nav>
        
              {/* BOTÓN */}
              <Link to="/login" className="header__loginBtn">
                Cerrar Sesión
              </Link>
            </header>
    )
}