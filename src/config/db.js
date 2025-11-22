import mongoose from 'mongoose';

// Configuración de conexión a la BD
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    }catch(error){
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}

export default connectDB;
