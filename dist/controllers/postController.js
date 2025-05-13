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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const postService_1 = require("../services/postService");
const error_1 = require("../utils/error");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    const withThumbnail = req.query.withThumbnail !== undefined ? req.query.withThumbnail === 'true' : true;
    const withContent = req.query.withContent !== undefined ? req.query.withContent === 'true' : true;
    const option = Object.assign(Object.assign({}, req.query), { withThumbnail: withThumbnail, withContent: withContent, page: Number(page !== null && page !== void 0 ? page : 1), limit: Number(limit !== null && limit !== void 0 ? limit : 5) });
    try {
        const posts = yield (0, postService_1.getPostsService)(option);
        if (posts.status === 'fail') {
            res.status(404).json(posts);
            return;
        }
        res.json(posts);
    }
    catch (error) {
        next(error);
    }
});
exports.getPosts = getPosts;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const option = req.query;
    if (!option) {
        return next(new error_1.NotFoundError("parameter dibutuhkan"));
    }
    try {
        const Post = yield (0, postService_1.getPostBySlugService)(option);
        res.status(201).json(Post);
    }
    catch (error) {
        next(error);
    }
});
exports.getPost = getPost;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const postData = req.body;
    try {
        const createdPost = yield (0, postService_1.createPostService)({ postData, userId });
        res.status(201).json(createdPost);
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const id = req.params.id;
    const updateData = req.body;
    try {
        const updatedPost = yield (0, postService_1.updatePostService)({ id, userId, updateData });
        res.json(updatedPost);
    }
    catch (error) {
        return next(error);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedPost = yield (0, postService_1.deletePostService)(id);
        res.json(deletedPost);
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
