"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.post('/', usuarios_1.postUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
router.post('/login/', usuarios_1.login);
router.post('/reset/', usuarios_1.resetPassword);
exports.default = router;
//# sourceMappingURL=usuario.js.map