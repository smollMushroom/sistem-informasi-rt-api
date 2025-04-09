import { prisma } from '../config/database';
import { NewUserInput, UpdateUserInput, UserEncryptedData } from '../interfaces/IUser';

export const findAllUsers = async () => {
  return await prisma.user.findMany({ include: { profile: true } });
};

export const findUserByEmailOrUsername = async (search: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: search }, { username: search }],
    },
    include: { profile: true },
  });
};

export const createUser = async (
  data: NewUserInput,
  encryptedData: UserEncryptedData
) => {
  return await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      role: data.role,
      token: data.token,
      passwordHash: encryptedData.passwordHash,
      profile: {
        create: {
          fullName: data.profile.fullName,
          address: data.profile.address,
          birthDate: data.profile.birthDate,
          phoneNumber: encryptedData.phoneNumber,
          nationalId: encryptedData.nationalId,
          phoneNumberHash: encryptedData.phoneNumberHash,
          nationalIdHash: encryptedData.nationalIdHash,
          meritalStatus: data.profile.meritalStatus,
          occupation: data.profile.occupation,
        },
      },
    },
    include: {profile: true}
  });
};

export const updateUser = async (data: UpdateUserInput) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    include: { profile: true },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return await prisma.user.update({
    where: { email: data.email },
    data: {
      username: data.username,
      role: data.role,
      token: data.token,
      passwordHash: data.passwordHash,
      profile: {
        update: {
          fullName: data.profile?.fullName,
          address: data.profile?.address,
          birthDate: data.profile?.birthDate,
          meritalStatus: data.profile?.meritalStatus,
          occupation: data.profile?.occupation,
          phoneNumber: data.profile?.phoneNumber,
          nationalId: data.profile?.nationalId,
        },
      },
    },
    include: { profile: true },
  });
};