/* eslint-disable strict */
'use strict';

const { server } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Web Server', () => {
  describe('middleware functions', () => {

    it('should returns a res status of 500 on error', () => {
      return mockRequest
        .get('/error', server)
        .then(results => {
          expect(results.status).toBe(500);
        })
        .catch(console.error);
    });

    it('should returns a res status of 404 on not found routes', () => {
      return mockRequest
        .get('/foo')
        .then(results => {
          expect(results.status).toBe(404);
        })
        .catch(console.error);
    });
  });

  describe('CRUD operations', () => {
    it('should be able to GET', () => {
      return mockRequest
        .get('/api/v1/categories')
        .then(results => {
          expect(results.status).toBe(200);
          expect(results.body.count).toBe(0);
        }).catch(console.error);
    });

    it('should be aple to POST', () => {
      return mockRequest
        .post('/api/v1/categories')
        .send({ name: '11', description: 'engineer' })
        .then(results => {
          expect(results.status).toBe(201 || 200);
          expect(results.body.name).toBe('11');
        }).catch(console.error);

    });

    it('should be able to PUT', () => {
      return mockRequest
        .put('/api/v1/categories/1')
        .send({ name: 'ibrahim-updated-2', description: 'engineer' })
        .then(results => {
          expect(results.status).toBe(200 || 201);
          expect(results.body.name).toBe('ibrahim-updated-2');
        }).catch(console.error);

    });

    it('should be able to DELETE', () => {
      return mockRequest
        .delete('/api/v1/categories/1')
        .then(results => {
          expect(results.status).toBe(200);
          expect(results.body.msg).toBe('catogery deleted');
        }).catch(console.error);

    });
  });
});