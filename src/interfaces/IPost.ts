import { User } from './IUser';

export interface Post {
  id: string;
  title: string;
  slug: string | null;
  thumbnail: string | null;
  content: string;
  type: 'announcement' | 'news';
  authorId: string | null;
  author: {username: string, role: string} | null;
  publishedAt: Date;
  updatedAt: Date;
}

export interface GetPostsOption {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc'
  search?: string
  withContent?: boolean;
  withThumbnail?: boolean;
  // filter?: string[]
}

export interface NewPostData {
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  type: 'announcement' | 'news';
  authorId?: string;
}

export interface NewPostService {
  postData: NewPostData,
  userId: string;
}

export interface NewPostRepository extends NewPostData{
}


export interface UpdatePostData {
  title?: string;
  slug?: string;
  thumbnail?: string;
  content?: string;
  type?: 'announcement' | 'news';
  authorId?: string;
}

export interface UpdatePostService {
  id: string; // postId
  userId: string; // userId as authorId
  updateData: UpdatePostData;
}

export interface UpdatePostRepository {
  id: string
  updateData: UpdatePostData
}


export interface FindPostOption {
 id?: string,
 slug?: string,
 authorId?: string
 type?: 'announcement' | 'news'
}

