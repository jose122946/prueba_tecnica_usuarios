
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const uri = 'mongodb://mongodb:27017/'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})


async function connect() {
    try {
        await client.connect()
        const database = client.db('prueba_tecnica')
        return database.collection('usuarios')
    } catch(error) {
        console.error('Error conectando a la base de datos')
    console.error(error)
    await client.close()
    }
}

export class usuariosRepository {

    static async obtenerUsuariosDB() {
        const db = await connect()
        return db.find({}).toArray()
    }

    static async crearUsuarioDB(input) {
        const db = await connect()
        const { insertedId} = await db.insertOne(input)

        return input
    }

    static async buscarUsuarioEmail(email) {
        const db = await connect()
        return db.findOne({correo: email})
    }

    static async modificarUsuarioDB(id, input) {
        const db = await connect()
        const objectId = new ObjectId(id)
        db.updateOne({_id: objectId}, { $set: input }, { returnNewDocument: true })
        return this.obtenerUnUsuario(id)
    }

    static async obtenerUnUsuario(id) {
        const db = await connect()
        const objectId = new ObjectId(id)
        return await db.findOne({_id: objectId})
    }

    static async eliminarUsuario(id) {
        const db = await connect()
        const objectId = new ObjectId(id)
        return await db.findOneAndDelete({_id: objectId})
    }

    static async buscarPorNombreApellido(input) {
        const db = await connect()
        return await db.findOne({nombre: input.nombre, apellido: input.apellido})
    }
}