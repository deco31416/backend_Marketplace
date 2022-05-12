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
exports.putUserData = exports.getUserData = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findById(id).select('-password').exec();
    try {
        if (usuario) {
            res.json(usuario);
        }
        else {
            res.status(404).json({
                error: `User does not exist`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal error'
        });
    }
});
exports.getUserData = getUserData;
const putUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    console.log(body);
    try {
        const usuario = yield usuario_1.default.findOneAndUpdate({ _id: id }, body).select('-password').exec();
        if (!usuario) {
            return res.status(404).json({
                error: 'User does not exist'
            });
        }
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal error'
        });
    }
});
exports.putUserData = putUserData;
//# sourceMappingURL=profile.js.map