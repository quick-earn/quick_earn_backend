import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    userName: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    balance: number;
}
