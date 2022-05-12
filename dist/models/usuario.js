"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Usuario = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Usuario', Usuario);
//# sourceMappingURL=usuario.js.map