import {z} from 'zod'

export const CrearNuevoPasiente = z.object({
   PrimerNombre: z
  .string()
  .min(1, "El primer nombre es obligatorio.")
  .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/, "El primer nombre solo puede contener letras."),

SegundoNombre: z.string().min(1, "El segundo nombre es obligatorio.").regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/, "El segundo nombre solo puede contener letras."),

Apellido: z
  .string()
  .min(1, "El primer apellido es obligatorio.")
  .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/, "El apellido solo puede contener letras."),

SegundoApellido: z
  .string()
  .min(1, "El segundo apellido es obligatorio.")
  .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/, "El segundo apellido solo puede contener letras."),

sex: z
  .string()
  .min(1, "Debe seleccionar un género."),

fechaNacimiento: z.date("debe de ingresarse la fecha"),

email: z
  .string()
  .email("Formato de correo electrónico inválido.")
  .min(1, "El correo electrónico es obligatorio."),

TipoSangre: z
  .string()
  .min(1, "Debe seleccionar un tipo de sangre."),

Telefono: z
  .string()
  .min(1, "El número de teléfono es obligatorio."),

  UsuarioPasiente: z
  .string()
  .min(1, "El usuario es obligatorio")
  .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9]+$/, "El nombre de usuario contiene caracteres invalidos."),

password: z
  .string()
  .min(6, "La contraseña debe tener al menos 6 caracteres.")
  .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Debe contener al menos una letra y un número"),

confirmPassword: z
  .string()
  .min(6, "La confirmación de contraseña debe tener al menos 6 caracteres.")
  .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Debe contener al menos una letra y un número"),

    
}).refine((data)=> data.password === data.confirmPassword, {
    path : ['confirmPassword'],
    message: 'la contraseña no coincide'
});

export type PasienteSchemasType = z.infer<typeof CrearNuevoPasiente>

export const defaultValues: PasienteSchemasType = {
PrimerNombre:'',
SegundoNombre: '',
Apellido:'',
SegundoApellido: '',
TipoSangre: '',
Telefono: '',
sex:'',
fechaNacimiento: new Date(),
email: '',
UsuarioPasiente: '',
password: '',
confirmPassword: ''

}
