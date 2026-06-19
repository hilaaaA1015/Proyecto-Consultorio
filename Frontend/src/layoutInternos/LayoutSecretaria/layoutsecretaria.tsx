import React from "react";
import { Outlet } from "react-router-dom";
import HeaderSecretaria from "../../ComponentsInternos/ComponentsSecretaria/header/headersecretaria";

import "./layoutsecretaria.css";

export default function LayoutSecretria() {
  return (
    <>
      <HeaderSecretaria />

      <div className="layout-content">
        <Outlet />
      </div>
    </>
  );
}