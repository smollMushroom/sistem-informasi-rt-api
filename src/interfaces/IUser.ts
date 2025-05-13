import { Role } from '@prisma/client';
import { Post } from './IPost';

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
  token: string | null;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
  post?: Post
}

export interface Profile {
  fullName: string;
  address: string;
  birthDate: string;
  nationalId: string;
  phoneNumber: string;
  nationalIdHash: string;
  phoneNumberHash: string;
  meritalStatus: string;
  occupation: string;
  gender: 'male' | 'female';
  nationality: string;
  religion: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu';
}

export interface NewUserInput {
  email: string;
  role: Role;
  token: string | null;
  username: string;
  password: string;
  profile: NewUserProfile;
}

export interface NewUserProfile {
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
}

export interface UserEncryptedData {
  nationalId: string;
  nationalIdHash: string;
  phoneNumber: string;
  passwordHash: string;
  phoneNumberHash: string;
}

export interface UserUpdateEncryptedData {
  nationalId?: string;
  nationalIdHash?: string;
  phoneNumber?: string;
  passwordHash?: string;
  phoneNumberHash?: string;
}

export interface UpdateUserInput {
  email?: string;
  username?: string;
  role?: Role;
  token?: string;
  profile?: {
    fullName?: string;
    address?: string;
    birthDate?: string;
    birthPlace?: string;
    nationalId?: string;
    phoneNumber?: string;
    meritalStatus?: string;
    occupation?: string;
    gender?: 'male' | 'female';
    nationality?: string;
    sign?: string;
    religion?: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu';
  };
}

export interface UserQuery {
  withProfile?: string;
  withPosts?: string;
  search?: string;
  role?: Role;
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
} 

export interface UserOption{
  withProfile?: boolean;
  withPosts?: boolean;
  role?: Role;
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  search?: string;
  order?: 'asc' | 'desc'
}