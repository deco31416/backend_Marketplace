import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import SendMails from '../mails/mails';
const jwt = require('jsonwebtoken');

export const resetPassword = async( req: Request, res: Response ) => {

    const { body } = req;
    const mails = new SendMails(body.email);
    let usuario = await Usuario.findOne({ email: body.email }).select('-password').exec();

    if ( !usuario ) {

        res.status(404).json({
            error: `Email does not exist ${ body.email }`
        });

    }

    const code = await mails.sendMessage();
    const payload = {
        ...usuario,
        code
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_PASSWORD);
    const response = { token };

    res.json(response);

}

export const getUsuarios = async( req: Request , res: Response ) => {

    const usuarios = await Usuario.find().select('-password');

    res.json({ usuarios });
}

export const login = async( req: Request, res: Response ) => {

    const { body } = req;
    const usuario = await Usuario.findOne({ email: body.email, password: body.password }).select('-password');

    if ( !usuario ) {

        res.status(404).json({
            error: "Wrong user or password"
        });

    } else {

        console.log(usuario);

        const payload = {
            id: usuario._id,
            name: usuario.nombre,
            email: usuario.email
        };

        console.log(payload);

        const token = jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn: '1d' });

        res.json({
            message: 'Autenticación correcta',
            token
        });
    }
}

export const postUsuario = async( req: Request , res: Response ) => {

    let { body } = req;

    body.createdAt = new Date().toDateString().toString();
    body.updatedAt = new Date().toDateString().toString();

    try {
        
        const exists = await Usuario.findOne({ email: body.email }).select('-password').exec();

        if (exists) {
            return res.status(400).json({
                error: 'Email already used'
            });
        }

        const usuario = new Usuario(body);
        const result = await usuario.save();

        const payload = {
            id: result._id,
            name: result.nombre,
            email: result.email
        };

        const token = jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn: '1d' });

        res.json({
            message: 'Autenticación correcta',
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({ error: 'Error internal' });    
    }
}

export const deleteUsuario = async( req: Request , res: Response ) => {

    const { id } = req.params;
    const usuario = await Usuario.findOneAndDelete({ _id: id } );

    if ( !usuario ) {
        return res.status(404).json({
            error: 'User does not exist ' + id
        });
    }

    res.json(usuario);
}
