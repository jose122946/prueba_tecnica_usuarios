import request from 'supertest';
const chai = await import('chai');
import jsonSchema from 'chai-json-schema'
import app from '../express.js';

chai.use(jsonSchema);
describe('GET /usuarios', () => {
  it('deberia retornar lista de usuarios', async() => {
    const res = await request(app)
      .get('/usuarios')
    
      chai.expect(res.statusCode).to.be(200)
      });
  });
