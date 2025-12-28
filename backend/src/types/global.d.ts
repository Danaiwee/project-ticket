import { User } from "../generated/prisma/client.ts";

declare global {
  interface ActionResponse<T = null> {
    success: boolean;
    data?: T;
    error?: {
      message?: string;
      details?: Record<string, string[]>;
    };
    status?: number;
  }

  type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
  type ErrorResponse = ActionResponse<undefined> & { success: false };

  interface Mytoken {
    userId: string;
  }

  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }
}

export default {};
