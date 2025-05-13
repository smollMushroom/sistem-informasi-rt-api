import { UserDTO, UserMapper, UserResponseDTO } from '../interfaces/IDTOs';
import { safeDecrypt } from './decryption';

export const mapUserToDTO = ({
  message,
  pagination,
  users,
  status,
  option,
}: UserMapper): UserResponseDTO => {
  const mappedUsers: UserDTO[] = users.map((user: UserDTO) => {
    const baseUser: UserDTO = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      ...(option?.withProfile &&
        user.profile && {
          profile: {
            gender: user.profile.gender,
            nationality: user.profile.nationality,
            religion: user.profile.religion,
            nationalId: safeDecrypt(user.profile.nationalId) ?? '',
            phoneNumber: safeDecrypt(user.profile.phoneNumber) ?? '',
            fullName: user.profile.fullName,
            address: user.profile.address,
            birthDate: user.profile.birthDate,
            birthPlace: user.profile.birthPlace,
            meritalStatus: user.profile.meritalStatus,
            occupation: user.profile.occupation,
            createAt: user.profile.createAt,
            updatedAt: user.profile.updatedAt,
            sign: user.profile.sign,
          },
        }),
      ...(option?.withPosts && { post: user.post }),
    };
    return baseUser;
  });

  return {
    status,
    message,
    data: { 
      users: mappedUsers, 
      pagination 
    },
  };

  // const { passwordHash, token, profile, posts, ...restUser } = user;
  // const {phoneNumberHash, nationalIdHash, ...restProfile} = profile ?? {}

  // const profileDTO = profile
  //   ? {
  //       ...restProfile,
  //       phoneNumber: safeDecrypt(profile.phoneNumber),
  //       nationalId: safeDecrypt(profile.nationalId),
  //     }
  //   : undefined;

  // const postsDTO = posts
  // ? {
  //   ...posts
  // }
  // : undefined

  // return {
  //   ...restUser,
  //   ...(profileDTO && { profile: profileDTO }),
  //   ...(postsDTO && {posts}),
  // };
};
