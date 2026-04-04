import React from "react";
import { Outlet } from "react-router-dom";
import HeaderDoctor from "../../ComponentsInternos/ComponentsDoctor/header/headerdoctor";
import "./layoutdoctor.css"
export default function LayoutDoctor() {
    return (
        <div>
            <HeaderDoctor />

            <main style={{ marginTop: "80px", padding: "20px" }}>
                <Outlet />
            </main>
        </div>
    )
}