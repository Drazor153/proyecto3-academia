import supertest from 'supertest';
import app from '../src/app';
import { describe, expect, test } from '@jest/globals';

const requestApp = supertest(app);

const newStudentData = {
  run: 12345,
  dv: 'k',
  name: 'Test',
  first_surname: 'FirstTestSur',
  second_surname: 'SecondTestSur',
  level: 'A1'
};

describe('POST /api/students', () => {
  test('should return student', async () => {
    const newStudent = await requestApp.post('/api/students').send(newStudentData);
    expect(newStudent.body).toHaveProperty('student');
    expect(newStudent.body.student.run).toBe(newStudentData.run);
  });
});
