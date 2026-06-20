import { prisma } from "../services/prisma.js";
import { CitaCreateInput } from "../schemas/Cita.schema.js";

export class CitaService {
  static async create(data: CitaCreateInput, idUsuario: number) {
    const doctor = await prisma.doctor.findFirst();

    if (!doctor) {
      throw new Error("No hay doctor registrado en el sistema");
    }

    const paciente = await prisma.paciente.findFirst({
      where: { id_usuario: idUsuario },
    });

    if (!paciente) {
      throw new Error("No se encontró el paciente asociado al usuario");
    }

    const fecha = new Date(data.fecha);
    fecha.setHours(0, 0, 0, 0);

    const [hh, mm] = data.horacita.split(":").map(Number);

    if (isNaN(hh) || isNaN(mm)) {
      throw new Error("Hora inválida");
    }

    const hora = new Date(fecha);
    hora.setHours(hh, mm, 0, 0);

    const choque = await prisma.cita.findFirst({
      where: {
        fecha,
        hora,
      },
    });

    if (choque) {
      throw new Error("Ya existe una cita en ese horario");
    }

    const cita = await prisma.cita.create({
      data: {
        fecha,
        hora,
        estado: "Pendiente",
        motivo: data.motivo,
        id_doctor: doctor.id_usuario,
        id_paciente: paciente.id_usuario,
      },
    });

    return cita;
  }

  static async getAll() {
    return prisma.cita.findMany({
      include: {
        doctor: true,
        paciente: true,
      },
    });
  }

  // =========================
  // ACTUALIZAR ESTADO CITA
  // =========================
  static async updateEstado(id_cita: number, estado: string) {
    return prisma.cita.update({
      where: { id_cita },
      data: { estado },
    });
  }

  // =========================
  // ELIMINAR CITA
  // =========================
  static async delete(id_cita: number) {
    return prisma.cita.delete({
      where: { id_cita },
    });
  }
}