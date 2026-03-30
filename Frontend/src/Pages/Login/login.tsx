import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita recargar la página

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username, // se mapea a usuario.nombre
          password,
        }),
      });

      const data = await res.json();
      console.log("Respuesta login:", data);
      console.log("ROL crudo recibido:", data.user?.rol);
      const rawRole = data.user?.rol ?? "";
      const role = String(rawRole).trim().toLowerCase();
      console.log("ROL normalizado:", role);

      if (!res.ok || !data.ok) {
        setError(data.message || "Usuario o contraseña incorrectos");
        return;
      }

      // Redirección según rol
      if (role === "paciente") {
        navigate("/homepasiente");
      } else if (role === "doctor" || role === "medico") {
        navigate("/homedoctor");
      } else if (role === "secretaria" || role === "secretario") {
        navigate("/homesecretaria");
      } else if (role === "admin" || role === "administrador") {
        navigate("/homeadministrador");
      } else {
        navigate("/");
      }
      
    } catch (err) {
      console.error("Error de red al hacer login:", err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login__container">
      <div className="login__card">
        <h2 className="login__title">Iniciar Sesión</h2>

        <form className="login__form" onSubmit={handleSubmit}>
          <label>Nombre de usuario</label>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login__error">{error}</p>}

          <button type="submit" className="login__btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* OPCIONES */}
        <div className="login__links">
          <Link to="/cambiar-contraseña">¿Olvidaste tu contraseña?</Link>
          <Link to="/crearusuariopasientevista">Crear una cuenta</Link>
        </div>
      </div>

    </div>
  );
}
