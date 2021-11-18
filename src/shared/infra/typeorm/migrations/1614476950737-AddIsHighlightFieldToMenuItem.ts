import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsHighlightFieldToMenuItem1614476950737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'restaurantMenuItems',
            new TableColumn({
                name: 'isHighlight',
                type: 'boolean',
                isNullable: true,
                default: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('restaurantMenuItems', 'isHighlight');

    }

}
