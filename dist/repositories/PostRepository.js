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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
class PostRepository {
}
_a = PostRepository;
PostRepository.findAllPosts = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, order, skip, sortBy, search, withContent, withThumbnail } = option;
    const [posts, totalPost] = yield Promise.all([
        database_1.prisma.post.findMany({
            skip,
            take: limit,
            orderBy: {
                [typeof sortBy === 'string' ? sortBy : 'publishedAt']: order
                    ? order
                    : 'asc',
            },
            where: {
                OR: search
                    ? [
                        { slug: { equals: search, mode: 'default' } },
                        { id: { equals: search, mode: 'default' } },
                        { title: { contains: search, mode: 'insensitive' } },
                    ]
                    : undefined,
            },
            select: {
                id: true,
                title: true,
                slug: true,
                type: true,
                content: withContent,
                thumbnail: withThumbnail,
                authorId: true,
                publishedAt: true,
                updatedAt: true,
                author: {
                    select: {
                        username: true,
                        role: true,
                    },
                },
            },
        }),
        database_1.prisma.post.count(),
    ]);
    return { posts, totalPost };
});
PostRepository.findPost = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, authorId, slug, type } = option;
    const post = yield database_1.prisma.post.findMany({
        where: {
            OR: [{ id }, { authorId }, { slug }, { type }],
        },
        include: { author: { select: { username: true, role: true } } },
    });
    return post;
});
PostRepository.createPost = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.post.create({
        data: Object.assign({}, postData),
    });
});
PostRepository.updatePost = (_b) => __awaiter(void 0, [_b], void 0, function* ({ id, updateData }) {
    return yield database_1.prisma.post.update({
        where: { id },
        data: Object.assign({}, updateData),
    });
});
PostRepository.deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.prisma.post.delete({ where: { id } });
});
exports.default = PostRepository;
