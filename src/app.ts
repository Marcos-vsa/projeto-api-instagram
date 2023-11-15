import express from 'express'
import dotenv from 'dotenv'
import UserController from './modules/users/controller/user.controller';

dotenv.config();

export const app = express ();

app.get("/:user_id",UserController.findOne);

app.patch("/:user_id",UserController.updateUser);

app.use(express.json()); 

export async function startWebServer(){
    return new  Promise((resolve)=>{
        app.listen(process.env.PORT, ()=>{
            console.log(`Server listening on port${process.env.PORT}`);
            resolve(null);
        }); 
    });
}