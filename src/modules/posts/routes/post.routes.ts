import { Router } from "express";
import PostController from "../controllers/post.controller";
import { validateJwtUser } from "../../../commons/middlewares/auth.middleware";

export const PostRoutes = (): Router => {
    const router = Router();

    //POST/users
    router.post("/", validateJwtUser, PostController.createPost);

    //GET/posts
    router.get("/",PostController.listPosts);

    

    return router;
}