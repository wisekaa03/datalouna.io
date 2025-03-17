import { IsDateString, IsEmail, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  @IsEmail()
  email!: string;

  @Column({ nullable: false, default: 0 })
  @IsNumber()
  balance!: number;

  @CreateDateColumn()
  @IsDateString()
  createdAt!: Date;

  @UpdateDateColumn()
  @IsDateString()
  updatedAt!: Date;
}
