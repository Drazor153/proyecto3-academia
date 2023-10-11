import type { Request, Response } from 'express';
import { prisma } from '../services/db';
import {
  sanitizeLessonClasses,
  sanitizeTopicQuizzes,
  transformarDatos,
} from '../utils/teacher.utils';
import { PostClass, QuizPost } from '../types/teachers';
import { UserRequest } from '../types/auth';

export const getTeacherLessons = async (
  req: UserRequest,
  res: Response
): Promise<void> => {
  const { run } = req.params;
  // const { run } = req.user as UserCookie;
  const query = await prisma.lesson.findMany({
    where: { teacherRun: +run },
    include: { level: true },
    orderBy: {
      level: {
        code: 'desc',
      },
    },
  });

  const teacherLevels = transformarDatos(query);

  res.status(200).json({ data: teacherLevels });
};

export const getLevelQuizzes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { year, semester, level } = req.params;

  const topics = await prisma.topic.findMany({});

  const topicQuizzesQuery = await prisma.quiz.findMany({
    where: {
      year: +year,
      semester: +semester,
      levelCode: level,
    },
    include: {
      topic: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  const topicQuizzesSanitizied = sanitizeTopicQuizzes(topics, topicQuizzesQuery);

  res.status(200).json({
    data: topicQuizzesSanitizied,
  });
};

export const getQuizGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { quizId } = req.params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: +quizId },
  });

  if (!quiz) {
    res.status(404).json({ errorType: 'msg', errorMsg: 'Quiz not found' });
    return;
  }

  const query = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
      enrols: {
        some: {
          levelCode: quiz.levelCode,
          year: quiz.year,
          semester: quiz.semester,
          status: 'Cursando',
        },
      },
    },
    include: {
      gives: {
        where: {
          quizId: +quizId,
        },
      },
    },
    orderBy: {
      first_surname: 'asc',
    },
  });

  const gradesData = query.map((val) => {
    const grade = val.gives[0]?.grade;
    return {
      run: val.run,
      name: val.name,
      first_surname: val.first_surname,
      grade: grade ? grade : 0,
      dv: val.dv,
    };
  });

  res.status(200).json({ data: gradesData });
};

export const postQuizzesGrades = (req: Request, res: Response) => {
  const { quizId, grades }: QuizPost = req.body;

  grades.forEach(async (val) => {
    await prisma.gives.upsert({
      where: {
        quizId_studentRun: {
          quizId: quizId,
          studentRun: val.run,
        },
      },
      update: {
        grade: val.grade,
      },
      create: {
        quizId: quizId,
        studentRun: val.run,
        grade: val.grade,
      },
    });
  });

  console.log(`${grades.length} notas actualizadas`);

  res.status(200).json({ msg: 'Notas actualizadas!' });
};

export const getStudents = async (req: Request, res: Response) => {
  const { lessonId } = req.params;

  const level = await prisma.lesson.findUnique({
    where: {
      id: +lessonId,
    },
    select: {
      level: true,
      year: true,
      semester: true,
    },
  });

  if (!level) {
    res.status(404).json({ errorType: 'msg', errorMsg: 'Lesson not found' });
    return;
  }

  const studentsInLevel = await prisma.user.findMany({
    where: {
      role: 'STUDENT',
      enrols: {
        some: {
          levelCode: level.level.code,
          year: level.year,
          semester: level.semester,
          status: 'Cursando',
        },
      },
    },
    orderBy: {
      first_surname: 'asc',
    },
    select: {
      run: true,
      name: true,
      first_surname: true,
      dv: true,
    },
  });

  res.status(200).json({ data: studentsInLevel });
};

export const getClasses = async (req: Request, res: Response) => {
  const { lessonId } = req.params;

  const query = await prisma.class.findMany({
    where: { lessonId: +lessonId },
    include: {
      attendance: {
        include: {
          student: {
            select: {
              run: true,
              name: true,
              first_surname: true,
              dv: true,
            },            
          },

        },
      },
    },
    orderBy: {
      week: 'desc',
    },
  });

  if (!query) {
    res.status(404).json({ errorType: 'msg', errorMsg: 'Lesson not found' });
    return;
  }

  const sanitizied = sanitizeLessonClasses(query);

  res.status(200).json({ data: sanitizied });
};

export const createClass = async (req: Request, res: Response) => {
  const { lessonId, week, contents, attendance }: PostClass = req.body;

  const query = await prisma.class.create({
    data: {
      lessonId,
      week,
      contents,
      attendance: {
        createMany: {
          data: attendance,
        },
      },
    },
  });
  console.log(query);

  res.status(200).json({ msg: 'Clase creada!' });
};

export const updateClass = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { contents, attendance }: PostClass = req.body;

  const query = await prisma.class.update({
    where: { id: +classId },
    data: {
      contents,
      attendance: {
        updateMany: attendance.map((val) => ({
          where: {classId: +classId, studentRun: val.studentRun},
          data: {attended: val.attended}
        }))
      },
    },
  });
  console.log(`Updated class: ${query}`);
  

  res.status(200).json({ msg: 'Clase actualizada!' });
}

export const deleteClass = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const query = await prisma.class.delete({
    where: { id: +classId },
  })
  console.log(`Deleted class: ${query}`);

  res.status(200).json({ msg: 'Clase eliminada!' });
};
