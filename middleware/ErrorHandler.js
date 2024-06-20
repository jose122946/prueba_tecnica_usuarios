import { AppError } from "../utils/AppError.js";
import { ValidationError } from "../utils/ValidationError.js";


const errorHandler = (error, req, res, next) => {    
    if (error instanceof ValidationError) {
        const messages = error.zodResponse.map(item => {
            return {mensaje: item.message}
        })
        const response = {errores: messages}
      return res.status(error.statusCode).json(response);
    }

    if (error instanceof AppError) {
        const response = {
            error: {
                mensaje: error.message
            }
        }
      return res.status(error.statusCode).json(response);
    }

    return res.status(500).send("Something went wrong");

  };
  
  export default errorHandler; 