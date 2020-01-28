'use strict';

const { server } = require('../../lib/server.js')
const supertest = require('supertest')
const mockRequest = supertest(server)

describe('Web Server', () => {
    it('should returns a res status of 500 on error', () => {
        return mockRequest
            .get('/actual-error')
            .then(results => {
                expect(results.status).toBe(500)
            })
            .catch(console.error)
    });

    it('should returns a res status of 404 on not found routes', () => {
        return mockRequest
            .get('/foo')
            .then(results => {
                expect(results.status).toBe(404)
            })
            .catch(console.error)
    })
})

