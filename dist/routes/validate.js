"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const { headers } = req;
    const { status } = res;
    const token = req.header('auth-token');
    if (!token) {
        return status(401).json({ error: 'Acceso denegado' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_PASSWORD);
        next();
    }
    catch (error) {
        status(400).json({ error: 'token no es válido' });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=validate.js.map