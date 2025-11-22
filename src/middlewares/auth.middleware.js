import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = (req, res, next) =>{
    let token;
    // Obtener token de la Cooekie
    token = req.cookies.token;

    // Fallback o alternativa: Si no está en la cookie
    // ej si se llama desde Postman con un header Authorization
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // explicación, primero verificamos que token esté vacío, luego verificamos que el header de la solicitud HTTP tiene un encabezado Authorization
        // y luego verificamos que el valor del encabezado, comiente con Bearer (portador) el cual es formato estándar para tokens JWT en encabezados HTTP
        // luego, una vez verificado, dividimos valor de encabezado en array usando espacio como separador, despues [1] accedemos al segundo elemento que es el JWT en si
        token = req.headers.authorization.split(' ')[1];
    }


}

export const adminOnly = (req, res, next) => {

}