import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_ACCESS_PASSWORD, JWT_REFRESH_PASSWORD } from "./config";
import { CombinedRequest } from "./types/types";

type userRequest = {
    userId?: string;
}

export const userMiddleware = (req: CombinedRequest, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_ACCESS_PASSWORD)
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;
        }

        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}

export const verifyUserMiddleware = (req: CombinedRequest, res: Response, next: NextFunction) => {
    const accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
        renewToken(req, res, next)
    } else {
        const decoded = jwt.verify(accesstoken as string, JWT_ACCESS_PASSWORD)
        if (decoded) {
            if (typeof decoded === "string") {
                res.status(403).json({
                    message: "You are not logged in"
                })
                return;
            }

            req.userId = (decoded as JwtPayload).id;
            next()
        } else {
            res.status(403).json({
                message: "You are not logged in"
            })
        }
    }
}

const renewToken = (req: CombinedRequest, res: Response,next:NextFunction) => {
    const refreshtoken = req.cookies.refreshToken;
    // let exist = false;
    if (!refreshtoken) {
        res.json({ valid: false, message: "No Refresh token" })
    } else {
        const decoded = jwt.verify(refreshtoken, JWT_REFRESH_PASSWORD);
        if (decoded) {
            const accessToken = jwt.sign((decoded as JwtPayload).id, JWT_ACCESS_PASSWORD, { expiresIn: '1m' });
            res.cookie('accessToken', accessToken, { maxAge: 1 * 60 * 1000 })
            // exist = true;
            next();
        }
    }
    // return exist;
}