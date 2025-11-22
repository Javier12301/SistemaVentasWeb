import express from "express";
const router = express.Router();

// Importar las funciones del controlador de autenticación
import {
    registerUser,
    loginUser,
    logoutUser
} from '../controllers/auth.controller.js';


import { protect, adminOnly } from '../middlewares/auth.middleware.js';

// Rutas de autenticación
router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

// Ruta de prueba
// GET /api/auth/me -> verificar validez del token
// si token es valido y es admin, devolve info de usuario
router.get('/me', protect, adminOnly, (req, res) =>{
    res.json({
        success: true,
        message: 'Acceso autorizado al perfil',
        user: {
            id: req.user._id,
            username: req.user.username,
            role: req.user.role
        }
    });
});

export default router;