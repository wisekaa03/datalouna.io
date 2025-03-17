import { API } from './server';

(async () => {
  const api = new API();

  // Инициализируем базу данных
  await api.prepareDatabase();

  // Инициализируем кэш
  await api.prepareCache();

  // Подготавливаем сервер и схемы
  await api.prepareServer();

  // Задача 1
  api.task1();

  // Задача 2
  api.task2();

  // Запускаем сервер
  await api.startServer().catch((err) => {
    console.error(err);
    process.exit(1);
  });
})();
