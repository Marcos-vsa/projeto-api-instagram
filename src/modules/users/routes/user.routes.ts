import { Router } from "express";
import UserController from "../controller/user.controller";

export const UserRoutes = (): Router => {
    const router = Router();

    //POST/users
    router.post("/",UserController.createUser);

    //GET/users
    router.get("/", UserController.listUsers);

    //GET/users/:users_id
    router.get("/:user_id",UserController.findOne);

    //PATCH/users/:user_id
    router.patch("/:user_id",UserController.updateUser);

    //DELETE/users/:user_id
    router.delete("/:user_id",UserController.deleteUser);
    
    return router;
}