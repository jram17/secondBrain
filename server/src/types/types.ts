import { Request } from "express";
type userRequest= {
    userId?:string;
}

export type CombinedRequest = Request & userRequest;
