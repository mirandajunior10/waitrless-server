import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addAvatarFieldToMenuItems1616890414243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'restaurantMenuItems',
            new TableColumn({
                name: 'picture',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('restaurantMenuItems', 'picture');

    }

}
