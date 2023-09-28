import supertest from 'supertest';
import app from '../src/app';
import { describe, expect, it } from '@jest/globals';

const requestApp = supertest(app);

describe('GET /api/levels', () => {
  it('should show all academic levels', async () => {
    const res = await requestApp.get('/api/levels');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.length).toBe(5);
  });
});
