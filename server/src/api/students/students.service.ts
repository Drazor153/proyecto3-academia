import { Injectable } from '@nestjs/common';
import {
  CreateNewStudentDto,
  GetStudentGradesParams,
  PaginatedStudentsQuery,
} from './students.dto';
import { PrismaService } from '@/database/prisma.service';
import { hasNextPage, paginate } from '@/common/paginate';
import { hashPassword } from '@/common/bcrypt';
import {
  sanitizeStudentCareer,
  sanitizeStudentGrades,
  sanitizeStudentLevels,
} from '@/sanitizers/students';
import { StudentsRepo } from '@repos';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private studentRepo: StudentsRepo
  ) {}

  // async getAllStudents() {
  //   return await this.prisma.user.findMany({
  //     where: {
  //       role: RoleEnum.Student,
  //     },
  //     select: {
  //       run: true,
  //       dv: true,
  //       name: true,
  //       first_surname: true,
  //       email: true,
  //       status: true,
  //     },
  //   });
  // }

  async getStudents(queryParams: PaginatedStudentsQuery) {
    const { page, size, run, name, level, paid: paidString } = queryParams;

    const paid = paidString === 'true';

    const query = await this.studentRepo.getActiveStudents();

    const students = query
      .filter(
        (student) =>
          student.enrols[0].paid === paid &&
          String(student.run).startsWith(run) &&
          student.enrols[0].levelCode.includes(level) &&
          student.name.toLowerCase().startsWith(name ? name.toLowerCase() : '')
      )
      .map((student) => ({
        run: student.run,
        dv: student.dv,
        name: student.name,
        first_surname: student.first_surname,
        level: student.enrols[0].levelCode,
        paid: student.enrols[0].paid,
      }));

    const paginatedStudents = paginate(students, +page, +size);
    const previous = +page > 1;
    const next = hasNextPage(students, +page, +size);

    return { data: paginatedStudents, next, previous };
  }

  async getStudentCareer(run: number) {
    const studentQuery = await this.studentRepo.getStudentCareerByRun(run);

    if (!studentQuery) {
      return { error: 'El estudiante no existe' };
    }

    const sanitized = sanitizeStudentCareer(studentQuery);

    return { data: sanitized };
  }
  async createNewStudent(params: CreateNewStudentDto) {
    const { run, first_surname } = params;
    const studentExist = await this.studentRepo.getStudentByRun(run);

    if (studentExist !== null) {
      return { error: 'El estudiante ya existe' };
    }

    const hashedPassword = await hashPassword(
      `${run}_${first_surname.toUpperCase()}`
    );
    const student = await this.studentRepo.createNewActiveStudent({
      ...params,
      hashedPassword,
    });

    return { message: 'Usuario creado correctamente!', student };
  }

  async getLevels(run: number) {
    const query = await this.studentRepo.getStudentLevels(run);

    const studentLevels = sanitizeStudentLevels(query);

    return { data: studentLevels };
  }

  async getStudentGrades(run: number, params: GetStudentGradesParams) {
    const topics = await this.prisma.topic.findMany();

    const query = await this.studentRepo.getStudentGrades(run, params);

    const sanitiziedQuery = sanitizeStudentGrades(topics, query);

    return { data: sanitiziedQuery };
  }
}
