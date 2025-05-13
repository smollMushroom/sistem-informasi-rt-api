import { Pagination } from '../interfaces/IDTOs';
import { FindPostOption, GetPostsOption, NewPostService, UpdatePostService } from '../interfaces/IPost';
import PostRepository from '../repositories/PostRepository';
import { NotFoundError } from '../utils/error';
import generateId from '../utils/generateId';
import mapPostToDTO from '../utils/postMapper';

export const getPostsService = async (option: GetPostsOption) => {
  const page = option.page ?? 1;
  const limit = option.limit ?? 10;
  const skip = (page - 1) * limit;

  const allowedSortFields = ['title', 'type', 'updatedAt'];
  const sortBy = allowedSortFields.includes(option.sortBy ?? '') ? option.sortBy : 'publishedAt';

  const {posts, totalPost} = await PostRepository.findAllPosts({
    ...option,
    skip,
    sortBy
  });

  const pagination: Pagination = {
    totalItems: totalPost,
    currentPage: page,
    pageSize: limit,
    totalPages: Math.ceil(totalPost / limit)
  }

  return mapPostToDTO({
    message: posts.length ? 'Posts retrieved successfully' : 'No posts found',
    pagination,
    posts,
    status: posts.length ? 'success' : 'fail'
  });
};

export const getPostBySlugService = async (option: FindPostOption) => {
  const post = await PostRepository.findPost(option);
  if(!post) {
    throw new NotFoundError('Post tidak ditemukan');
  }
  return post;
};

export const createPostService = async ({postData, userId}: NewPostService) => {
  const newPost = {
    ...postData,
    slug: `${postData.title.split(' ').join('-').toLocaleLowerCase()}-${generateId()}`,
    authorId: userId
  }
  const createdPost = await PostRepository.createPost(newPost)
  
  return createdPost;
};

export const updatePostService = async ({id, userId, updateData}: UpdatePostService) => {
  const post = await PostRepository.findPost({id});
  
  if (!post.length){ 
    throw new NotFoundError('Post tidak ditemukan')
  }
  
  const updatePostData = {
    ...updateData,
    slug: `${updateData.title?.split(' ').join('-').toLocaleLowerCase()}-${generateId()}`,
    authorId: userId
  }

  return await PostRepository.updatePost({id, updateData: updatePostData})
}

export const deletePostService = async (id: string) => {
  const post = await PostRepository.findPost({id});
  
  if (!post.length){ 
    throw new NotFoundError('Post tidak ditemukan')
  }
  return await PostRepository.deletePost(id);
}