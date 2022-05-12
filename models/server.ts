import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import profileRoutes from '../routes/profile';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        profiles: '/api/profiles'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db();
            console.log('Database online');

        } catch (error: any) {
            console.log(error);
            throw new Error( error );
        }

    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.apiPaths.usuarios, userRoutes );
        this.app.use( this.apiPaths.profiles, profileRoutes );
    }

    listen() {
        this.app.listen( process.env.PORT || this.port, () => {
            console.log('Servidor corriendo en puerto: ' + process.env.PORT );
        });
    }

}

export default Server;