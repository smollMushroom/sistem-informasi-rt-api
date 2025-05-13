import { NextFunction, Request, Response } from "express";
import { CreateLetterRequestInput, LetterRequestOption } from "../interfaces/ILetterRequest";
import { createLetterRequestService , deleteLetterRequestService, getAllLetterRequestService, getLetterRequestByIdService, updateLetterRequestService } from "../services/letterRequestService";

export const getAllLetterRequestsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { userId: string; email: string; role: string };

    const options: LetterRequestOption = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
      skip: req.query.skip ? parseInt(req.query.skip as string) : undefined,
      sortBy: req.query.sortBy as string,
      order: req.query.order as "asc" | "desc",
      search: req.query.search as string,
    };

    if (user.role === "warga") {
      options.search = user.userId;
    }

    const result = await getAllLetterRequestService(options);
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
};

export const getLetterRequestByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await getLetterRequestByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    next()
  }
};


export const createLetterRequestController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user as {userId: string}
    const input: CreateLetterRequestInput = {...req.body, userId};
    const result = await createLetterRequestService(input);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
};

export const updateLetterRequestController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.user as { role: string; userId: string };
    const body = req.body;

    const result = await updateLetterRequestService({ id, role, userId, ...body });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteLetterRequestController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await deleteLetterRequestService(id);
    console.log(result);
    
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
};