import { Router } from 'express'
import { UsuariosController } from '../controllers/usuariosController.js'
import { tryCatch } from '../utils/tryCatch.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - correo
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: El Id autogenerado
 *         nombre:
 *           type: string
 *           description: el nombre del usuario
 *         apellido:
 *           type: string
 *           description: El apellido del usuario
 *         correo:
 *           type: string
 *           description: El Correo electronico del usuario
 *         password:
 *           type: string
 *           description: El password del usuario
 *       example:
 *         _id: 6673427446c8b93960df77bd
 *         nombre: Jane
 *         apellido: Doe
 *         correo: jane_doe@mailinator.com
 *         password: Letme1n@
 * 
 *     Usuarios:
 *       type: array
 *       items:
 *         type: object
 *         required:
 *           - nombre
 *           - apellido
 *           - correo
 *           - password
 *         properties:
 *           _id:
 *             type: string
 *             description: El Id autogenerado
 *           nombre:
 *             type: string
 *             description: el nombre del usuario
 *           apellido:
 *             type: string
 *             description: El apellido del usuario
 *           correo:
 *             type: string
 *             description: El Correo electronico del usuario
 *           password:
 *             type: string
 *             description: El password del usuario
 *         example:
 *           _id: 6673427446c8b93960df77bd
 *           nombre: Jane
 *           apellido: Doe
 *           correo: jane_doe@mailinator.com
 *           password: Letme1n@      
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: CRUD de usuarios
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: El usuario creado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error en el servidor
 *       400:
 *         description: Body no compatible
 *   get:
 *     summary: Obtiene una coleccion de usuarios
 *     tags: [usuarios]
 *     responses:
 *       200:
 *         description: Coleccion de usuatios.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Error en el servidor
 * /usuarios/{_id}:
 *   get:
 *     summary: Obtiene un usuario existente
 *     tags: [usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Obtiene usuario existente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error en el servidor
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Actualiza usuario existente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error en el servidor
 *       400:
 *         description: Body no compatible
 *   delete:
 *     summary: Elimina un usuario existente
 *     tags: [usuarios]
 *     responses:
 *       200:
 *         description: Eliminado con exito.
 *       500:
 *         description: Error en el servidor
 */
export const usuariosRouter = Router()

usuariosRouter.get('/usuarios', tryCatch(UsuariosController.obtenerUsuarios))

usuariosRouter.get('/usuarios/:id', tryCatch(UsuariosController.obtenerUsuario))

usuariosRouter.post('/usuarios', tryCatch(UsuariosController.crearUsuario))

usuariosRouter.put('/usuarios/:id', tryCatch(UsuariosController.modificarUsuario))

usuariosRouter.delete('/usuarios/:id', tryCatch(UsuariosController.eliminarUsuario))
