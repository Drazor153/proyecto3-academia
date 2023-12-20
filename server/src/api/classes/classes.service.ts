import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ClassParams,
  CreateClassDto,
  UpdateClassDto,
} from '@/api/classes/classes.dto';
import { ClassesRepo } from '@repos';

@Injectable()
export class ClassesService {
  constructor(private classesRepo: ClassesRepo) {}

  async createClass(data: CreateClassDto) {
    try {
      const query = await this.classesRepo.create(data);
      console.log(query);
      return { msg: 'class_created' };
    } catch (error) {
      throw new BadRequestException('class_created_error');
    }
  }
  async updateClass({ classId }: ClassParams, dto: UpdateClassDto) {
    try {
      const query = await this.classesRepo.update(+classId, dto);
      console.log(`Updated class: ${query}`);
      return { msg: 'class_updated' };
    } catch (error) {
      throw new BadRequestException('class_updated_error');
    }
  }
  async deleteClass({ classId }: ClassParams) {
    try {
      const query = await this.classesRepo.delete(+classId);
      console.log(`Deleted class: ${query}`);
      return { msg: 'class_deleted' };
    } catch (error) {
      throw new BadRequestException('class_deleted_error');
    }
  }
}
