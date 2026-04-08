import React from "react";
import { Outlet } from "react-router-dom";
import HeaderPasiente from "../../ComponentsInternos/ComponentsPasiente/header/headerpasiente";
import "./layoutpasiente.css"

export default function LayoutPasiente() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      
      <HeaderPasiente />

      <main style={{ marginTop: "80px", padding: "20px" }}>
        <Outlet />
      </main>

    </div>
  );
}