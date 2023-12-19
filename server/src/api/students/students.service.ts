import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateNewStudentDto,
  GetStudentGradesParams,
  PaginatedStudentsQuery,
  UpdateStudentDto,
} from './students.dto';
import { paginated } from '@/common/paginate';
import { hashPassword } from '@/common/bcrypt';
import {
  filterStudents,
  sanitizeStudentCareer,
  sanitizeStudentGrades,
  sanitizeStudentLevels,
} from '@/sanitizers/students';
import { UsersRepo } from '@repos';

@Injectable()
export class StudentsService {
  constructor(private usersRepo: UsersRepo) {}

  async getStudents(queryParams: PaginatedStudentsQuery) {
    const { page, size, run, name, level, paid: paidString } = queryParams;

    const query = await this.usersRepo.getActiveStudents();

    const students = filterStudents(query, {
      run,
      name,
      level,
      paidString,
    }).map((student) => ({
      run: student.run,
      dv: student.dv,
      name: student.name,
      first_surname: student.first_surname,
      level: student.enrols[0].levelCode,
      paid: student.enrols[0].paid,
    }));

    const { array, next, previous } = paginated(students, +page, +size);

    return { data: array, next, previous };
  }

  async getStudentCareer(run: number) {
    const studentQuery = await this.usersRepo.getStudentCareerByRun(run);

    if (!studentQuery) {
      throw new BadRequestException('student_not_found');
    }

    const sanitized = sanitizeStudentCareer(studentQuery);

    return { data: sanitized };
  }
  async createNewStudent(params: CreateNewStudentDto) {
    const { run, first_surname } = params;
    const studentExist = await this.usersRepo.getStudentByRun(run);

    if (studentExist !== null) {
      throw new BadRequestException('student_exists');
    }

    const hashedPassword = await hashPassword(
      `${run}_${first_surname.toUpperCase()}`
    );
    const student = await this.usersRepo.createNewActiveStudent({
      ...params,
      hashedPassword,
    });

    return { msg: 'student_created', student };
  }

  async getLevels(run: number) {
    const query = await this.usersRepo.getStudentLevels(run);

    const studentLevels = sanitizeStudentLevels(query);

    return { data: studentLevels };
  }

  async getStudentGrades(run: number, params: GetStudentGradesParams) {
    const { topics, query } = await this.usersRepo.getStudentGrades(
      run,
      params
    );

    const sanitizedQuery = sanitizeStudentGrades(topics, query);

    return { data: sanitizedQuery };
  }

  async updateStudent(run: number, studentDto: UpdateStudentDto) {
    try {
      await this.usersRepo.updateStudent(run, studentDto);
      return { msg: 'student_updated' };
    } catch (error) {
      throw new BadRequestException('student_not_found');
    }
  }
}
