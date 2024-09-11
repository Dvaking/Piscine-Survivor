FROM node:18

WORKDIR /app

COPY backend/package*.json ./

COPY backend/ .

RUN npm i

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run", "start" ]