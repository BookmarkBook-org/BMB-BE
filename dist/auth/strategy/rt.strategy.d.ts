import { Request } from "express";
import { Strategy } from "passport-jwt";
import { JwtPayload } from "../auth.interface";
declare const RtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtStrategy extends RtStrategy_base {
    constructor();
    validate(req: Request, payload: JwtPayload): {
        refreshToken: string;
        sub: number;
        email: string;
    };
}
export {};
