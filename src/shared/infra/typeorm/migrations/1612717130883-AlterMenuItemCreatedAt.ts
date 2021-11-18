import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterMenuItemCreatedAt1612717130883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('restaurantMenuItems', 'create_at');
        await queryRunner.addColumn(
            'restaurantMenuItems',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('restaurantMenuItems', 'created_at');
        await queryRunner.addColumn(
            'restaurantMenuItems',
            new TableColumn({
                name: 'create_at',
                type: 'timestamp',
                default: 'now()',
            }),
        );
    }

}
