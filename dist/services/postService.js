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
exports.deletePostService = exports.updatePostService = exports.createPostService = exports.getPostBySlugService = exports.getPostsService = void 0;
const PostRepository_1 = __importDefault(require("../repositories/PostRepository"));
const error_1 = require("../utils/error");
const generateId_1 = __importDefault(require("../utils/generateId"));
const postMapper_1 = __importDefault(require("../utils/postMapper"));
const getPostsService = (option) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const page = (_a = option.page) !== null && _a !== void 0 ? _a : 1;
    const limit = (_b = option.limit) !== null && _b !== void 0 ? _b : 10;
    const skip = (page - 1) * limit;
    const allowedSortFields = ['title', 'type', 'updatedAt'];
    const sortBy = allowedSortFields.includes((_c = option.sortBy) !== null && _c !== void 0 ? _c : '') ? option.sortBy : 'publishedAt';
    const { posts, totalPost } = yield PostRepository_1.default.findAllPosts(Object.assign(Object.assign({}, option), { skip,
        sortBy }));
    const pagination = {
        totalItems: totalPost,
        currentPage: page,
        pageSize: limit,
        totalPages: Math.ceil(totalPost / limit)
    };
    return (0, postMapper_1.default)({
        message: posts.length ? 'Posts retrieved successfully' : 'No posts found',
        pagination,
        posts,
        status: posts.length ? 'success' : 'fail'
    });
});
exports.getPostsService = getPostsService;
const getPostBySlugService = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield PostRepository_1.default.findPost(option);
    if (!post) {
        throw new error_1.NotFoundError('Post tidak ditemukan');
    }
    return post;
});
exports.getPostBySlugService = getPostBySlugService;
const createPostService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ postData, userId }) {
    const newPost = Object.assign(Object.assign({}, postData), { slug: `${postData.title.split(' ').join('-').toLocaleLowerCase()}-${(0, generateId_1.default)()}`, authorId: userId });
    const createdPost = yield PostRepository_1.default.createPost(newPost);
    return createdPost;
});
exports.createPostService = createPostService;
const updatePostService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, userId, updateData }) {
    var _b;
    const post = yield PostRepository_1.default.findPost({ id });
    if (!post.length) {
        throw new error_1.NotFoundError('Post tidak ditemukan');
    }
    const updatePostData = Object.assign(Object.assign({}, updateData), { slug: `${(_b = updateData.title) === null || _b === void 0 ? void 0 : _b.split(' ').join('-').toLocaleLowerCase()}-${(0, generateId_1.default)()}`, authorId: userId });
    return yield PostRepository_1.default.updatePost({ id, updateData: updatePostData });
});
exports.updatePostService = updatePostService;
const deletePostService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield PostRepository_1.default.findPost({ id });
    if (!post.length) {
        throw new error_1.NotFoundError('Post tidak ditemukan');
    }
    return yield PostRepository_1.default.deletePost(id);
});
exports.deletePostService = deletePostService;
