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

describe('GET /api/students at first time', () => {
  test('should get empty array', async () => {
    const res = await requestApp.get('/api/students');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.length).toBe(0);
  });
});
describe('POST /api/students', () => {
  test('should return student', async () => {
    const newStudent = await requestApp.post('/api/students').send(newStudentData);
    expect(newStudent.body).toHaveProperty('student');
    expect(newStudent.body.student.run).toBe(newStudentData.run);
  });
});
