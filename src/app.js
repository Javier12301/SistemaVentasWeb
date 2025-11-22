import express from 'express';
import cors from 'cors';
//import authRoutes from './routes/auth.routes.js';
//import productRoutes from './routes/products.routes.js';

//Configuración dirname y filename para módulos ES
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// // // // // // // // // // // //

const app = express();

// Middlewares
// Recordatorio: CORS permite al navegador solicitar recurso de un dominio diferente al de la página que visitamos
app.use(cors());
app.use(express.json()); // para que el servidor entienda JSON

// Configuración Middleware para archivos estáticos
const PUBLIC_PATH = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_PATH));

// RUTAS DE API
//app.use('/api/auth', authRoutes);
//app.use('/api/products', productRoutes);

// Rutas
app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', { root: PUBLIC_PATH});
});

app.get('/login', (req, res) => {
    res.status(200).sendFile('login.html', { root: PUBLIC_PATH});
})

app.get('/register', (req, res) => {
    res.status(200).sendFile('register.html', { root: PUBLIC_PATH});
})

app.get('/admin', (req, res) => {
    res.status(200).sendFile('admin.html', { root: path.join(PUBLIC_PATH, 'admin')});
})



// las rutas planificadas son auth y products
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

// Manejar los errores 404
app.use((req, res, next) => {
    res.status(404);

    // Si petición pide html, enviamos 404.html de public
    if (req.accepts('html')){
        // Insertamos 404.html, buscando en la carpeta public
        return res.sendFile('404.html', { root: PUBLIC_PATH} );
    }

    // Si petición pide json (por lo general las APIs) enviamos json
    if (req.accepts('json')){
        return res.json({ message: 'Recurso no encontrado '});
    }

    // Por defecto enviamos texto plano
    res.type('txt').send('Recurso no encontrado');
})

export default app;