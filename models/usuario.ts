import { Schema, model } from 'mongoose';

const Usuario = new Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        require: true
    },
    updatedAt: {
        type: Date,
        require: true
    }
});

export default model('Usuario', Usuario);