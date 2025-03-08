import { RequestHandler } from "express";
import { exists,extend } from "../helper/redis.js";


export const authorization: RequestHandler = async (
    req,
    res,
    next
) : Promise<void>=> {
    try {
        const token = req.signedCookies.auth_token || req.cookies.auth_token;
        if (!token) {
            res.status(401).json({ error: 'Unauthorized - No token provided' });
            return;
        }
    
        const tokenExists = await exists(token);
        if (tokenExists === 0) {
           res.status(401).json({ error: 'Unauthorized - Invalid token' });
           return;
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};
