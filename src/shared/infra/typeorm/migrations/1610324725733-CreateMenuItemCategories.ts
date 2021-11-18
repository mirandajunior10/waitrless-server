import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMenuItemCategories1610324725733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categories',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'restaurant_id',
                        type: 'uuid',
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
                        name: 'RestaurantMenu',
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
        await queryRunner.dropTable('categories');
    }
}
