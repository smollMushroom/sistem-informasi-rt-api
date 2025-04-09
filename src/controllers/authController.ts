import { NextFunction, Request, Response } from "express";
import { loginUserService, logoutUserService } from "../services/authService";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const token = await loginUserService(email, password);
    res.json({ token });
  } catch (error) {
    next(error)
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.token;
    await logoutUserService(token)
    res.json({message: "Logout berhasil"})
  } catch (error) {
    next(error)
  }
}