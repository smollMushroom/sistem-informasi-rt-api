"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const validate_1 = require("../middleware/validate");
const createPostSchema_1 = require("../validators/post/createPostSchema");
const authenticateJWT_1 = require("../middleware/authenticateJWT");
const authorizeRoles_1 = require("../middleware/authorizeRoles");
const roles_1 = require("../config/roles");
const updatePostShema_1 = require("../validators/post/updatePostShema");
const router = express_1.default.Router();
//public
router.get('/', postController_1.getPosts);
router.get('/detail', postController_1.getPost);
//admin
router.post('/', (0, validate_1.validate)(createPostSchema_1.createPostSchema), authenticateJWT_1.authenticateJWT, (0, authorizeRoles_1.authorizeRoles)(...roles_1.roles.pengurus), postController_1.createPost);
router.put('/:id', (0, validate_1.validate)(updatePostShema_1.updatePostSchema), authenticateJWT_1.authenticateJWT, (0, authorizeRoles_1.authorizeRoles)(...roles_1.roles.pengurus), postController_1.updatePost);
router.delete('/:id', authenticateJWT_1.authenticateJWT, (0, authorizeRoles_1.authorizeRoles)(...roles_1.roles.pengurus), postController_1.deletePost);
exports.default = router;
