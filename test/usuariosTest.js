import request from 'supertest';
const chai = await import('chai');
import jsonSchema from 'chai-json-schema'
import app from '../app.js';

chai.use(jsonSchema);
let usuarioId;
describe('API tests', () => {
  it('Deberia crear un usuario', async() => {
    const res = await request(app)
      .post('/usuarios')
      .send({
        "nombre": "Jhon",
        "apellido": "Doe",
        "correo" : "jhondoe@mailinator.com",
        "password": "Letme1n@s21"
      })
      chai.expect(res.statusCode).to.be.equal(200)
      chai.expect(res.type).to.be.equal("application/json")
      chai.expect(res.body.nombre).to.be.equal("Jhon")
      chai.expect(res.body.apellido).to.be.equal("Doe")
      chai.expect(res.body.correo).to.be.equal("jhondoe@mailinator.com")

      chai.expect(res.body).jsonSchema({
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {
          "_id": {
            "type": "string",
            "pattern": "^[a-fA-F0-9]{24}$"
          },
          "nombre": {
            "type": "string",
            "minLength": 1
          },
          "apellido": {
            "type": "string",
            "minLength": 1
          },
          "correo": {
            "type": "string",
            "format": "email"
          },
          "password": {
            "type": "string",
            "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]+$",
            "minLength": 8
          }
        },
        "required": ["_id", "nombre", "apellido", "correo", "password"],
        "additionalProperties": false
      })
      usuarioId = res.body._id
      });

      it('Deberia intentar crear un cliente duplicado', async() => {
        const res = await request(app)
          .post('/usuarios')
          .send({
            "nombre": "Jhon",
            "apellido": "Doe",
            "correo" : "jhondoe@mailinator.com",
            "password": "Letme1n@s21"
          })
          chai.expect(res.statusCode).to.be.equal(400)
          chai.expect(res.type).to.be.equal("application/json")
          chai.expect(res.body.errores[0].mensaje).to.be.equal("El Correo ya existe")
          chai.expect(res.body.errores[1].mensaje).to.be.equal("El usuario con el nombre Jhon y apellido Doe ya existe")
        });

        it('Deberia intentar crear un cliente con contraseña insegura', async() => {
          const res = await request(app)
            .post('/usuarios')
            .send({
              "nombre": "Joana",
              "apellido": "Doe",
              "correo" : "jhondoe@mailinator.com",
              "password": "12321"
            })
            chai.expect(res.statusCode).to.be.equal(400)
            chai.expect(res.type).to.be.equal("application/json")
            chai.expect(res.body.errores[0].mensaje).to.be.equal("La contraseña deberia tener: al menos 8 caracteres, al menos una letra mayuscula y una minuscula, al menos un digito y al menos un caracter especial (!, @, #, $, %, etc.)")
          });

        it('Deberia retornar los usuarios', async() => {
          const res = await request(app)
            .get('/usuarios')
            chai.expect(res.statusCode).to.be.equal(200)
            chai.expect(res.type).to.be.equal("application/json")
            chai.expect(res.body).jsonSchema({
              "$schema": "http://json-schema.org/draft-07/schema#",
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "_id": {
                    "type": "string",
                    "pattern": "^[a-fA-F0-9]{24}$"
                  },
                  "nombre": {
                    "type": "string",
                    "minLength": 1
                  },
                  "apellido": {
                    "type": "string",
                    "minLength": 1
                  },
                  "correo": {
                    "type": "string",
                    "format": "email"
                  },
                  "password": {
                    "type": "string",
                    "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]+$",
                    "minLength": 8
                  }
                },
                "required": ["_id", "nombre", "apellido", "correo", "password"],
                "additionalProperties": false
              }
            })
            });

            it('Deberia obtener un usuario existente', async() => {
              const res = await request(app)
                .get('/usuarios/' + usuarioId)
                chai.expect(res.statusCode).to.be.equal(200)
                chai.expect(res.type).to.be.equal("application/json")
                chai.expect(res.body).jsonSchema({
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "pattern": "^[a-fA-F0-9]{24}$"
                    },
                    "nombre": {
                      "type": "string",
                      "minLength": 1
                    },
                    "apellido": {
                      "type": "string",
                      "minLength": 1
                    },
                    "correo": {
                      "type": "string",
                      "format": "email"
                    },
                    "password": {
                      "type": "string",
                      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]+$",
                      "minLength": 8
                    }
                  },
                  "required": ["_id", "nombre", "apellido", "correo", "password"],
                  "additionalProperties": false
                })
                });

                it('Deberia obtener un usuario inexistente', async() => {
                  const res = await request(app)
                    .get('/usuarios/6673427446c8b93960df77bd')
                    chai.expect(res.statusCode).to.be.equal(404)
                    chai.expect(res.type).to.be.equal("application/json")
                    chai.expect(res.body.error.mensaje).to.be.equals("El usuario no fue encontrado.")
                    });

                it('Actualiza un usuario existente', async() => {
                  const res = await request(app)
                    .put('/usuarios/' + usuarioId)
                    .timeout(5000)
                    .send({
                      "nombre": "Jane",
                      "apellido": "Black",
                      "correo" : "jhondoe@mailinator.com",
                      "password": "Letme1n@s21"
                    })
                    
                    chai.expect(res.statusCode).to.be.equal(200)
                    chai.expect(res.type).to.be.equal("application/json")
                    chai.expect(res.body.nombre).to.be.equal("Jane")
                    chai.expect(res.body.apellido).to.be.equal("Black")
                    chai.expect(res.body).jsonSchema({
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "pattern": "^[a-fA-F0-9]{24}$"
                        },
                        "nombre": {
                          "type": "string",
                          "minLength": 1
                        },
                        "apellido": {
                          "type": "string",
                          "minLength": 1
                        },
                        "correo": {
                          "type": "string",
                          "format": "email"
                        },
                        "password": {
                          "type": "string",
                          "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]+$",
                          "minLength": 8
                        }
                      },
                      "required": ["_id", "nombre", "apellido", "correo", "password"],
                      "additionalProperties": false
                    })
                    });
                it('Actualiza un usuario inexistente', async() => {
                  const res = await request(app)
                    .put('/usuarios/6673427446c8b93960df77bd')
                    .timeout(5000)
                    .send({
                      "nombre": "Jane",
                      "apellido": "Black",
                      "correo" : "jhondoe@mailinator.com",
                      "password": "Letme1n@s21"
                    })
                    
                    chai.expect(res.statusCode).to.be.equal(404)
                    chai.expect(res.type).to.be.equal("application/json")
                    chai.expect(res.body.error.mensaje).to.be.equal("El usuario no fue encontrado.")
                    
                  });

                    it('Elimina un usuario existente', async() => {
                      const res = await request(app)
                        .delete('/usuarios/' + usuarioId)
                        chai.expect(res.statusCode).to.be.equal(200)
                        chai.expect(res.type).to.be.equal("application/json")
                        chai.expect(res.body.message).to.be.equal("El usuario ha sido eliminado con exito.")
                        
                    });
            
                    it('Elimina un usuario inexistente', async() => {
                      const res = await request(app)
                        .delete('/usuarios/' + usuarioId)
                        chai.expect(res.statusCode).to.be.equal(404)
                        chai.expect(res.type).to.be.equal("application/json")
                        chai.expect(res.body.error.mensaje).to.be.equal("El usuario no fue encontrado.")
                        
                    });
  });

//   describe('POST /Usuario', () => {
    
//     });

// describe('GET /Usuarios', () => {
 
//   });

  

//   describe('GET /Usuario/:id', () => {
    
//     });

//     describe('PUT /Usuario/:id', () => {
      
//       });

//       describe('DELETE /Usuario/:id', () => {
        
//       });
