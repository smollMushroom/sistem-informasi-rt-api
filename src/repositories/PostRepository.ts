import { prisma } from '../config/database';
import {
  FindPostOption,
  GetPostsOption,
  NewPostRepository,
  UpdatePostRepository,
} from '../interfaces/IPost';

class PostRepository {
  static findAllPosts = async (option: GetPostsOption) => {
    const { limit, order, skip, sortBy, search, withContent, withThumbnail } = option;

    const [posts, totalPost] = await Promise.all([
      prisma.post.findMany({
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
      prisma.post.count(),
    ]);

    return { posts, totalPost };
  };

  static findPost = async (option: FindPostOption) => {
    const { id, authorId, slug, type } = option;

    const post = await prisma.post.findMany({
      where: {
        OR: [{ id }, { authorId }, { slug }, { type }],
      },
      include: { author: { select: { username: true, role: true } } },
    });

    return post;
  };

  static createPost = async (postData: NewPostRepository) => {
    return await prisma.post.create({
      data: {
        ...postData,
      },
    });
  };

  static updatePost = async ({ id, updateData }: UpdatePostRepository) => {
    return await prisma.post.update({
      where: { id },
      data: { ...updateData },
    });
  };

  static deletePost = async (id: string) => {
    return prisma.post.delete({ where: { id } });
  };
}

export default PostRepository;
