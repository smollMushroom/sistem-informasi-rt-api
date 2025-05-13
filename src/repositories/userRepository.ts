import { prisma } from '../config/database';
import {
  UserOption,
  NewUserInput,
  UpdateUserInput,
  UserEncryptedData,
  UserUpdateEncryptedData,
} from '../interfaces/IUser';

export const findAllUsers = async (
  option?: UserOption & { search?: string }
) => {
  const {
    search,
    role,
    withPosts,
    withProfile,
    limit = 5,
    page = 1,
    skip,
    sortBy = 'createdAt',
    order = 'desc',
  } = option || {};

  
  const whereClause: any = {};

  if (role) {
    whereClause.role = role;
  }

  if (search) {
    whereClause.OR = [{ id: search }, { email: search }, { username: search }];
  }

  const parsedLimit = Number(limit) || 5;
  const parsedPage = Number(page) || 1;
  const paginationSkip = skip != undefined ? skip : (parsedPage - 1) * parsedLimit;

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      include: {
        profile: withProfile,
        posts: withPosts,
      },
      skip: paginationSkip,
      take: parsedLimit,
      orderBy: {
        [sortBy]: order,
      },
    }),
    prisma.user.count({
      where: whereClause,
    }),
  ]);

  return { users, totalUsers };
};

export const findUser = async (search: string, option?: UserOption) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ id: search }, { email: search }, { username: search }],
    },
    include: {
      profile: option?.withProfile,
      posts: option?.withPosts,
    },
  });
};

export const createUser = async (
  data: NewUserInput,
  encryptedData: UserEncryptedData
) => {
  const { email, role, token, username, profile } = data;
  const {
    address,
    birthDate,
    fullName,
    meritalStatus,
    occupation,
    birthPlace,
    gender,
    nationality,
    religion,
  } = profile;
  const {
    nationalId,
    nationalIdHash,
    passwordHash,
    phoneNumber,
    phoneNumberHash,
  } = encryptedData;
  return await prisma.user.create({
    data: {
      email,
      username,
      role,
      token,
      passwordHash,
      profile: {
        create: {
          gender,
          nationality,
          religion,
          fullName,
          address,
          birthDate,
          birthPlace,
          phoneNumber,
          nationalId,
          phoneNumberHash,
          nationalIdHash,
          meritalStatus,
          occupation,
        },
      },
    },
    include: { profile: true },
  });
};

export const updateUser = async (id: string, data: UpdateUserInput, encryptedData: UserUpdateEncryptedData) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  return await prisma.user.update({
    where: { id },
    data: {
      username: data.username,
      email: data.email,
      role: data.role,
      token: data.token,
      // passwordHash: data.passwordHash,
      profile: {
        update: {
          fullName: data.profile?.fullName,
          address: data.profile?.address,
          birthDate: data.profile?.birthDate,
          birthPlace: data.profile?.birthPlace,
          gender: data.profile?.gender,
          religion: data.profile?.religion,
          nationality: data.profile?.nationality,
          meritalStatus: data.profile?.meritalStatus,
          occupation: data.profile?.occupation,
          phoneNumber: encryptedData.phoneNumber,
          phoneNumberHash: encryptedData.phoneNumberHash,
          nationalId: encryptedData.nationalId,
          nationalIdHash: encryptedData.nationalIdHash,
          sign: data.profile?.sign
        },
      },
    },
    include: { profile: true },
  });
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  return await prisma.user.delete({
    where: { id },
  });
};
