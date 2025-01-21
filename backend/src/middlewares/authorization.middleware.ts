import { RequestHandler } from "express";
import { exists,extend } from "../helper/redis.ts";

export const authorization: RequestHandler = async (
    req,
    res,
    next
) : Promise<void>=> {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            res.status(401).json({ error: 'Unauthorized - No token provided' });
            return;
        }
    
        const tokenExists = await exists(token);
        if (tokenExists === 0) {
           res.status(401).json({ error: 'Unauthorized - Invalid token' });
           return;
        }
        extend(token);
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};
