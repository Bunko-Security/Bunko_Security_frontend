# Тема проекта
**BSF** — это безопасное хранилище данных со сквозным шифрованием. Это означает, что Ваши данные не могут получены без авторизации Вас или пользователя, которому был предназначен файл. Иначе говоря, даже если взломают наши сервера и базы данных, то конфиденциальность данных не нарушится.

Данный репозиторий является фронтендом BSF, представленный как Web-приложение.
# Запуск проекта
- Склонировать репозиторий
- Создать в корне проекта файл окружения _.env.local_ со следующими полями:
```env
SERVER_URL="Полный_путь_до_сервера"

SERVER_DOMAIN="Домейн"
SERVER_PORT="Порт_сервера"
```
Пример:
```env
SERVER_URL="http://localhost:8000"

SERVER_DOMAIN="localhost"
SERVER_PORT="8000"
```
- Создать образ и запустить готовый контейнер

# Источники
- Макет: [Figma](https://www.figma.com/file/z8IEsmN4Z7BvE5AiQp3ICa/Bunko-Security?type=design&node-id=1-4&mode=design&t=B684pkXSCBqfNBdy-0)
- Backend: [GitHub](https://github.com/Bunko-Security/bsf_api)
# Используемые технологии
- Next.js
- Zustand
- Axios
- TS, SCSS
- SWR
