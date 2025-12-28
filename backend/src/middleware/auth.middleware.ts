import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import handleError from "../lib/handler/error.js";
import { prisma } from "../lib/prisma.js";
import { NotFoundError } from "../lib/http-error.js";

export async function protectRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw new Error("Unauthorized - no accessToken provided");

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    ) as Mytoken;
    if (!decoded) throw new Error("Unauthorized - no accessToken provided");

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!user) throw new NotFoundError("User");

    req.user = user;

    next();
  } catch (error) {
    return handleError(error, res);
  }
}
