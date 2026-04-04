// ESTE ARCHIVO ES SOLO PARA PASAR DATOS DE PRUEBA COMO SI FUERA EL BACKEND A LA VISTA DE VERPACIENTESDOCTOR
export interface Paciente {
  id_usuario: number;
  nombre: string;
  primer_apellido: string;
  nacimiento: string;
  sexo: string;
  telefono: string;
  tipo_sangre?: number;
}

export const mockPacientes: Paciente[] = [
  { id_usuario: 1, nombre: 'Carlos', primer_apellido: 'López', nacimiento: '1985-05-12', sexo: 'M', telefono: '555-0101' },
  { id_usuario: 2, nombre: 'Ana', primer_apellido: 'Martínez', nacimiento: '1992-08-24', sexo: 'F', telefono: '555-0102' },
  { id_usuario: 3, nombre: 'Luis', primer_apellido: 'García', nacimiento: '1978-11-05', sexo: 'M', telefono: '555-0103' },
];