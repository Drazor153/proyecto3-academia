import { Module } from '@nestjs/common';
import { LessonsModule } from './lessons/lessons.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { ClassesModule } from './classes/classes.module';
import { LevelsModule } from './levels/levels.module';
import { AuthModule } from './auth/auth.module';
import { AnnouncementsModule } from './announcements/announcements.module';

@Module({
  imports: [
    AnnouncementsModule,
    AuthModule,
    ClassesModule,
    LessonsModule,
    LevelsModule,
    StudentsModule,
    TeachersModule,
  ],
})
export class ApiModule {}
