import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,

} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';


@Entity ('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number ; 

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    bio: string;
    
    @Column({default: 0})
    followers: number;
    
    @Column({default:0})
    following: number;

    @Column()
    password_hash:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    Updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    //Relations
    @OneToMany(()=> Post, (post)=> post.user)
    posts: Post[];

    @OneToMany(()=>Comment,(comment)=>comment.user)
    comments: Comment[];
}