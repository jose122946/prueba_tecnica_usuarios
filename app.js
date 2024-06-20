import express, { json } from 'express'
import {usuariosRouter} from './routes/usuariosRoutes.js'
import errorHandler from './middleware/ErrorHandler.js'
import cors from './middleware/cors.js'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
// import { configDotenv } from 'dotenv'
const app = express()

const PORT = process.env.PORT || 5000
app.disable('x-powered-by')
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Prueba Tecnica API CRUD usuarios",
        version: "1.0",
        description:
          "Este es un Crud de usuarios",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Humberto Cen",
          email: "jose122946@hotmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
app.use(json())

app.use(cors);
app.use('/', usuariosRouter)

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})

export default app

//TODO error handling y tests