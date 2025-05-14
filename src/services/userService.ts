
import { roles } from '../config/roles';
import { Pagination } from '../interfaces/IDTOs';
import { UserOption, NewUserInput, UserEncryptedData, UpdateUserInput, UserUpdateEncryptedData } from '../interfaces/IUser';
import { createUser, deleteUser, findAllUsers, findUser, updateUser } from '../repositories/userRepository';
import { encrypt } from '../utils/encryption';
import { ValidationError } from '../utils/error';
import { hashPassword, hashString } from '../utils/hash';
import { mapUserToDTO } from '../utils/userMapper';

export const getUsersService = async (option: UserOption) => {
  const {page=1, limit=5, withPosts, withProfile} = option
  const {users, totalUsers } = await findAllUsers(option);
  const message = users.length !== 0 ? 'Berhasil mendapatkan users' : 'Gagal mendapatkan users';
  const status =  users.length !== 0 ? 'success' : 'fail';
  const pagination: Pagination = {
    totalItems: totalUsers,
    currentPage: page,
    pageSize: limit,
    totalPages: Math.ceil(totalUsers / limit)
  }

  return mapUserToDTO({message, status, pagination, users, option: { withPosts, withProfile }})
};

export const createUserService = async (data: NewUserInput) => {
  if (!roles.warga.includes(data.role)) {
    throw new ValidationError('Role tidak valid');
  }

  const encryptedData: UserEncryptedData = {
    passwordHash: await hashPassword(data.password),
    nationalId: encrypt(data.profile.nationalId.toString()),
    phoneNumber: encrypt(data.profile.phoneNumber.toString()),
    nationalIdHash: hashString(data.profile.nationalId),
    phoneNumberHash: hashString(data.profile.phoneNumber),
  };

  const user = await createUser(data, encryptedData);
  const message = user !== null ? 'Berhasil membuat user' : 'Gagal membuat user';
  const pagination = {
    totalItems: 1,
    currentPage: 1,
    pageSize: 1,
    totalPages: 1
  }
  const status = user !== null ? 'success' : 'fail';

  const users = [user]

  return mapUserToDTO({message, pagination, status, users});
};

export const updateUserService = async (id: string, data: UpdateUserInput, option: UserOption) => {
  const {withPosts, withProfile} = option;

  const encryptedData: UserUpdateEncryptedData = {
    nationalId: data.profile?.nationalId ? encrypt(data.profile.nationalId.toString()) : undefined,
    phoneNumber: data.profile?.phoneNumber ? encrypt(data.profile.phoneNumber.toString()) : undefined,
    nationalIdHash: data.profile?.nationalId ? hashString(data.profile.nationalId) : undefined,
    phoneNumberHash: data.profile?.phoneNumber ? hashString(data.profile.phoneNumber) : undefined,
  };

  const user = await updateUser(id, data, encryptedData);
  const message = 'Berhasil mengupdate user'
  const pagination = {
    totalItems: 1,
    currentPage: 1,
    pageSize: 1,
    totalPages: 1
  }

  const status = 'success'
  const users = [user]
  return mapUserToDTO({ message, pagination, status, users, option:{withProfile, withPosts}})
};


export const deleteUserService = async (id: string) => {
  const user = await deleteUser(id);

  const message = 'Berhasil menghapus user'
  const pagination = {
    totalItems: 1,
    currentPage: 1,
    pageSize: 1,
    totalPages: 1
  }
  const status = 'success'
  const users = [user]

  return mapUserToDTO({ message, pagination, status, users});
}

export const checkUserIsUsedService = async (option: {email?: string, username?: string}) => {
  const email =  await findUser(option.email|| '')
  const username =  await findUser(option.username|| '')
  
  const response = {
    message: `User dapat digunakan`,
    status:'success',
    data: true
  }

  if(!email && !username) {
    return response;
  }

  response.message = 'user telah digunakan';
  response.status = 'fail'
  response.data = false

  return response;
} 