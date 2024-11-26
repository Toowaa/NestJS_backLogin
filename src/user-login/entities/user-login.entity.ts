

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('user')
export class UserLogin {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({  length: 50 })
    firstName: string;

    @Column({  length: 50 })
    lastName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ nullable: true })
    auth: string;
}