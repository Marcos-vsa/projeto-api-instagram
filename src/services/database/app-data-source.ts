import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../../modules/users/entities/users.entities";
dotenv.config();


const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User],
    synchronize: true,
});

export  async function startDatabase(){
    try{
        await AppDataSource.initialize();
    }catch(error){
        console.error(error,"Error initializing database");
        throw error;
    }
}

