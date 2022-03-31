import { integer } from "aws-sdk/clients/cloudfront";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("customer")
export class Customer {
    @PrimaryGeneratedColumn()
    public id: integer;
    
    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public name: string;

    @Column()
    public userUniqueKey: string;

    @Column({
        name: "is_verified",
        type: "boolean",
        nullable: false,
        default: false
    })
    public isVerified: boolean;
}