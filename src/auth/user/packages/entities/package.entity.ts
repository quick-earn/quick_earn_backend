import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Packages")
export class PackageEntity {
    @PrimaryGeneratedColumn()
    packagesId: number

    @Column()
    title: string;

    @Column()
    duration: string;

    @Column()
    description: string;

    @Column()
    price: number
}