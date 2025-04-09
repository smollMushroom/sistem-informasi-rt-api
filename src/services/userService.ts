import { roles } from '../config/roles';
import { NewUserInput, UserEncryptedData } from '../interfaces/IUser';
import { createUser, findAllUsers, findUserByEmailOrUsername } from '../repositories/userRepository';
import { encrypt } from '../utils/encryption';
import { NotFoundError, ValidationError } from '../utils/error';
import { hashPassword, hashString } from '../utils/hash';
import { mapUserToDTO } from '../utils/userMapper';

export const getUsersService = async () => {
  const users = await findAllUsers();
  return users.map(mapUserToDTO);
};

export const getUserBySearchService = async (search: string) => {
  const user = await findUserByEmailOrUsername(search);

  if (!user) throw new NotFoundError('User tidak ditemukan');

  return mapUserToDTO(user);
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

  return mapUserToDTO(user);
};
