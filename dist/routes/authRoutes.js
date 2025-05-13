"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authenticateJWT_1 = require("../middleware/authenticateJWT");
const router = express_1.default.Router();
router.post('/login', authController_1.login);
router.post('/logout', authenticateJWT_1.authenticateJWT, authController_1.logout);
exports.default = router;
