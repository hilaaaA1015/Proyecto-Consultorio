import React from "react";
import { Outlet } from "react-router-dom";
import "./layoutsecretaria.css";

export default function LayoutSecretria(){
    return(
        <div className="container">
            <Outlet />
        </div>
    );
}