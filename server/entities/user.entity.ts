import { IsEmail, IsMobilePhone } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity("Users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    public userID: string;

    @Column({ type: "varchar", length: 255 })
    public username: string;

    @Column({ type: "varchar", length: 255 })
    public userFirstName: string;

    @Column({ type: "varchar", length: 255 })
    public userLastName: string;

    @Column({ type: "varchar", length: 255 })
    @IsEmail()
    public userEmail: string;

    @Column({ type: "varchar", length: 255 })
    @IsMobilePhone("en-Us")
    public userPhone: string;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string;

    @VersionColumn()
    public version: number;
}
