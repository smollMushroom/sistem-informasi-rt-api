import { Role } from '@prisma/client';

export interface User {
  id: String;
  email: string;
  username: string;
  role: Role;
  token: string | null;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
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
  nationalId: string;
  phoneNumber: string;
  meritalStatus: string;
  occupation: string;
}

export interface UserEncryptedData {
  nationalId: string;
  nationalIdHash: string;
  phoneNumber: string;
  passwordHash: string;
  phoneNumberHash: string;
}

export interface UpdateUserInput {
  email: string;
  username?: string;
  role?: Role;
  token?: string;
  passwordHash?: string;

  profile?: {
    fullName?: string;
    address?: string;
    birthDate?: string;
    nationalId: string;
    phoneNumber: string;
    meritalStatus?: string;
    occupation?: string;
  };
}
