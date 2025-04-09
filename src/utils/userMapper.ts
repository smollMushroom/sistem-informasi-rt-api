import { UserResponseDTO } from '../interfaces/IUserDTOs';
import { safeDecrypt } from './decryption';

export const mapUserToDTO = (user: any): UserResponseDTO => {
  const { id: _, passwordHash, profile, ...restUser } = user;
  const { id: __, userId, phoneNumber, nationalId, ...restProfile } = profile ?? {};

  return {
    ...restUser,
    profile: {
      ...restProfile,
      phoneNumber: safeDecrypt(phoneNumber),
      nationalId: safeDecrypt(nationalId),
    },
  };
};