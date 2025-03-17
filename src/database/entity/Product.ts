import { IsBoolean, IsDateString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: 730 })
  app_id!: number;

  @Column({ nullable: false, default: 'EUR' })
  currency!: string;

  @Column({ nullable: false })
  market_hash_name!: string;

  @Column({ type: 'numeric', nullable: false })
  suggested_price!: number;

  @Column({ type: 'numeric', nullable: false })
  min_price!: number;

  @Column({ type: 'numeric', nullable: false })
  mean_price!: number;

  @Column({ type: 'numeric', nullable: false })
  quantity!: number;

  @Column({ type: 'boolean', nullable: false, default: false })
  @IsBoolean()
  tradable!: boolean;

  @Column({ type: 'text', default: '' })
  item_page!: string;

  @Column({ type: 'text', default: '' })
  market_page!: string;

  @CreateDateColumn()
  @IsDateString()
  createdAt!: Date;

  @UpdateDateColumn()
  @IsDateString()
  updatedAt!: Date;
}
