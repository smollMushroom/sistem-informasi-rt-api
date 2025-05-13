"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToDTO = void 0;
const decryption_1 = require("./decryption");
const mapUserToDTO = ({ message, pagination, users, status, option, }) => {
    const mappedUsers = users.map((user) => {
        var _a, _b;
        const baseUser = Object.assign(Object.assign({ id: user.id, email: user.email, username: user.username, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt }, ((option === null || option === void 0 ? void 0 : option.withProfile) &&
            user.profile && {
            profile: {
                gender: user.profile.gender,
                nationality: user.profile.nationality,
                religion: user.profile.religion,
                nationalId: (_a = (0, decryption_1.safeDecrypt)(user.profile.nationalId)) !== null && _a !== void 0 ? _a : '',
                phoneNumber: (_b = (0, decryption_1.safeDecrypt)(user.profile.phoneNumber)) !== null && _b !== void 0 ? _b : '',
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
        })), ((option === null || option === void 0 ? void 0 : option.withPosts) && { post: user.post }));
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
exports.mapUserToDTO = mapUserToDTO;
