import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product';
import { User } from './User';
import { IsDateString } from 'class-validator';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @Column({ nullable: false })
  @RelationId((purchase: Purchase) => purchase.product)
  productId!: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ nullable: false })
  @RelationId((purchase: Purchase) => purchase.user)
  userId!: number;

  @Column({ type: 'numeric', nullable: false })
  price!: number;

  @CreateDateColumn()
  @IsDateString()
  createdAt!: Date;

  @UpdateDateColumn()
  @IsDateString()
  updatedAt!: Date;
}
