import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./CambiarContra.css";

// 🔥 SCHEMAS

const emailSchema = z.object({
  email: z.string().email("Correo inválido"),
});

const resetSchema = z.object({
  codigo: z.string().regex(/^\d{6}$/, "El código debe ser de 6 dígitos"),
  newPassword: z
    .string()
    .min(6, "Mínimo 6 caracteres")
    .regex(/[A-Za-z]/, "Debe contener letras")
    .regex(/\d/, "Debe contener al menos un número"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const CambiarContra = () => {
  const [mostrarReset, setMostrarReset] = useState(false);
  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const formEmail = useForm({
    resolver: zodResolver(emailSchema),
  });

  const formReset = useForm({
    resolver: zodResolver(resetSchema),
  });

  // 📩 GENERAR CÓDIGO
  const enviarCodigo = (data: any) => {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    setCodigoGenerado(codigo);

    // 🔥 SIMULACIÓN (aquí "envías el correo")
    console.log("📩 Código enviado (simulado):", codigo);

    setMensaje("Código enviado (revisa consola 👀)");
    setMostrarReset(true);
  };

  // 🔑 VALIDAR Y CAMBIAR
  const cambiarPassword = (data: any) => {
    if (data.codigo !== codigoGenerado) {
      setMensaje("❌ Código incorrecto");
      return;
    }

    setMensaje("Contraseña cambiada correctamente 🎉");
  };

  return (
    <div className="cambiar__container">
      <div className="cambiar__card">
        <h2>Recuperar Contraseña</h2>

        {/* PASO 1 */}
        {!mostrarReset && (
          <form onSubmit={formEmail.handleSubmit(enviarCodigo)}>
            <input
              {...formEmail.register("email")}
              placeholder="Correo electrónico"
            />
            <p>{formEmail.formState.errors.email?.message as string}</p>

            <button type="submit">Enviar código</button>
          </form>
        )}

        {/* PASO 2 */}
        {mostrarReset && (
          <form onSubmit={formReset.handleSubmit(cambiarPassword)}>
            <input
              {...formReset.register("codigo")}
              placeholder="Código"
            />
            <p>{formReset.formState.errors.codigo?.message as string}</p>

            <input
              type="password"
              {...formReset.register("newPassword")}
              placeholder="Nueva contraseña"
            />
            <p>{formReset.formState.errors.newPassword?.message as string}</p>

            <input
              type="password"
              {...formReset.register("confirmPassword")}
              placeholder="Confirmar contraseña"
            />
            <p>{formReset.formState.errors.confirmPassword?.message as string}</p>

            <button type="submit">Cambiar contraseña</button>
          </form>
        )}

        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );
};

export default CambiarContra;