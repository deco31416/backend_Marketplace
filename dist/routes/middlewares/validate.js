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
const usuario_1 = __importDefault(require("../../models/usuario"));
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('auth-token');
    try {
        if (!token) {
            return res.status(401).json({ error: 'Access denied' });
        }
        const profileData = yield jwt.verify(token, process.env.JWT_PASSWORD);
        const exists = yield usuario_1.default.findById(profileData._doc._id).select('-password').exec();
        if (exists.email !== profileData._doc.email) {
            return res.status(401).json({ error: 'Forbidden' });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
});
exports.default = verifyToken;
//# sourceMappingURL=validate.js.map