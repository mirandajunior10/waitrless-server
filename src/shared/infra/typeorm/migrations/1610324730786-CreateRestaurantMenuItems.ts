import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRestaurantMenuItems1610324730786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'restaurantMenuItems',
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
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                    },
                    {
                        name: 'value',
                        type: 'real',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'create_at',
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
                    {
                        name: 'MenuItemCategory',
                        referencedTableName: 'categories',
                        referencedColumnNames: ['id'],
                        columnNames: ['category_id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE'
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('restaurantMenuItems');
    }

}
