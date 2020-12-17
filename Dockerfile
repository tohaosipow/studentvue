FROM node:alpine

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package.json ./

# устанавливаем зависимости проекта
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && apk del .gyp


RUN npm install -g http-server

COPY ./src ./src
COPY ./public ./public

# собираем приложение для production с минификацией
RUN npm run build

EXPOSE 8800
CMD [ "http-server", "dist", "-p", "8800"]
