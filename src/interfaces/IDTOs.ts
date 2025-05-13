import { Role } from '@prisma/client';
import { Post } from './IPost';
import { User } from '@prisma/client';
import { LetterRequest } from './ILetterRequest';
import { EventScheduleResponse } from './IEvent';

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

export interface EventScheduleMapper {
  events: EventScheduleResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  message: string;
  status: string;
}

export interface EventScheduleResponseDTO {
  message: string;
  status: string;
  data: {
    events: EventScheduleResponse[];
    pagination: {
      totalItems: number;
      currentPage: number;
      totalPages: number;
      pageSize: number;
    };
  };
}
