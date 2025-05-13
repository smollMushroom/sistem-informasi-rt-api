import { NextFunction, Request, Response } from "express";
import { createPostService, deletePostService, getPostBySlugService, getPostsService, updatePostService } from "../services/postService";
import { NotFoundError } from "../utils/error";
import { JwtPayload } from "../interfaces/IJWT";
import { FindPostOption, GetPostsOption, NewPostData } from "../interfaces/IPost";

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query as GetPostsOption;
  const withThumbnail = req.query.withThumbnail !== undefined ? req.query.withThumbnail === 'true' : true;
  const withContent = req.query.withContent !== undefined ? req.query.withContent === 'true' : true;

  const option: GetPostsOption = {
    ...req.query,
    withThumbnail: withThumbnail,
    withContent: withContent,
    page: Number(page ?? 1),
    limit: Number(limit ?? 5),
  }
  
  try {
    const posts = await getPostsService(option);

    if(posts.status === 'fail') {
      res.status(404).json(posts);
      return;
    }
    
    res.json(posts);
  } catch (error) {
    next(error)
  }
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const option = req.query as FindPostOption;
  
  if(!option) {
    return next(new NotFoundError("parameter dibutuhkan"))
  }

  try {
    const Post = await getPostBySlugService(option);
    res.status(201).json(Post)
  } catch (error) { 
    next(error)
  }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user as JwtPayload
  const postData = req.body as NewPostData;

  try {
    const createdPost = await createPostService({postData, userId});
    res.status(201).json(createdPost);
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user as JwtPayload
  const id = req.params.id;
  const updateData= req.body;

  try {
    const updatedPost = await updatePostService({id, userId, updateData})
    res.json(updatedPost) 
  } catch (error) {
    return next(error)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
    
  try {
    const deletedPost = await deletePostService(id);
    res.json(deletedPost);
  } catch (error) {
    next(error);
  }
}
