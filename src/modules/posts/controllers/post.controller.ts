import { Request, Response } from "express";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Post } from "../entities/post.entity";






class PostController {
    async createPost(req:Request,res:Response){
        try{
            const {label,image_url} = req.body;
            const post = await AppDataSource.getRepository(Post).save({
                label:label,
                image_url:image_url,
            });
        }catch(error){
            console.log(error,"Error in a createPost");
            return res.status(500).send({ok:false, error:"error-creating-post"});
        }
    }
}

export default new PostController();