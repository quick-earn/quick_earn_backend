import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Depodraw")
export class DepodrawEntity {
    @PrimaryGeneratedColumn()
    depodrawId: number;

    @Column()
    userId: number;

    @Column()
    phone: string;

    @Column()
    amount: string;

    @Column()
    requestType: string;

    @Column({ nullable: true })
    transactionId: string;

    @Column()
    paymentMethod: string;

    @Column()
    status: string;
}