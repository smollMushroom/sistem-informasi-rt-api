import {
  CreateLetterRequestInput,
  LetterRequest,
  LetterRequestOption,
  UpdateLetterRequestInput,
} from '../interfaces/ILetterRequest';
import LetterRequestRepository from '../repositories/LetterRequestRepository';
import createLetterNumber from '../utils/createLetterNumber';
import { safeDecrypt } from '../utils/decryption';
import { UnauthorizedError } from '../utils/error';
import mapLetterRequestToDTO from '../utils/letterMapper';

export const getAllLetterRequestService = async (
  option: LetterRequestOption
) => {
  const { data, pagination } =
    await LetterRequestRepository.getAllLetterRequest(option);

  const processedLetterRequests = data.map((item) => ({
    ...item,
    user: {
      ...item.user,
      profile: item.user.profile
        ? {
            ...item.user.profile,
            nationalId: item.user.profile.nationalId
              ? safeDecrypt(item.user.profile.nationalId)
              : null,
            phoneNumber: item.user.profile.phoneNumber
              ? safeDecrypt(item.user.profile.phoneNumber)
              : null,
          }
        : null,
    },
  }));

  return mapLetterRequestToDTO({
    letterRequests: processedLetterRequests,

    pagination: {
      totalItems: pagination.total,
      currentPage: pagination.page,
      totalPages: pagination.totalPages,
      pageSize: pagination.limit,
    },
    message: 'Berhasil mengambil data permohonan surat',
    status: 'success',
  });
};

export const getLetterRequestByIdService = async (
  id: string
): Promise<{
  message: string;
  status: string;
  data: LetterRequest;
}> => {
  const letterRequest = await LetterRequestRepository.getLetterRequestById(id);
  const processedLetterRequests = {
    ...letterRequest,
    user: {
      ...letterRequest.user,
      profile: letterRequest.user.profile
        ? {
            ...letterRequest.user.profile,
            nationalId: letterRequest.user.profile.nationalId
              ? safeDecrypt(letterRequest.user.profile.nationalId)
              : null,
            phoneNumber: letterRequest.user.profile.phoneNumber
              ? safeDecrypt(letterRequest.user.profile.phoneNumber)
              : null,
          }
        : null,
    },
  };

  return {
    message: 'Berhasil mengambil detail permohonan surat',
    status: 'success',
    data: processedLetterRequests,
  };
};

export const createLetterRequestService = async (
  input: CreateLetterRequestInput
): Promise<{
  message: string;
  status: string;
  data: LetterRequest;
}> => {
  const letterNumber = await createLetterNumber();

  const letterRequest = await LetterRequestRepository.createLetterRequest({...input, letterNumber});

  return {
    message: 'Permohonan surat berhasil dibuat',
    status: 'success',
    data: letterRequest,
  };
};

export const updateLetterRequestService = async (
  input: UpdateLetterRequestInput
) => {
  const { role, userId, id } = input;

  if (role === 'warga') {
    const surat = await LetterRequestRepository.getLetterRequestById(id);

    if (!surat || surat.userId !== userId) {
      throw new UnauthorizedError(
        'Akses ditolak: Anda tidak memiliki surat ini.'
      );
    }
  }

  const updatedLetter =
    await LetterRequestRepository.updateLetterRequest(input);

  return {
    message: 'Surat berhasil diperbarui',
    status: 'success',
    data: updatedLetter,
  };
};

export const deleteLetterRequestService = async (
  id: string
): Promise<{ message: string; status: string }> => {
  await LetterRequestRepository.deleteLetterRequest(id);

  return {
    message: 'Permohonan surat berhasil dihapus',
    status: 'success',
  };
};
