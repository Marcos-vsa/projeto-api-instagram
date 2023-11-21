import {NextFunction, Request, Response } from "express";

export const validatePostCreationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const {image_url} = req.body;
    
        if(!image_url){
            return res
            .status(400)
            .json({ok: false, message: "image_url is required"});
        }
    
    }catch(error){
        return res.status(500).json({message: "internal-server-error"});
    }
    next();
}