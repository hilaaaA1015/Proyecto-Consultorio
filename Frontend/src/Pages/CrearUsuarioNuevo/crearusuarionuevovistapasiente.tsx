import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CrearNuevoPasiente,
  defaultValues,
  PasienteSchemasType,
} from "../../schemas/pasienteSchemas/CrearNuevoPasiente/crearNuevopasiente";
import "./crearusuarionuevovistapasiente.css";
import { Button, DatePicker, SelectPicker } from "rsuite";
import FormController from "../../Components/formcontrolers/formcontrollers";
import { useNavigate } from "react-router-dom";

const CrearUsuarioNuevoVistaPasiente = () => {
  const navigate = useNavigate();

  const methods = useForm<PasienteSchemasType>({
    resolver: zodResolver(CrearNuevoPasiente),
    defaultValues: defaultValues,
  });

  const { reset } = methods;

  const onsubmit = async (data: PasienteSchemasType) => {
    const payload = {
      ...data,
      sex:
        data.sex === "hombre"
          ? "M"
          : data.sex === "mujer"
          ? "F"
          : null,
      fechaNacimiento: data.fechaNacimiento
        ? new Date(data.fechaNacimiento).toISOString()
        : null,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/patients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message ?? "Error al registrar paciente");
        return;
      }

      alert("Paciente registrado correctamente");
      reset();
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="crear-paciente-modal-container">
      <div className="crear-paciente-modal-card">
        <h2>Crear nuevo usuario</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onsubmit)}
            className="crear-paciente-form-grid"
          >
            <FormController
              name="PrimerNombre"
              labelText="Primer nombre"
              placeholder="Nombre"
            />

            <FormController
              name="SegundoNombre"
              labelText="Segundo nombre"
              placeholder="Segundo nombre"
            />

            <FormController
              name="Apellido"
              labelText="Primer apellido"
              placeholder="Apellido"
            />

            <FormController
              name="SegundoApellido"
              labelText="Segundo apellido"
              placeholder="Segundo apellido"
            />

            <FormController
              as={DatePicker}
              name="fechaNacimiento"
              labelText="Ingresa tu fecha de nacimiento"
              placeholder="DD/MM/YYYY"
            />

            <FormController
              as={SelectPicker}
              data={[
                { label: "Hombre", value: "hombre" },
                { label: "Mujer", value: "mujer" },
              ]}
              name="sex"
              labelText="Seleccione tu sexo"
            />

            <FormController
              name="Telefono"
              labelText="Teléfono"
              placeholder="0000-0000"
            />

            <FormController
              as={SelectPicker}
              data={[
                { label: "A+", value: "A+" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B-", value: "B-" },
                { label: "AB+", value: "AB+" },
                { label: "AB-", value: "AB-" },
                { label: "O+", value: "O+" },
                { label: "O-", value: "O-" },
              ]}
              name="TipoSangre"
              labelText="Seleccione el tipo de sangre"
            />

            <FormController
              name="email"
              labelText="Email"
              placeholder="usuario@gmail.com"
            />

            <FormController
              name="UsuarioPasiente"
              labelText="Nombre de usuario"
              placeholder="usuario"
            />

            <FormController
              name="password"
              labelText="Contraseña"
              placeholder="*****"
            />

            <FormController
              name="confirmPassword"
              labelText="Confirmar contraseña"
              placeholder="*****"
            />

            <Button className="submit-btn" type="submit">
              Agregar Paciente
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CrearUsuarioNuevoVistaPasiente;