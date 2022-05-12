import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const getUserData = async( req: Request , res: Response ) => {
    
    const { id } = req.params;
    const usuario = await Usuario.findById( id ).select('-password').exec();

    try {

        if ( usuario ) {

            res.json(usuario);

        } else {

            res.status(404).json({
                error: `User does not exist`
            });
        }

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: 'Internal error'
        })    
    }   

}

export const putUserData = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    console.log(body);

    try {
        
        const usuario = await Usuario.findOneAndUpdate( { _id: id }, body ).select('-password').exec();
        if ( !usuario ) {
            return res.status(404).json({
                error: 'User does not exist'
            });
        }

        res.json( usuario );

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error: 'Internal error'
        });    
    }   
}