import { z } from 'zod'
import { usuariosRepository } from '../repositories/usuariosRepository.js';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
const crearUsuarioSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es un campo requerido.",
        required_error: 'El nombre deberia ser un string.'
    }),
    apellido: z.string({
        required_error: "El apellido es un campo requerido.",
        required_error: 'El apellido deberia ser un string.'
    }),
    correo: z.string({
        required_error: "El correo es un campo requerido.",
        required_error: 'El correo deberia ser un string.',
    }).email().refine(
        async (email) => {
            return await existeEmail(email);
        },
        "El Correo ya existe"
    ),
    password: z.string().regex(passwordPattern, "La contraseña deberia tener: al menos 8 caracteres, al menos una letra mayuscula y una minuscula, al menos un digito y al menos un caracter especial (!, @, #, $, %, etc.)")
}).refine(
    async (data) => {
        return await existeNombreApellido(data)
    },
    (data) => {
        return {message: `El usuario con el nombre ${data.nombre} y apellido ${data.apellido} ya existe`}
    } 
)

const actualizarUsuarioSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es un campo requerido.",
        required_error: 'El nombre deberia ser un string.'
    }),
    apellido: z.string({
        required_error: "El apellido es un campo requerido.",
        required_error: 'El apellido deberia ser un string.'
    }),
    password: z.string().regex(passwordPattern, "La contraseña deberia tener: al menos 8 caracteres, al menos una letra mayuscula y una minuscula, al menos un digito y al menos un caracter especial (!, @, #, $, %, etc.)")
})


    export async function validarUsuario (input, actualiza = false) {
        if (!actualiza) {

            return await crearUsuarioSchema.safeParseAsync(input)
        } else {
            return await actualizarUsuarioSchema.partial().safeParseAsync(input)

        }
    }

    async function existeEmail(email) {
        const record = await usuariosRepository.buscarUsuarioEmail(email);
        if (record) {
            return false
        } else {
            return true
        }
    }

    async function existeNombreApellido(input) {
        const record = await usuariosRepository.buscarPorNombreApellido(input)
        return !record;
    }

