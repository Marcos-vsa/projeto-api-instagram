import { NextFunction, Request, Response } from "express";
import { User } from "../../modules/users/entities/user.entity";
import  jwt  from "jsonwebtoken";
import { AppDataSource } from "../../services/database/app-data-source";

export async function validateJwtUser(
    req:Request,
    res:Response,
    next:NextFunction,
    ) {
        try{
            //Busca o token no cabeçalho authorization
        const token =req.headers["authorization"]?.split(" ")[1];
        if (!token) return res.status(401).json({message:"No token provided"});
            //Verifica se o token é válido
        const jwtPayLoad = jwt.verify(token,process.env.JWT_SECRET as string) as {
            id: number;
            email: string
        };
    
        const {id} = jwtPayLoad;
    
        const user = await AppDataSource.getRepository(User).findOne({
            where:{id},
        });
    
        if(!user) {
            return res.status(401).json({message:"Invalid token"});
        }
    
        res.locals.user = user;
        } catch(error){
            console.log(error,"error on validadeJwtUser")
            return res.status(401).json({message: "not-possible-to-authenticate"});
        }
        next();
}