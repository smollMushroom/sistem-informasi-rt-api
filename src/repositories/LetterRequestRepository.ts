import { RequestStatus } from '@prisma/client';
import { prisma } from '../config/database';
import {
  CreateLetterRequestInput,
  LetterRequestOption,
  UpdateLetterRequestInput,
} from '../interfaces/ILetterRequest';

class LetterRequestRepository {
  static async getAllLetterRequest(option: LetterRequestOption) {
    const {
      page = 1,
      limit = 10,
      skip,
      sortBy = 'createdAt',
      order = 'desc',
      search,
    } = option;

    const offset = typeof skip === 'number' ? skip : (page - 1) * limit;

    const validSortFields: Record<string, boolean> = {
      id: true,
      letterType: true,
      status: true,
      submissionDate: true,
      processedDate: true,
      pickupDate: true,
      createdAt: true,
      updatedAt: true,
    };

    const safeSortBy = validSortFields[sortBy] ? sortBy : 'createdAt';
    const statusValues: RequestStatus[] = ['pending', 'approved', 'rejected'];
    const whereClause = search
      ? {
          OR: [
            {
              id: {
                equals: search,
              },
            },
            {
              letterType: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            ...(statusValues.includes(search.toLowerCase() as RequestStatus)
              ? [
                  {
                    status: {
                      equals: search.toLowerCase() as RequestStatus,
                    },
                  },
                ]
              : []),
            {
              user: {
                is: {
                  username: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
              },
            },
            {
              user: {
                is: {
                  id: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
              },
            },
            {
              user: {
                is: {
                  profile: {
                    is: {
                      fullName: {
                        contains: search,
                        mode: 'insensitive' as const,
                      },
                    },
                  },
                },
              },
            },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      prisma.letterRequest.count({ where: whereClause }),
      prisma.letterRequest.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: {
          [safeSortBy]: order,
        },
        include: {
          user: {
            select: {
              id: true,
              role: true,
              email: true,
              username: true,
              profile: {
                select: {
                  id: true,
                  fullName: true,
                  address: true,
                  birthDate: true,
                  birthPlace: true,
                  phoneNumber: true,
                  nationalId: true,
                  gender: true,
                  nationality: true,
                  religion: true,
                  meritalStatus: true,
                  occupation: true,
                  createdAt: true,
                  updatedAt: true,
                  userId: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getLetterRequestById(id: string) {
    const letter = await prisma.letterRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            role: true,
            email: true,
            username: true,
            profile: {
              select: {
                id: true,
                fullName: true,
                address: true,
                birthDate: true,
                birthPlace: true,
                phoneNumber: true,
                nationalId: true,
                gender: true,
                nationality: true,
                religion: true,
                meritalStatus: true,
                occupation: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!letter) {
      throw new Error('Letter request not found');
    }

    return letter;
  }

  static async createLetterRequest(input: CreateLetterRequestInput) {
    const { userId, letterType, reason, letterNumber} = input;

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    const letterRequest = await prisma.letterRequest.create({
      data: {
        userId,
        letterType,
        reason,
        letterNumber
      },
      include: {
        user: {
          select: {
            id: true,
            role: true,
            email: true,
            username: true,
          },
        },
      },
    });

    return letterRequest;
  }

  static async updateLetterRequest(input: UpdateLetterRequestInput) {
    const { id, role, ...updateData } = input;

    const existingRequest = await prisma.letterRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      throw new Error('LetterRequest not found');
    }

    const updated = await prisma.letterRequest.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        user: true,
      },
    });

    return updated;
  }

  static async deleteLetterRequest(id: string) {
    const existing = await prisma.letterRequest.findUnique({
      where: { id },
    });
    
    if (!existing) {
      throw new Error('LetterRequest not found');
    }

    await prisma.letterRequest.delete({
      where: { id },
    });

    return { message: 'LetterRequest deleted successfully' };
  }

  static findLastLetterNumber = async (romanMonth: string, year: number): Promise<string | null> => {
    const result = await prisma.letterRequest.findFirst({
      where: {
        letterNumber: {
          endsWith: `${romanMonth}-${year}`
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        letterNumber: true
      }
    });
  
    return result ? result.letterNumber : null;
  }
}

export default LetterRequestRepository;
