import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1687697712670 implements MigrationInterface {
    name = 'InitialSetup1687697712670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fb213f79ee45060ba925ecd576\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fb213f79ee45060ba925ecd576\` ON \`task\``);
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
