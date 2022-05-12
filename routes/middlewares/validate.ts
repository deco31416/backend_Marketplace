import { Request, Response } from 'express';
import Usuarios from '../../models/usuario'

const jwt = require('jsonwebtoken')
const verifyToken = async (req: Request, res: Response, next: any) => {

    const token = req.header('auth-token');

    try {

        if (!token) { 
        
            return res.status(401).json({ error: 'Access denied' });
    
        }

        const profileData = await jwt.verify(token, process.env.JWT_PASSWORD);
        const exists = await Usuarios.findById(profileData._doc._id).select('-password').exec();

        if (exists.email !== profileData._doc.email) {
            
            return res.status(401).json({error: 'Forbidden'});

        }

        next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({error: 'Invalid token'});

    }
}

export default verifyToken;