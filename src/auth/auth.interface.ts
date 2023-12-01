import { Request, Response } from "express";
import { User } from "src/user/user.entity";

export interface JwtPayload {
    sub: number;
    email: string;
  }

  export interface JwtToken {
    accessToken: string;
    refreshToken: string;
  }

  export interface NewUserJudge{
    newUser: User;
    isNewUser: boolean;
  }

  export interface IContext {
    req: Request & {
      user?: {
        userId: number;
      };
    };
    res: Response;
  }