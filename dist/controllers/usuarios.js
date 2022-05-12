"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.postUsuario = exports.login = exports.getUsuarios = exports.resetPassword = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const mails_1 = __importDefault(require("../mails/mails"));
const jwt = require('jsonwebtoken');
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const mails = new mails_1.default(body.email);
    let usuario = yield usuario_1.default.findOne({ email: body.email }).select('-password').exec();
    if (!usuario) {
        res.status(404).json({
            error: `Email does not exist ${body.email}`
        });
    }
    const code = yield mails.sendMessage();
    const payload = Object.assign(Object.assign({}, usuario), { code });
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_PASSWORD);
    const response = { token };
    res.json(response);
});
exports.resetPassword = resetPassword;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.find().select('-password');
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const usuario = yield usuario_1.default.findOne({ email: body.email, password: body.password }).select('-password');
    if (!usuario) {
        res.status(404).json({
            error: "Wrong user or password"
        });
    }
    else {
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
});
exports.login = login;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body } = req;
    body.createdAt = new Date().toDateString().toString();
    body.updatedAt = new Date().toDateString().toString();
    try {
        const exists = yield usuario_1.default.findOne({ email: body.email }).select('-password').exec();
        if (exists) {
            return res.status(400).json({
                error: 'Email already used'
            });
        }
        const usuario = new usuario_1.default(body);
        const result = yield usuario.save();
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error internal' });
    }
});
exports.postUsuario = postUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findOneAndDelete({ _id: id });
    if (!usuario) {
        return res.status(404).json({
            error: 'User does not exist ' + id
        });
    }
    res.json(usuario);
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map