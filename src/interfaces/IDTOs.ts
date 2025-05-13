import { Role } from '@prisma/client';
import { Post } from './IPost';
import { User } from '@prisma/client';
import { LetterRequest } from './ILetterRequest';

export interface UserResponseDTO {
  status: 'success' | 'fail';
  message: string;
  data: {
    users: UserDTO[] | UserDTO
    pagination: Pagination
  }
}

export interface PostResponseDTO {
  status: 'success' | 'fail';
  message: string;
  data: {
    posts: Post[] | Post;
    pagination?: Pagination;
  };
}

export interface Pagination {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface PostMapper {
  status: 'success' | 'fail';
  message: string;
  posts: Post[] | Post;
  pagination: Pagination;
}

export interface UserMapper {
  status: 'success' | 'fail';
  message: string;
  users: User[];
  pagination: Pagination;
  option?: {
    withPosts?: boolean;
    withProfile?: boolean;
  };
}

export interface UserDTO {
  id: string;
  email: string;
  username: string;
  role: Role;
  token?: string | null;
  createdAt: Date;
  updatedAt: Date;
  profile?: {
    fullName: string;
    address: string;
    birthDate: string;
    birthPlace: string;
    nationalId: string;
    phoneNumber: string;
    meritalStatus: string;
    occupation: string;
    gender: 'male' | 'female';
    nationality: string;
    religion: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu';
    createAt: Date;
    updatedAt: Date;
    sign?: string;
  };
  post?: Post;
}

export interface LetterRequestMapper {
  letterRequests: LetterRequest[];
  pagination: Pagination;
  message: string;
  status: 'success' | 'fail';
}

export interface LetterRequestResponseDTO {
  message: string;
  status: 'success' | 'fail';
  data: {
    letterRequests: LetterRequest[];
    pagination: Pagination;
  };
}
