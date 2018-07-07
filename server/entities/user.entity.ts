import { Entity, PrimaryGeneratedColumn, VersionColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { IsEmail, IsMobilePhone } from 'class-validator';

@Entity("Users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    userID: string;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    userFirstName: string;

    @Column({ type: 'varchar', length: 255 })
    userLastName: string;

    @Column({ type: 'varchar', length: 255 })
    @IsEmail()
    userEmail: string;

    @Column({ type: 'varchar', length: 255 })
    @IsMobilePhone('en-Us')
    userPhone: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @VersionColumn()
    version: number;
}