import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { createUserService, deleteUserService, getUsersService, updateUserService } from '../services/userService';
import { ForbiddenError, NotFoundError } from '../utils/error';
import { JwtPayload } from '../interfaces/IJWT';
import { UpdateUserInput, UserOption, UserQuery } from '../interfaces/IUser';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { withPosts, withProfile, limit, page } = req.query as UserQuery
  
  const option: UserOption = {
      ...req.query,
      limit: Number(limit) || 5,
      page: Number(page) || 1,
      withPosts: withPosts === "true",
      withProfile: withProfile === "true"
    };
  try {
    
    const users = await getUsersService(option);
    
    if(users.status === 'fail') {
      res.status(404).json(users)
      return;
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByEmailOrUsername = async (req: Request, res: Response, next: NextFunction) => {
  const { search, withPosts, withProfile } = req.query as UserQuery; 
  
  const option: UserOption = {
    ...req.query,
    search: search,
    withPosts: withPosts === "true",
    withProfile: withProfile === "true"
  }

  if (!search) {
    return next(new NotFoundError("parameter search diperlukan"))
  }
  
  try {
    const user = await getUsersService(option);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requester = req.user as {role?: string}
    const isFromPublic = !requester;
    const bodyRole = req.body.role

    if (isFromPublic){
      req.body.role = 'warga';
    } else {
      if (requester.role !== 'ketua' && (bodyRole === 'admin' || bodyRole === 'ketua')){
        return next(new ForbiddenError('Hanya untuk ketua yang bisa membuat admin atau ketua'));
      }
    }

    const newUser = await createUserService(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as UpdateUserInput;
  const id = req.params.id;
  const withProfile = req.query.withProfile
  const {role, userId} = req.user as JwtPayload;
  const option: UserOption = {withProfile: withProfile === 'true' }
  
  try {
    console.log(userId);
    console.log(id);
    
    if (role === 'warga' && userId !== id) { 
      res.status(403).json({ message: 'Warga hanya dapat mengubah data miliknya sendiri' });
      return;
    }

    const updatedUser = await updateUserService(id, data, option)
    
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    if (!id) return next(new NotFoundError('parameter email diperlukan')) 

    const deletedUser = await deleteUserService(id);

    res.json(deletedUser);
  } catch (error) {
    next(error)
  }
}

export const whoAmI = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = jwt.decode(req.token) as JwtPayload;
    const user = await getUsersService({limit: 1, withProfile: true ,search: userId});

    res.json(user)
  } catch (error) {
    next(error)
  }
}
