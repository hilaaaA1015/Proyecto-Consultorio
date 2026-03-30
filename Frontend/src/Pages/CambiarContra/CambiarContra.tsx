
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CambiarContra.css";

const CambiarContra = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      setError("El correo electrónico es obligatorio");
      return false;
    }
    if (!newPassword) {
      setError("La nueva contraseña es obligatoria");
      return false;
    }
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Ajusta la URL según tu backend
      const res = await fetch("http://localhost:4000/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await res.json();
      console.log("Respuesta cambio contraseña:", data);

      if (!res.ok || !data.ok) {
        setError(data.message || "Error al cambiar la contraseña");
        return;
      }

      setSuccess("Contraseña actualizada correctamente. Redirigiendo...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Error de red:", err);
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cambiar__container">
      <div className="cambiar__card">
        <h2 className="cambiar__title">Cambiar Contraseña</h2>

        <form className="cambiar__form" onSubmit={handleSubmit}>
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Nueva contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label>Confirmar contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="cambiar__error">{error}</p>}
          {success && <p className="cambiar__success">{success}</p>}

          <button type="submit" className="cambiar__btn" disabled={loading}>
            {loading ? "Procesando..." : "Cambiar contraseña"}
          </button>
        </form>

        <div className="cambiar__links">
          <Link to="/login">Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default CambiarContra;