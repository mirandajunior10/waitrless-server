import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1610828842135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'restaurant_id',
                        type: 'uuid',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'RestaurantUser',
                        referencedTableName: 'restaurants',
                        referencedColumnNames: ['id'],
                        columnNames: ['restaurant_id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
