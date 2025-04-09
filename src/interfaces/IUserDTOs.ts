import { Role } from "@prisma/client";

export interface UserResponseDTO {
  email: string;
  username: string;
  role: Role
  token: string | null
  profile: {
    fullName: string;
    address: string;
    birthDate: string;
    phoneNumber: string;
    nationalId: string;
    phoneNumberHash: string;
    nationalIdHash: string;
    meritalStatus: string;
    occupation: string;
  };
}