import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCustomerTable1648549458430 implements MigrationInterface {
    tablename = 'customer' 
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tablename,
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isNullable: false,
                       // default: "uuid_generate_v4()",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true,                   
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            })
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tablename);
    }

}
