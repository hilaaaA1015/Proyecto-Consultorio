import React from "react";
import { Outlet } from "react-router-dom";

export default function LayoutDoctor() {
  return (
    <div>
      

      <Outlet /> {/* 👈 ESTO ES LO IMPORTANTE */}
    </div>
  );
}