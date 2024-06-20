import { usuariosRepository } from "../repositories/usuariosRepository.js"
import { validarUsuario } from "../schemas/usuarioSchema.js" 
import { AppError } from "../utils/AppError.js"
import { ValidationError } from "../utils/ValidationError.js"
export class UsuariosController {

    static async obtenerUsuarios(req, res) {
        res.json(await usuariosRepository.obtenerUsuariosDB())
    }
    
    static async modificarUsuario(req, res) {
        const valido = await validarUsuario(req.body, true)
        if (valido.success) {
            const usuarioModificado = await usuariosRepository.modificarUsuarioDB(req.params.id, req.body)
            if (!usuarioModificado) {
                throw new AppError("El usuario no fue encontrado.", 404)
            }
            res.json(usuarioModificado)
        } else {
            throw new ValidationError(valido.error.issues, "ValidationError", 400)
        }
    }

    static async obtenerUsuario(req, res) {
        const usuario = await usuariosRepository.obtenerUnUsuario(req.params.id);
        if (usuario) {
            res.json(await usuariosRepository.obtenerUnUsuario(req.params.id))
            
        } else {
            throw new AppError("El usuario no fue encontrado.", 404)
        }
    }

     static async crearUsuario(req, res) {
        const valido = await validarUsuario(req.body)
        if (valido.success) {
            res.json(await usuariosRepository.crearUsuarioDB(req.body))
            
        } else {
            throw new ValidationError(valido.error.issues, "ValidationError", 400)
        }
    }

    static async eliminarUsuario(req, res) {
        const deleted = await usuariosRepository.eliminarUsuario(req.params.id)
        if (deleted) {
            res.status(200).send({message: "El usuario ha sido eliminado con exito."})
        } else {
            throw new AppError("El usuario no fue encontrado.", 404)
            
        }
    }
}