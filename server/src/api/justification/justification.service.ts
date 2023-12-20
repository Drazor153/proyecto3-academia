import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import {
  CreateNewJustificationDto,
  GetJustificationsDto,
} from './justification.dto';
import { savePdf } from '@/common/storage';
import { paginated } from '@/common/paginate';
import { JustificationStatus } from '@/common/constants';
import { JustificationsRepo } from '@repos';
import { filterJustifications } from '@/sanitizers/justifications';

@Injectable()
export class JustificationService {
  constructor(
    private prisma: PrismaService,
    private justificationsRepo: JustificationsRepo
  ) {}

  async getAllJustifications(queryParams: GetJustificationsDto) {
    const { page, size, name, run, approved } = queryParams;
    const query = await this.justificationsRepo.getAllJustifications();

    const justifications = filterJustifications(query, {
      name,
      run,
      status: approved,
    }).map((justification) => {
      const {
        id,
        init_ausencia,
        end_ausencia,
        num_inasistente,
        reason,
        file,
        approved,
        Attendance,
        student,
      } = justification;
      return {
        id,
        initAusencia: init_ausencia,
        endAusencia: end_ausencia,
        numInasistente: num_inasistente,
        reason,
        file: `${id}_${file}.pdf`,
        approved,
        Attendance,
        studentRun: student.run,
        name: student.name,
        first_surname: student.first_surname,
        run: student.run,
        dv: student.dv,
      };
    });

    const { array, next, previous } = paginated(justifications, +page, +size);

    return { data: array, next, previous };
  }

  async getOwnJustifications(run: number) {
    const query = await this.justificationsRepo.getJustificationsByRun(run);
    const justifications = query.map((justification) => {
      const {
        id,
        init_ausencia,
        end_ausencia,
        num_inasistente,
        reason,
        file,
        approved,
        Attendance,
      } = justification;
      return {
        id: id,
        reason,
        file: `${id}_${file}.pdf`,
        approved,
        Attendance,
        initAusencia: init_ausencia,
        endAusencia: end_ausencia,
        numInasistente: num_inasistente,
      };
    });

    return { data: justifications };
  }

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
    const justification = await this.prisma.justification.create({
      data: {
        studentRun: run,
        init_ausencia,
        end_ausencia,
        num_inasistente: 1,
        reason: reason,
        file: filename,
        approved: JustificationStatus.Pending,
      },
    });
    console.log('justification: ', justification);

    await savePdf(`${justification.id}_${filename}`, file);
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

  async setJustificationApproved(id: number, approved: JustificationStatus) {
    const res = await this.justificationsRepo.updateStatus(id, approved);
    console.log(res);

    return { msg: 'justification_approved' };
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
