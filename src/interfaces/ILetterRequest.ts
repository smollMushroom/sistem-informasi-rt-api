import { RequestStatus } from "@prisma/client"

export interface LetterRequest {
  id: string
  userId: string 
  letterType: string
  letterNumber: string
  status: RequestStatus
  reason?: string | null
  submissionDate: Date
  signed?: string | null;
  processedDate?: Date | null
  pickupDate?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateLetterRequestInput {
  userId: string
  letterType: string
  reason: string
  letterNumber: string
}

export interface LetterRequestOption {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export interface UpdateLetterRequestInput {
  id: string;
  userId: string;
  role: string;
  letterType?: string;
  reason?: string;
  status?: RequestStatus;
  signed?: string;
  processedDate?: Date;
  pickupDate?: Date;
}