import { User } from "./IUser";

export interface EventScheduleResponse {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  startTime: Date; // ISO Date string
  endTime?: Date | null; // Optional, karena bisa null
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  createdBy: Partial<User>;
}

export interface CreateEventScheduleInput {
  title: string;
  description?: string;
  location?: string;
  startTime: Date | string;
  endTime?: Date | string;
}

export interface UpdateEventScheduleInput {
  title?: string;
  description?: string;
  location?: string;
  startTime?: Date | string;
  endTime?: Date | string | null;
}

export interface EventScheduleRequestOption {
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}