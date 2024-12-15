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
        try {
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
            }

        } catch (error) {
            // if (error.name === 'TokenExpiredError') {
            if(error instanceof jwt.TokenExpiredError) {
                renewToken(req, res, next);
            } else {
                res.status(403).json({valid:false, message: "Invalid token!!" })
            }
        }
    }
}

const renewToken = (req: CombinedRequest, res: Response, next: NextFunction) => {
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken) {
        res.status(401).json({ valid: false, message: "No Refresh token present" });
        // next()
    } else {
        try {
            const decoded = jwt.verify(refreshtoken, JWT_REFRESH_PASSWORD);
            if (decoded) {
                const accessToken = jwt.sign(
                    { id: (decoded as JwtPayload).id },
                    JWT_ACCESS_PASSWORD,
                    { expiresIn: "1m" }
                );
                res.cookie('accessToken', accessToken, { maxAge: 1 * 60 * 1000 });
                req.userId = (decoded as JwtPayload).id
                next();
            }
        }
        catch (error) {
            // refresh token itself expired then
            if (error  instanceof jwt.TokenExpiredError) {
                res.status(401).json({ valid: false, message: "Refresh token expired or not there" });
            } else {
                res.status(403).json({ message: "Invalid refresh token" });
            }

        }

    }
}