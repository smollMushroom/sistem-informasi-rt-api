"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const letterRequestController_1 = require("../controllers/letterRequestController");
const authenticateJWT_1 = require("../middleware/authenticateJWT");
const validate_1 = require("../middleware/validate");
const createLetterRequestSchema_1 = require("../validators/letterRequest/createLetterRequestSchema");
const updateLetterRequestSchema_1 = require("../validators/letterRequest/updateLetterRequestSchema");
const router = express_1.default.Router();
router.get('/', authenticateJWT_1.authenticateJWT, letterRequestController_1.getAllLetterRequestsController);
router.get('/:id', authenticateJWT_1.authenticateJWT, letterRequestController_1.getLetterRequestByIdController);
router.post('/', authenticateJWT_1.authenticateJWT, (0, validate_1.validate)(createLetterRequestSchema_1.createLetterRequestSchema), letterRequestController_1.createLetterRequestController);
router.put('/:id', authenticateJWT_1.authenticateJWT, (0, validate_1.validate)(updateLetterRequestSchema_1.updateLetterRequestSchema), letterRequestController_1.updateLetterRequestController);
router.delete('/:id', authenticateJWT_1.authenticateJWT, letterRequestController_1.deleteLetterRequestController);
exports.default = router;
