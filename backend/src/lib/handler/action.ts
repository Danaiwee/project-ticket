import { ZodSchema } from "zod";
import { NotFoundError, UnauthorizedError, ValidationError } from "../http-error.js";
import { User } from "../../generated/prisma/client.js";
import { prisma } from "../prisma.js";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';



interface ActionOptions<T> {
    params: T;
    schema: ZodSchema<T>;
    authorize?: boolean,
    req?: Request,
}

async function action<T>({params, schema, authorize = false, req}: ActionOptions<T>) {
    const validation = schema.safeParse(params);
    if(!validation.success) {
        throw new ValidationError(validation.error.flatten().fieldErrors)
    }

    let user: Partial<User> | null = null;

    if(authorize) {
        const accessToken = req.cookies.accessToken;
        if(!accessToken) throw new UnauthorizedError("Unauthorized - no token provided");

        try {
            const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

            user = await prisma.user.findUnique({
                where: {id: decode.userId},
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true
                }
            })

            if(!user) throw new NotFoundError("User")
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new UnauthorizedError("Invalid token");
            }
            throw error;
        }
    }

    return {params: validation.data, user}

}


export default action