import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import {
  AttendanceDto,
  CreateNewJustificationDto,
  GetJustificationsDto,
} from './dto/justification.dto';
import { savePdf } from '../../common/storage';

@Injectable()
export class JustificationService {
  constructor(private prisma: PrismaService) {}

  //gettear todas las justificaciones (opcionalmente dar rut y estado de approved para filtrar)
  async getAllJustifications(queryParams: GetJustificationsDto) {
    const { name, run, approved } = queryParams; //<- name sin usar btw ;-;
    const query = await this.prisma.justification.findMany({
      select: {
        id: true,
        studentRun: true,
        init_ausencia: true,
        end_ausencia: true,
        num_inasistente: true,
        reason: true,
        file: true,
        approved: true,
        Attendance: true,
      },
    });

    //filtro penquita que chamuye acá ;-; (no utiliza el nombre btw pq no tenia mucha idea de como hacer un join)
    const justifications = query
      .filter(
        (justification) =>
          String(justification.studentRun).startsWith(String(run)) &&
          justification.approved.startsWith(approved)
      )
      .map((justification) => ({
        id: justification.id,
        studentRun: justification.studentRun,
        init_ausencia: justification.init_ausencia,
        end_ausencia: justification.end_ausencia,
        num_inasistente: justification.num_inasistente,
        reason: justification.reason,
        file: justification.file,
        approved: justification.approved,
        Attendance: justification.Attendance,
      }));
    return justifications;
  }

  /*
  {
  "run": 20345543,
  "initAusencia": "Fri May 14 2023 01:17:07 GMT-0700 (PDT)",
  "endAusencia": "Fri May 04 2023 01:17:07 GMT-0700 (PDT)",
  "numInasistente": 10,
  "reason_i": "trolie unu",
  "file_i": "directorio/malardo",
  "attendance": "[{classId: 1, studentRun: 12345678}]"
  }
  */

  async getOwnJustifications(run: number) {
    const query = await this.prisma.justification.findMany({
      where: { studentRun: run },
      include: { Attendance: true },
    });
    const justifications = query.map((justification) => ({
      id: justification.id,
      init_ausencia: justification.init_ausencia,
      end_ausencia: justification.end_ausencia,
      num_inasistente: justification.num_inasistente,
      reason: justification.reason,
      file: `${justification.id}_${justification.file}.pdf`,
      approved: justification.approved,
      Attendance: justification.Attendance,
    }));

    return { data: justifications };
  }

  //Create para las justificaciones
  async createNewJustification(
    run: number,
    file: Express.Multer.File,
    dto: CreateNewJustificationDto
  ) {
    console.log(dto);

    const { initAusencia, endAusencia, reason } = dto;

    const init_ausencia = new Date(initAusencia);
    const end_ausencia = new Date(endAusencia);

    const filename = `${run.toString()}_${
      init_ausencia.toISOString().split('T')[0]
    }`;
    const justif = await this.prisma.justification.create({
      data: {
        studentRun: run,
        init_ausencia,
        end_ausencia,
        // num_inasistente: numInasist1ente, //<- no se que es esto, pero no lo pide el DTO
        num_inasistente: 1,
        reason: reason,
        file: filename,
        approved: 'pending',
      },
    });
    console.log('justif: ', justif);

    await savePdf(`${justif.id}_${filename}`, file);
    return { msg: 'justification_created' };
    // const id = justif.id;

    // //no podia asignar las ids del Attendance, asi que se me ocurrió esto.
    // return await this.prisma.justification.update({
    //   where: { id },
    //   data: {
    //     Attendance: {
    //       updateMany: attendance.map((val) => ({
    //         where: { classId: val.classId, studentRun: val.studentRun },
    //         data: { justificationId: id },
    //       })),
    //     },
    //   },
    // });
  }

  // create(createJustificationDto: CreateJustificationDto) {
  //   return 'This action adds a new justification';
  // }

  // findAll() {
  //   return `This action returns all justification`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} justification`;
  // }

  // update(id: number, updateJustificationDto: UpdateJustificationDto) {
  //   return `This action updates a #${id} justification`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} justification`;
  // }
}
