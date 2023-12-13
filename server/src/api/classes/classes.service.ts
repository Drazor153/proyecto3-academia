import { Injectable } from '@nestjs/common';
import {
  ClassParams,
  CreateClassDto,
  UpdateClassDto,
} from '@/api/classes/dto/classes.dto';
import { ClassesRepo } from '@repos';

@Injectable()
export class ClassesService {
  constructor(private classesRepo: ClassesRepo) {}

  async createClass(data: CreateClassDto) {
    const query = await this.classesRepo.create(data);

    console.log(query);

    return { msg: 'Clase creada!' };
  }
  async updateClass({ classId }: ClassParams, dto: UpdateClassDto) {
    const query = await this.classesRepo.update(+classId, dto);

    console.log(`Updated class: ${query}`);

    return { msg: 'Clase actualizada!' };
  }
  async deleteClass({ classId }: ClassParams) {
    const query = await this.classesRepo.delete(+classId);

    console.log(`Deleted class: ${query}`);

    return { msg: 'Clase eliminada!' };
  }
}
