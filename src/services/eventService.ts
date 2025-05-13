import EventScheduleRepository from "../repositories/EventScheduleRepository";
import { CreateEventScheduleInput, EventScheduleRequestOption, EventScheduleResponse, UpdateEventScheduleInput } from "../interfaces/IEvent";
import mapEventScheduleToDTO from "../utils/eventMapper";

export const getAllEventScheduleService = async (option: EventScheduleRequestOption) => {
  const { data, pagination } = await EventScheduleRepository.getAllEvent(option);

  return mapEventScheduleToDTO({
    events: data,
    pagination: {
      totalItems: pagination.total,
      currentPage: pagination.page,
      totalPages: pagination.totalPages,
      pageSize: pagination.limit,
    },
    message: "Berhasil mengambil semua data jadwal acara",
    status: "success",
  });
};

export const getEventScheduleByIdService = async (id: string): Promise<{
  message: string;
  status: string;
  data: EventScheduleResponse;
}> => {
  const event = await EventScheduleRepository.getEventById(id);

  return {
    message: "Berhasil mengambil detail jadwal acara",
    status: "success",
    data: event,
  };
};

export const getEventScheduleByTitleService = async (title: string): Promise<{
  message: string;
  status: string;
  data: EventScheduleResponse;
}> => {
  const event = await EventScheduleRepository.getEventByTitle(title);

  return {
    message: "Berhasil mengambil detail jadwal acara berdasarkan judul",
    status: "success",
    data: event,
  };
};

export const createEventScheduleService = async (input: CreateEventScheduleInput & { createdById: string }) => {
  const newEvent = await EventScheduleRepository.createEvent(input, input.createdById);

  return {
    message: "Jadwal acara berhasil dibuat",
    status: "success",
    data: newEvent,
  };
};

export const updateEventScheduleService = async (id: string, input: UpdateEventScheduleInput) => {
  const updated = await EventScheduleRepository.updateEvent(id, input);

  return {
    message: "Jadwal acara berhasil diperbarui",
    status: "success",
    data: updated,
  };
};

export const deleteEventScheduleService = async (id: string) => {
  await EventScheduleRepository.deleteEvent(id);

  return {
    message: "Jadwal acara berhasil dihapus",
    status: "success",
  };
};
