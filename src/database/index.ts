import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entity/User';
import { Product } from './entity/Product';
import { Purchase } from './entity/Purchase';

import { Initial1742220736358 } from './migration/1742220736358-initial';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345678',
  database: 'datalouna',
  synchronize: true,
  logging: true,
  entities: [User, Product, Purchase],
  migrations: [Initial1742220736358],
  migrationsRun: false,
  subscribers: [],
});
