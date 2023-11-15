import { Request, Response,} from "express";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../../services/database/app-data-source";



class UserController {
    async createUser(req:Request,res:Response){
        const{name , email , password} = req.body;

        try{
            const user = await AppDataSource.getRepository(User).save({
                name: name,
                email: email,
                password: password,
            });
            console.log(`User${user.id}created`)
        }catch(error){
            console.log(error,"Erro in createdUser")
            return res.status(400).json({message: "Erro ao criar usuário"});
        }
    }

    async listUsers(req:Request, res:Response){
        try{
            const users = await AppDataSource.getRepository(User).find({select:["id","name","bio","followers"]});
            return res.status(200).json(users);
        }catch(error){
            console.log(error,"Error to listUsers");
            return res.status(400).json({message:"Erro ao listar usuários"});
        }
    }


    async findOne(req:Request,res:Response){
        try{
            const user = await AppDataSource.getRepository(User).findOne({where:{id: +req.params.user_id}});
            return res.status(200).json({ok:true,user});
        }catch(error) {
            console.log(error,"Error to findOne")
            res.status(500).send({ok:false, error:"Error-findind-user"})
        }
    }

    async updateUser(req:Request,res:Response){
        try{
            const{name,bio} = req.body;
            const user  = await AppDataSource.getRepository(User).findOne({
                where:{id: +req.params.user_id}
            });

            if(!user){
                return res.status(404).json({ok:false,error:"user-not-found"})
            }

            if(name) user.name = name;
            if(bio) user.bio = bio

            await AppDataSource.getRepository(User).save(user);

            return res.status(200).json({ok:true,user});
        }catch(error){
            console.log(error,"Error in updateUser");
            res.status(500).send({ok:false,error: "Error-updating-user"});
        }
    }

    
}




export default new UserController();

