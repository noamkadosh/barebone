# This Dockerfile is ONLY for development!
FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["npx", "nodemon", "src/server.ts"]
