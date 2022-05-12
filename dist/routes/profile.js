"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_1 = require("../controllers/profile");
const validate_1 = __importDefault(require("../routes/middlewares/validate"));
const router = (0, express_1.Router)();
router.get('/:id', validate_1.default, profile_1.getUserData);
router.put('/:id', validate_1.default, profile_1.putUserData);
exports.default = router;
//# sourceMappingURL=profile.js.map