import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1742220736358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (name, email, balance) VALUES ('John Doe', 'example@example.com', 1000)`,
    );
    await queryRunner.query(
      `INSERT INTO "user" (name, email, balance) VALUES ('Lily Doe', 'email@example.com', 1000)`,
    );

    await queryRunner.query(
      `INSERT INTO "product" 
        (market_hash_name, suggested_price, min_price, mean_price, quantity, item_page, market_page, tradable)
        VALUES
        ('Armor', 10.99, 12.5, 13.7, 10, 'https://wisekaa.dev', 'https://wisekaa.dev', true)`,
    );

    await queryRunner.query(
      `INSERT INTO "product" 
        (market_hash_name, suggested_price, min_price, mean_price, quantity, item_page, market_page, tradable)
        VALUES
        ('AK-47', 4.99, 5.5, 5.7, 10, 'https://wisekaa.dev', 'https://wisekaa.dev', false)`,
    );

    await queryRunner.query(
      `INSERT INTO "product" 
        (market_hash_name, suggested_price, min_price, mean_price, quantity, item_page, market_page, tradable)
        VALUES
        ('Helm', 1.99, 2.5, 3.7, 5, 'https://wisekaa.dev', 'https://wisekaa.dev', true)`,
    );

    await queryRunner.query(
      `INSERT INTO "product" 
        (market_hash_name, suggested_price, min_price, mean_price, quantity, item_page, market_page, tradable)
        VALUES
        ('Boots', 0.99, 2.5, 3.7, 5, 'https://wisekaa.dev', 'https://wisekaa.dev', false)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "purchase"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
