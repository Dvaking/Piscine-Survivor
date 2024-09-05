FROM node:18

WORKDIR /app

COPY backend/package*.json ./

RUN npm i

COPY backend/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
