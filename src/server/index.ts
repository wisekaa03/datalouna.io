import { DataSource } from 'typeorm';
import fastify, { FastifyInstance } from 'fastify';
import Redis from 'ioredis';

import { PurchaseDTO, PurchaseDTOType } from './dto/purchase';
import { AppDataSource } from '../database';
import { Product } from '../database/entity/Product';
import { User } from '../database/entity/User';
import { Purchase } from '../database/entity/Purchase';
import { UserDTOType } from './dto/user';

export class API {
  server: FastifyInstance;
  database: DataSource;
  cache: Redis;

  constructor() {
    this.database = AppDataSource;
    this.server = fastify();
    this.cache = new Redis(16379, '0.0.0.0');
  }

  async prepareDatabase(): Promise<DataSource> {
    // подготавливаем базу данных
    return AppDataSource.initialize()
      .then((dataSource) => {
        dataSource.runMigrations();
        return dataSource;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }

  // подготавливаем кэш
  async prepareCache() {
    this.cache.on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
  }

  async prepareServer() {
    // схемы для валидации данных
    this.server.addSchema({
      $id: 'user',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        balance: { type: 'number' },
      },
    });

    this.server.addSchema({
      $id: 'product',
      type: 'object',
      properties: {
        id: { type: 'string' },
        app_id: { type: 'number' },
        currency: { type: 'string' },
        market_hash_name: { type: 'string' },
        suggested_price: { type: 'number' },
        min_price: { type: 'number' },
        mean_price: { type: 'number' },
        quantity: { type: 'number' },
        tradable: { type: 'boolean' },
        item_page: { type: 'string' },
        market_page: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    });

    this.server.addSchema({
      $id: 'purchase',
      type: 'object',
      properties: {
        id: { type: 'string' },
        userId: { type: 'number' },
        productId: { type: 'number' },
        price: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    });
  }

  task1() {
    // Задача 1
    this.server.get('/v1/items', async (req, res) => {
      // получаем через кэш
      const cachedItems = await this.cache.get('/v1/items');
      if (cachedItems !== null) {
        return res.send(JSON.parse(cachedItems));
      }

      // можно сделать по другому
      const productTable = this.database.getRepository(Product);
      const products = await Promise.all([
        productTable.find({
          where: { tradable: true },
          order: { min_price: 'ASC' },
          take: 1,
        }),
        productTable.find({
          where: { tradable: false },
          order: { min_price: 'ASC' },
          take: 1,
        }),
      ]);

      const productsFlat = products.flat();
      await this.cache.set('/v1/items', JSON.stringify(productsFlat), 'EX', 60);

      return res.send(productsFlat);
    });
  }

  task2() {
    // Задача 2
    this.server.post<{ Body: PurchaseDTOType; Reply: UserDTOType }>(
      '/v1/purchase',
      { schema: { body: PurchaseDTO } },
      async (req, res) => {
        if (!req.body) {
          return res.status(400).send({ message: 'Bad request' });
        }

        const { productId, userId, price } = req.body;

        const product = await this.database
          .getRepository(Product)
          .findOne({ where: { id: productId } });
        if (!product) {
          return res.status(404).send({ message: 'Product not found' });
        }

        if (product.quantity <= 0) {
          return res.status(403).send({ message: 'Product is not available' });
        }

        let user = await this.database
          .getRepository(User)
          .findOne({ where: { id: userId } });
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }

        if (user.balance < price) {
          return res.status(403).send({ message: 'Insufficient funds' });
        }

        await this.database.manager.transaction(async (transaction) => {
          await transaction.insert(Purchase, {
            userId,
            productId,
            price,
          });

          await transaction.decrement(
            Product,
            { id: productId },
            'quantity',
            1,
          );

          await transaction.decrement(User, { id: userId }, 'balance', price);
        });

        user = await this.database
          .getRepository(User)
          .findOne({ where: { id: userId } });
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }

        return res.send(user);
      },
    );
  }

  async startServer() {
    this.server.listen({ port: 3000 }).then((address) => {
      console.log(`Server listening at ${address}`);
    });
  }
}
