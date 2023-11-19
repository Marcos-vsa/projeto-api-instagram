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
import { Like } from '../../likes/entities/like.entity';


@Entity ('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number ; 

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({nullable:true})
    bio: string;
    
    @Column({default: 0})
    followers_count: number;
    
    @Column({default:0})
    following_count: number;

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

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];
}