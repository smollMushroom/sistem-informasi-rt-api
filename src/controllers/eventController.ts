import { Request, Response, NextFunction } from "express";
import {
  createEventScheduleService,
  deleteEventScheduleService,
  getAllEventScheduleService,
  getEventScheduleByIdService,
  updateEventScheduleService,
} from "../services/eventService";
import {
  CreateEventScheduleInput,
  EventScheduleRequestOption,
  UpdateEventScheduleInput,
} from "../interfaces/IEvent";

export const getAllEventScheduleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options: EventScheduleRequestOption = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
      sortBy: req.query.sortBy as string,
      order: req.query.order as "asc" | "desc",
      search: req.query.search as string,
    };

    const result = await getAllEventScheduleService(options);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getEventScheduleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await getEventScheduleByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createEventScheduleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.user as { userId: string };
    const input: CreateEventScheduleInput = req.body;

    const result = await createEventScheduleService({
      ...input,
      createdById: userId,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateEventScheduleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const input: UpdateEventScheduleInput = req.body;

    const result = await updateEventScheduleService(id, input);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteEventScheduleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await deleteEventScheduleService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
