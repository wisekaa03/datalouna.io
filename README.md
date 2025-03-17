- Подготовка: ```yarn```
- Приготовление: ```yarn docker:dev```
- Запуск: ```yarn build && yarn start```
- Задача 1:
  ```curl http://localhost:3000/v1/items```
  ```
  [{"id":3,"app_id":730,"currency":"EUR","market_hash_name":"Helm","suggested_price":"1.99","min_price":"2.5","mean_price":"3.7","quantity":"5","tradable":true,"item_page":"https://wisekaa.dev","market_page":"https://wisekaa.dev","createdAt":"2025-03-17T16:37:27.671Z","updatedAt":"2025-03-17T16:37:27.671Z"},{"id":4,"app_id":730,"currency":"EUR","market_hash_name":"Boots","suggested_price":"0.99","min_price":"2.5","mean_price":"3.7","quantity":"2","tradable":false,"item_page":"https://wisekaa.dev","market_page":"https://wisekaa.dev","createdAt":"2025-03-17T16:37:27.671Z","updatedAt":"2025-03-17T17:06:10.868Z"}]
  ```
- Задача 2:
  ```curl curl -X POST -d '{"userId":1,"productId":4,"price":10}' -H 'Content-Type: application/json' http://localhost:3000/v1/purchase```
  ```
  {"id":1,"name":"John Doe","email":"example@example.com","balance":970,"createdAt":"2025-03-17T16:37:27.671Z","updatedAt":"2025-03-17T17:06:10.868Z"}
  ```
- Завершение: ```yarn docker:dev:down```
